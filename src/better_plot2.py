import numpy as np

def downsample_line_segments(segments, skip=10):
    """
    Downsample a chain of line segments by keeping every 'skip'-th vertex.
    
    Parameters
    ----------
    segments : ndarray of shape (N, 4)
        Reordered segments in the form [x1, y1, x2, y2].
        Assumes continuity: segment i ends where segment i+1 begins.
    skip : int
        Keep every 'skip'-th point in the chain (plus the final endpoint).
        
    Returns
    -------
    downsampled_segments : ndarray of shape (M, 4)
        Fewer line segments, still forming a continuous chain.
    """
    # Number of segments
    N = len(segments)
    if N == 0:
        return segments  # Nothing to downsample
    
    # The chain of segments has N+1 points:
    #   segment[0] = (p0 -> p1)
    #   segment[1] = (p1 -> p2)
    #   ...
    #   segment[N-1] = (p_{N-1} -> pN)
    
    # Extract the first point
    points = [segments[0][:2]]  # p0 = (x1,y1 of the first segment)
    
    # Extract end points from each segment (p1, p2, ..., pN)
    for i in range(N):
        x2, y2 = segments[i][2], segments[i][3]
        points.append((x2, y2))
        
    # points now has length N+1
    
    # Downsample the points by keeping every 'skip'-th one, plus the last
    downsampled_points = points[::skip]
    # If the last point is not already included, add it
    if downsampled_points[-1] != points[-1]:
        downsampled_points.append(points[-1])
    
    # Build new segments from these downsampled points
    downsampled_segments = []
    for i in range(len(downsampled_points)-1):
        p1 = downsampled_points[i]
        p2 = downsampled_points[i+1]
        downsampled_segments.append([p1[0], p1[1], p2[0], p2[1]])
        
    return np.array(downsampled_segments)

if __name__ == "__main__":
    # Example usage

    # 1. Load the reordered shape from a file
    data = np.genfromtxt("reordered_shape_480.txt")  # shape (N,4)
    
    # 2. Downsample by a factor of 10, for example
    skip_factor = 20
    data_downsampled = downsample_line_segments(data, skip=skip_factor)
    
    # 3. Save the downsampled shape to a new file (optional)
    np.savetxt("downsampled_shape_480.txt", data_downsampled, fmt="%.6f")
    
    # 4. Plot to verify
    import matplotlib.pyplot as plt
    
    plt.figure(figsize=(8, 8))
    
    # Original shape (comment out if it's too large)
    # for x1, y1, x2, y2 in data:
    #     plt.plot([x1, x2], [y1, y2], color='gray', alpha=0.5)
    
    # Downsampled shape
    for x1, y1, x2, y2 in data_downsampled:
        plt.plot([x1, x2], [y1, y2], color='red')
    
    plt.title(f"Downsampled Shape (skip={skip_factor})")
    plt.axis("equal")
    plt.grid(True)
    plt.show()
