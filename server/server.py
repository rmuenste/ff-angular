from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json
import os 
import uvicorn
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Define the allowed origins
origins = [
    "http://localhost:4200",  # Angular app
    # You can add more origins as needed
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class FileRequest(BaseModel):
    fileNames: List[str]

# Define a type for the error response structure for clarity
class ErrorResponse(BaseModel):
    error: str


# Define the expected successful response structure (dictionary)
# Using Dict[str, Any] because the JSON content can vary
ResponseType = Dict[str, Any]

@app.post("/get-multiple-json-v-new")
async def get_multiple_json_v_new(request: FileRequest) -> ResponseType:
    logger.info(f"File request received: {request.fileNames}")
    # Ensure fileNames is a list
    if not isinstance(request.fileNames, list):
        logger.error("Received non-list fileNames despite Pydantic model")
        raise HTTPException(status_code=400, detail="fileNames should be an array")

    response_data: ResponseType = {}
    data_directory = "data" # Define base directory

# Read all files listed in fileNames
    for file_name in request.fileNames:
        # Basic sanitization/check: prevent path traversal attempts
        if ".." in file_name or "/" in file_name or "\\" in file_name:
             logger.warning(f"Invalid characters detected in filename request: {file_name}")
             response_data[file_name] = ErrorResponse(error=f"Invalid filename format: {file_name}").dict()
             continue # Skip to the next filename

        file_path = os.path.join(data_directory, f"{file_name}.json")
        logger.info(f"Attempting to read file: {file_path}")

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
async def get_multiple_json(request: FileRequest):
    # Ensure fileNames is a list
    if not isinstance(request.fileNames, list):
        raise HTTPException(status_code=400, detail="fileNames should be an array")

    json_responses = []

    # Read all files listed in fileNames
    for file_name in request.fileNames:
        file_path = os.path.join("data", f"{file_name}.json")
        
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

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)


## source env/bin/activate  in server directory
## uvicorn server:app --reload --port 8000

## ng serve