def findMinArrowShots(points: List[List[int]]) -> int:
    if not points:
        return 0
    
    # Sort balloons by their end points
    points.sort(key=lambda x: x[1])
    
    arrows = 1  # At least one arrow is needed
    end = points[0][1]  # The first arrow is shot at the end of the first balloon
    
    for x_start, x_end in points[1:]:
        if x_start > end:
            # If the start of the next balloon is beyond the end of the current burst zone,
            # we need a new arrow
            arrows += 1
            end = x_end  # Move the shooting position to the new balloon's end
    
    return arrows
