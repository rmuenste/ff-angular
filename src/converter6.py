import numpy as np
import json

# File names for input and corresponding output
#files = ["downsampled_shape_120.txt", "downsampled_shape_240.txt", "downsampled_shape_480.txt"]
#files = ["downsampled_shape_120.txt", "downsampled_shape_240.txt", "downsampled_shape_480.txt"]
#output_names = ["ff_bubbleShapeL1.json", "ff_bubbleShapeL2.json", "ff_bubbleShapeL3.json"]

files = ["downsampled_shape_240.txt"]
output_names = ["ffdown_bubbleShapeL2.json"]

# Loop through each file and process it
for file, output in zip(files, output_names):
    # Load the text file
    data = np.genfromtxt(file)

    # Check if the data has exactly 4 columns
    if data.shape[1] != 4:
        raise ValueError(f"The file {file} must have exactly 4 columns: x1, y1, x2, y2.")

    # Extract x and y values
    x_values = data[:, [0, 2]].flatten()
    y_values = data[:, [1, 3]].flatten()

    # Round to 4 decimal places
    x_values = np.round(x_values + 0.5, 4).tolist()
    y_values = np.round(y_values, 4).tolist()

    # Convert to JSON format
    json_data = {"x": x_values, "y": y_values}

    # Save as JSON file
    with open(output, "w") as json_file:
        json.dump(json_data, json_file, indent=4)

    print(f"JSON file saved: {output}")