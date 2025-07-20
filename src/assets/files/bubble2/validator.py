import json
import plotly.graph_objs as go
import plotly.io as pio

# Load the JSON data
with open('c1g1l4.json', 'r') as f:
    data = json.load(f)

# Function to create plotly traces
def create_trace(data_dict):
    return go.Scatter(
        x = data_dict["x"],
        y = data_dict["y"],
        mode = data_dict.get("mode", "lines+points"),
        marker = data_dict.get("marker", {"color": "blue"}),
        name = data_dict.get("type", "scatter")
    )

# Create traces for each dataset
trace = create_trace(data["comData"])
traces = [trace]

#for key, value in data.items():
#    trace = create_trace(value)
#    traces.append(trace)

# Create the layout
layout = go.Layout(
    title="Plot from JSON Data",
    xaxis=dict(title='X-axis'),
    yaxis=dict(title='Y-axis')
)

# Create the figure
fig = go.Figure(data=traces, layout=layout)

# Plot the figure
pio.show(fig)