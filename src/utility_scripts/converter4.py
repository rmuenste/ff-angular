## convert data to json format. 
import math
import json
import argparse
import subprocess

def read_data(file_path, y_col):
    x_values = []
    y_values = []

    with open(file_path, 'r') as file:
        for line in file:
            values = line.split()
            x_values.append(float(values[0]))
            y_values.append(float(values[y_col]))

    return x_values, y_values

def convert_to_plotly_format(x_values, y_values, marker_name, marker_color):
    plotly_data = {
            "x": x_values,
            "y": y_values,
            "type": "scatter",
            "mode": "lines+points",
            "name": marker_name,
            "marker": {"color": marker_color}
        }
    return plotly_data

def main(file_path, y_col, marker_name, marker_color):
    for y in range(4): 
        x_values, y_values = read_data(file_path, y)
        convY = [float(y0) /(math.pi * 0.25**2.) * 100. for y0 in y_values]
        plotly_data = convert_to_plotly_format(x_values, convY, marker_name, marker_color)
        outputString = "var myVar = " + json.dumps(plotly_data)
        #print(outputString)
        input_file  = "myVar" + str(y) + ".js"
        output_file = "myVar" + str(y) + ".min.js"
        with open(input_file, "w") as f:
            f.write(outputString) 
        
        command = ["../node_modules/terser/bin/terser", input_file, "-o", output_file]
        # Run the command
        try:
            result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            print(f"Minification successful: {output_file}")
        except subprocess.CalledProcessError as e:
            print(f"An error occurred: {e.stderr.decode('utf-8')}")        
            

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert data file to angular-plotly.js format")
    parser.add_argument("file", help="Path to the input file")
    parser.add_argument("y_col", type=int, help="Column number for y-values (0-indexed)")
    parser.add_argument("marker_name", type=str, help="Name of the marker")
    parser.add_argument("marker_color", type=str, help="Color of the marker")

    args = parser.parse_args()
    main(args.file, args.y_col, args.marker_name, args.marker_color)
