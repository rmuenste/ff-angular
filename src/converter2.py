## convert data to json format. 


import json
import argparse

def read_data(file_path, y_col):
    x_values = []
    y_values = []

    with open(file_path, 'r') as file:
        for line in file:
            values = line.split()
            x_values.append(float(values[0]))
            y_values.append(float(values[y_col]))

    return x_values, y_values

def convert_to_plotly_format(x_values, y_values):
    plotly_data = [
        {
            "x": x_values,
            "y": y_values,
            "type": "scatter",
            "mode": "lines+points",
            "marker": {"color": "blue"}
        }
    ]
    return plotly_data

def main(file_path, y_col):
    x_values, y_values = read_data(file_path, y_col)
    plotly_data = convert_to_plotly_format(x_values, y_values)
    print(json.dumps(plotly_data, indent=2))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert data file to angular-plotly.js format")
    parser.add_argument("file", help="Path to the input file")
    parser.add_argument("y_col", type=int, help="Column number for y-values (0-indexed)")

    args = parser.parse_args()

    main(args.file, args.y_col)
