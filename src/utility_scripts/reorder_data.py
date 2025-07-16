"""
This script reorderes the segements of a line so that they are continuous
"""
import numpy as np

def distance(p1, p2):
    """Euclidean distance between two 2D points p1=(x1,y1) and p2=(x2,y2)."""
    return np.hypot(p1[0] - p2[0], p1[1] - p2[1])

def reorder_segments(segments, tol=1e-12):
    """
    Reorder segments so that they form a continuous chain.
    
    Parameters
    ----------
    segments : ndarray of shape (N, 4)
        Each row has [x1, y1, x2, y2].
    tol : float
        Tolerance for matching endpoints (in case of floating-point round-off).

    Returns
    -------
    reordered : ndarray of shape (N, 4)
        The segments in continuous order.
    """
    # Convert each row into ((x1, y1), (x2, y2)) for easier manipulation
    segs = [((row[0], row[1]), (row[2], row[3])) for row in segments]
    
    # Start with the first segment in the list
    chain = [segs[0]]
    used = set([0])  # Keep track of used segment indices
    n = len(segs)
    
    # We'll build the chain from left to right
    current_end = chain[0][1]  # The endpoint we want to match for the next segment
    
    # For each of the remaining segments, find the one that has an endpoint
    # matching "current_end" (within tol) and add it to the chain.
    for _ in range(1, n):
        print(f"Processing segment {_}")
        found_next = False
        for i in range(n):
            if i in used:
                continue
            p1, p2 = segs[i]
            
            # Check if p1 matches current_end
            if distance(p1, current_end) < tol:
                # We can attach this segment as is: (p1->p2)
                chain.append(segs[i])
                current_end = p2
                used.add(i)
                found_next = True
                break
            # Check if p2 matches current_end
            elif distance(p2, current_end) < tol:
                # We need to flip this segment (p2->p1)
                chain.append((p2, p1))
                current_end = p1
                used.add(i)
                found_next = True
                break
        
        if not found_next:
            # If we can't find a matching segment, the chain might be disjoint
            # or there's no perfect endpoint match within tolerance.
            # Handle this case as needed (raise an error, or try to continue, etc.).
            raise ValueError("Could not find a continuation for the chain. The data may be disjoint.")
    
    # Convert back to array form [x1, y1, x2, y2]
    reordered = np.array([ [p1[0], p1[1], p2[0], p2[1]] for (p1, p2) in chain])
    
    return reordered

if __name__ == "__main__":
    # Example usage:
    
    # Suppose 'shape_240.txt' has columns x1, y1, x2, y2 in random order
    data = np.genfromtxt("shape_240.txt")
    
    # Reorder so the segments form a continuous chain
    data_reordered = reorder_segments(data)

    np.savetxt("reordered_shape_240.txt",data_reordered)
    
"""    # --- Now you can plot the first k segments and always have a continuous line.
    import matplotlib.pyplot as plt

    k = 10  # Choose how many you want to plot
    plt.figure(figsize=(8,8))
    
    for i in range(k):
        x1, y1, x2, y2 = data_reordered[i]
        plt.plot([x1, x2], [y1, y2], marker='o')
    
    plt.title(f'Plot of First {k} Line Segments (Continuous Order)')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.axis('equal')
    plt.grid()
    plt.show()"""
