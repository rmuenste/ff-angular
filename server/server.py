from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from typing import List, Dict, Any
import json
import os 
import uvicorn
import logging
import re
import time
from pathlib import Path
from collections import defaultdict

# Load environment file if it exists
def load_env_file(env_file='.env'):
    """Load environment variables from a file."""
    env_path = Path(__file__).parent / env_file
    if env_path.exists():
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip()

# Load environment configuration
environment = os.getenv('ENVIRONMENT', 'development')
load_env_file(f'.env.{environment}')
load_env_file('.env')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Get environment variables with defaults
origins_env = os.getenv('ALLOWED_ORIGINS')
logger.info(f"ALLOWED_ORIGINS env var: {origins_env}")
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', 
    'http://localhost:4200,http://localhost:8080,http://localhost:8081,http://0.0.0.0:8080,http://0.0.0.0:8081,http://127.0.0.1:8080,http://127.0.0.1:8081'
).split(',')
PORT = int(os.getenv('PORT', '8000'))
HOST = os.getenv('HOST', '127.0.0.1')
DATA_DIRECTORY = os.getenv('DATA_DIRECTORY', 'data')

# Security configuration
ENABLE_RATE_LIMITING = os.getenv('ENABLE_RATE_LIMITING', 'true').lower() == 'true'
RATE_LIMIT_REQUESTS = int(os.getenv('RATE_LIMIT_REQUESTS', '1000'))  # Generous for intranet
RATE_LIMIT_WINDOW = int(os.getenv('RATE_LIMIT_WINDOW', '3600'))  # 1 hour

# Rate limiting storage
request_counts = defaultdict(list)

def validate_filename(filename: str) -> tuple[bool, str]:
    """
    Secure filename validation for intranet deployment
    Returns: (is_valid, sanitized_filename)
    """
    if not filename or len(filename) > 100:
        return False, ""
    
    # Check for dangerous patterns BEFORE sanitization
    dangerous_patterns = ['..', '/', '\\', '\0', '.env', 'config', 'passwd', 'shadow', 'hosts']
    for pattern in dangerous_patterns:
        if pattern in filename.lower():
            return False, ""
    
    # Remove any dangerous characters, keep only alphanumeric, hyphens, underscores
    sanitized = re.sub(r'[^\w\-_]', '', filename)
    
    # Ensure it's not empty after sanitization
    if not sanitized:
        return False, ""
    
    # Prevent hidden files
    if sanitized.startswith('.'):
        return False, ""
    
    # Must contain at least one letter or number
    if not re.search(r'[a-zA-Z0-9]', sanitized):
        return False, ""
    
    # Basic pattern validation
    if not re.match(r'^[a-zA-Z0-9_\-]+$', sanitized):
        return False, ""
    
    return True, sanitized

def secure_file_path(base_dir: str, filename: str) -> tuple[bool, str]:
    """
    Create secure file path and verify it's within base directory
    """
    is_valid, clean_filename = validate_filename(filename)
    if not is_valid:
        return False, ""
    
    try:
        # Create absolute paths for comparison
        base_path = Path(base_dir).resolve()
        file_path = (base_path / f"{clean_filename}.json").resolve()
        
        # Ensure the file path is within the base directory
        file_path.relative_to(base_path)
        return True, str(file_path)
    except (ValueError, OSError):
        return False, ""

def check_rate_limit(client_ip: str) -> bool:
    """
    Gentle rate limiting for intranet use
    """
    if not ENABLE_RATE_LIMITING:
        return True
    
    now = time.time()
    
    # Clean old requests
    request_counts[client_ip] = [
        req_time for req_time in request_counts[client_ip] 
        if now - req_time < RATE_LIMIT_WINDOW
    ]
    
    # Check limit
    if len(request_counts[client_ip]) >= RATE_LIMIT_REQUESTS:
        return False
    
    # Record this request
    request_counts[client_ip].append(now)
    return True

