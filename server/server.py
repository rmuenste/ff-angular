from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json
import os 
import uvicorn

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
    uvicorn.run(app, host="127.0.0.1", port=3000)

    