# Define the allowed origins
origins = ALLOWED_ORIGINS
logger.info(f"Configured CORS origins: {origins}")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# View-based file mappings for secure access
VIEW_MAPPINGS = {
    "benchmark-case1": [
        # Case 1 Circularity files
        "c1g1l1_circularity.json", "c1g2l1_circularity.json", "c1g3l1_circularity.json",
        "c1g1l2_circularity.json", "c1g2l2_circularity.json", "c1g3l2_circularity.json",
        "c1g1l3_circularity.json", "c1g2l3_circularity.json", "c1g3l3_circularity.json",
        # Case 1 Center of Mass files
        "c1g1l1_com.json", "c1g2l1_com.json", "c1g3l1_com.json",
        "c1g1l2_com.json", "c1g2l2_com.json", "c1g3l2_com.json",
        "c1g1l3_com.json", "c1g2l3_com.json", "c1g3l3_com.json",
        # Case 1 Rise Velocity files
        "c1g1l1_rise_velocity.json", "c1g2l1_rise_velocity.json", "c1g3l1_rise_velocity.json",
        "c1g1l2_rise_velocity.json", "c1g2l2_rise_velocity.json", "c1g3l2_rise_velocity.json",
        "c1g1l3_rise_velocity.json", "c1g2l3_rise_velocity.json", "c1g3l3_rise_velocity.json",
        # Case 1 Mass files
        "c1g1l1_mass.json", "c1g2l1_mass.json", "c1g3l1_mass.json",
        "c1g1l2_mass.json", "c1g2l2_mass.json", "c1g3l2_mass.json",
        "c1g1l3_mass.json", "c1g2l3_mass.json", "c1g3l3_mass.json",
        # Case 1 Shape files
        "c1g1l5s.json", "c1g2l1s.json", "c1g3s.json",
        "c1g1l6s.json", "c1g2l2s.json"
    ],
    "benchmark-case2": [
        # Case 2 Shape files
        "c2g1l8s.json", "c2g2l2s.json", "c2g3l4s.json",
        # Case 2 Circularity files
        "c2g1l4_circularity.json", "c2g1l5_circularity.json", "c2g1l6_circularity.json",
        "c2g2l1_circularity.json", "c2g2l2_circularity.json", "c2g2l3_circularity.json",
        "c2g3l2_circularity.json", "c2g3l3_circularity.json", "c2g3l4_circularity.json",
        # Case 2 Center of Mass files
        "c2g1l4_com.json", "c2g1l5_com.json", "c2g1l6_com.json",
        "c2g2l1_com.json", "c2g2l2_com.json", "c2g2l3_com.json",
        "c2g3l2_com.json", "c2g3l3_com.json", "c2g3l4_com.json",
        # Case 2 Rise Velocity files
        "c2g1l4_rise_vel.json", "c2g1l5_rise_vel.json", "c2g1l6_rise_vel.json",
        "c2g2l1_rise_vel.json", "c2g2l2_rise_vel.json", "c2g2l3_rise_vel.json",
        "c2g3l2_rise_vel.json", "c2g3l3_rise_vel.json",
        # Case 2 Bubble Mass files
        "c2g1l4_bubble_mass.json", "c2g1l5_bubble_mass.json", "c2g1l6_bubble_mass.json",
        "c2g2l1_bubble_mass.json", "c2g2l2_bubble_mass.json", "c2g2l3_bubble_mass.json",
        "c2g3l2_bubble_mass.json", "c2g3l3_bubble_mass.json",
        # FeatFlow files
        "ff_circularityL1.json", "ff_circularityL2.json", "ff_circularityL3.json",
        "ff_bubbleMassL1.json", "ff_bubbleMassL2.json", "ff_bubbleMassL3.json",
        # Additional Case 2 Shape files
        "c2g1l6s.json", "c2g2l1s.json", "c2g1l7s.json", "c2g2l3s.json",
        # Downsampled Bubble Shape files
        "down_bubbleShapeL1.json", "down_bubbleShapeL2.json", "down_bubbleShapeL3.json"
    ],
    "rising-bubble-3d": [
        # Rising Bubble 3D files
        "RB3sphericityL1.json", "RB3sphericityL2.json", "RB3sphericityL3.json",
        "RB3bubble_massL1.json", "RB3bubble_massL2.json", "RB3bubble_massL3.json",
        "RB3sizeL1.json", "RB3sizeL2.json", "RB3sizeL3.json",
        "RB3surfaceL1.json", "RB3surfaceL2.json", "RB3surfaceL3.json"
    ]
}

class FileRequest(BaseModel):
    fileNames: List[str]
    
    @validator('fileNames')
    def validate_filenames(cls, v):
        if not v:
            raise ValueError('fileNames cannot be empty')
        
        if len(v) > 20:  # Reasonable limit for intranet
            raise ValueError('Too many files requested (max 20)')
        
        for filename in v:
            if not filename or len(filename) > 100:
                raise ValueError(f'Invalid filename length: {filename}')
            
            # Basic character validation
            if not re.match(r'^[a-zA-Z0-9_\-\.]+$', filename):
                raise ValueError(f'Invalid filename format: {filename}')
        
        return v

class ViewRequest(BaseModel):
    view_name: str
    
    @validator('view_name')
    def validate_view_name(cls, v):
        if not v or len(v) > 50:
            raise ValueError('Invalid view name length')
        
        # Only allow alphanumeric, hyphens, and underscores
        if not re.match(r'^[a-zA-Z0-9\-_]+$', v):
            raise ValueError('Invalid view name format')
        
        return v

# Define a type for the error response structure for clarity
class ErrorResponse(BaseModel):
    error: str


# Define the expected successful response structure (dictionary)
# Using Dict[str, Any] because the JSON content can vary
ResponseType = Dict[str, Any]

# Request logging middleware
@app.middleware("http")  # <-- This decorator registers the function as HTTP middleware
async def log_requests(request: Request, call_next):
    start_time = time.time()  # Record the time when the request is received
    client_ip = request.client.host  # Get the IP address of the client making the request

    logger.info(f"Request: {request.method} {request.url.path} from {client_ip}")
    # Log that a request was received, e.g., "GET /get-view-data from 192.168.1.20"

    response = await call_next(request)
    # `call_next` forwards the request to the next step in the chain (usually the route handler),
    # and waits for the response to come back.

    process_time = time.time() - start_time  # Measure how long it took to process the request
    logger.info(f"Response: {response.status_code} in {process_time:.3f}s")
    # Log the status code and how long it took

    return response  # Send the response back to the client


@app.post("/get-multiple-json-v-new")
async def get_multiple_json_v_new(request: FileRequest, http_request: Request) -> ResponseType:
    client_ip = http_request.client.host
    logger.info(f"File request received: {request.fileNames} from {client_ip}")
    
    # Rate limiting check
    if not check_rate_limit(client_ip):
        logger.warning(f"Rate limit exceeded for {client_ip}")
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")
    
    response_data: ResponseType = {}

    # Read all files listed in fileNames
    for file_name in request.fileNames:
        # Secure file path validation
        is_valid, file_path = secure_file_path(DATA_DIRECTORY, file_name)
        
        if not is_valid:
            logger.warning(f"Invalid filename rejected: {file_name} from {client_ip}")
            response_data[file_name] = ErrorResponse(error=f"Invalid filename: {file_name}").dict()
            continue

        logger.debug(f"Attempting to read file: {file_path}")

        # Check if the file exists and read it
        if os.path.isfile(file_path):
            try:
                with open(file_path, "r", encoding="utf-8") as file: # Specify utf-8
                    data = json.load(file)
                    # --- Assign data to the dictionary using filename as key ---
                    response_data[file_name] = data
                    logger.debug(f"Successfully read and parsed: {file_name}")
            except json.JSONDecodeError as e:
                logger.error(f"JSON Decode Error reading file {file_name}: {e}")
                # --- Assign error object to the dictionary ---
                response_data[file_name] = ErrorResponse(error=f"Error parsing JSON file: {file_name}").dict()
            except IOError as e:
                 logger.error(f"IO Error reading file {file_name}: {e}")
                 response_data[file_name] = ErrorResponse(error=f"Error reading file: {file_name}").dict()
            except Exception as e:
                # Catch any other unexpected errors during file processing
                logger.error(f"Unexpected error processing file {file_name}: {e}", exc_info=True)
                response_data[file_name] = ErrorResponse(error=f"Unexpected error processing file: {file_name}").dict()
        else:
            logger.warning(f"File not found: {file_path}")
            # --- Assign error object to the dictionary ---
            response_data[file_name] = ErrorResponse(error=f"File not found: {file_name}").dict()

    # Return the JSON response dictionary
    return response_data

@app.post("/get-multiple-json")
async def get_multiple_json(request: FileRequest, http_request: Request):
    client_ip = http_request.client.host
    logger.info(f"Legacy file request received: {request.fileNames} from {client_ip}")
    
    # Rate limiting check
    if not check_rate_limit(client_ip):
        logger.warning(f"Rate limit exceeded for {client_ip}")
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")

    json_responses = []

    # Read all files listed in fileNames
    for file_name in request.fileNames:
        # Secure file path validation
        is_valid, file_path = secure_file_path(DATA_DIRECTORY, file_name)
        
        if not is_valid:
            logger.warning(f"Invalid filename rejected: {file_name} from {client_ip}")
            json_responses.append({"error": f"Invalid filename: {file_name}"})
            continue
        
        # Check if the file exists and read it
        if os.path.isfile(file_path):
            try:
                with open(file_path, "r", encoding="utf8") as file:
                    data = json.load(file)
                    json_responses.append(data)
            except Exception as e:
                json_responses.append({"error": f"Error reading file: {file_name}"})
        else:
            json_responses.append({"error": f"File not found: {file_name}"})

    # Return JSON response array
    return json_responses

@app.post("/get-view-data")
async def get_view_data(request: ViewRequest, http_request: Request) -> ResponseType:
    """Secure view-based file access endpoint"""
    client_ip = http_request.client.host
    logger.info(f"View request: {request.view_name} from {client_ip}")
    
    # Rate limiting check
    if not check_rate_limit(client_ip):
        logger.warning(f"Rate limit exceeded for {client_ip}")
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")
    
    # Check if view exists in mappings
    if request.view_name not in VIEW_MAPPINGS:
        logger.warning(f"Invalid view requested: {request.view_name} from {client_ip}")
        raise HTTPException(status_code=404, detail=f"View '{request.view_name}' not found")
    
    # Get the file list for this view
    file_list = VIEW_MAPPINGS[request.view_name]
    response_data: ResponseType = {}
    
    logger.info(f"Loading {len(file_list)} files for view '{request.view_name}'")
    
    # Read all files for this view
    for filename in file_list:
        # Remove .json extension for secure_file_path function
        base_filename = filename.replace('.json', '')
        
        # Use existing secure file path validation
        is_valid, file_path = secure_file_path(DATA_DIRECTORY, base_filename)
        
        if not is_valid:
            logger.error(f"Security violation: Invalid file in view mapping: {filename}")
            response_data[base_filename] = ErrorResponse(error=f"Invalid file in view: {filename}").dict()
            continue
        
        logger.debug(f"Attempting to read file: {file_path}")
        
        # Check if the file exists and read it
        if os.path.isfile(file_path):
            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    data = json.load(file)
                    # Use base filename (without .json) as key to match existing frontend expectations  
                    response_data[base_filename] = data
                    logger.debug(f"Successfully read and parsed: {filename}")
            except json.JSONDecodeError as e:
                logger.error(f"JSON Decode Error reading file {filename}: {e}")
                response_data[base_filename] = ErrorResponse(error=f"Error parsing JSON file: {filename}").dict()
            except IOError as e:
                logger.error(f"IO Error reading file {filename}: {e}")
                response_data[base_filename] = ErrorResponse(error=f"Error reading file: {filename}").dict()
            except Exception as e:
                logger.error(f"Unexpected error processing file {filename}: {e}", exc_info=True)
                response_data[base_filename] = ErrorResponse(error=f"Unexpected error processing file: {filename}").dict()
        else:
            logger.warning(f"File not found for view {request.view_name}: {file_path}")
            response_data[base_filename] = ErrorResponse(error=f"File not found: {filename}").dict()
    
    logger.info(f"View '{request.view_name}' loaded {len(response_data)} files successfully")
    return response_data

if __name__ == '__main__':
    uvicorn.run(app, host=HOST, port=PORT)


## source env/bin/activate  in server directory
## uvicorn server:app --reload --port 8000

## ng serve