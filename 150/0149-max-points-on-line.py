from collections import defaultdict
from math import gcd

class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        if len(points) <= 1:
            return len(points)
        
        max_points = 1

        for i in range(len(points)):
            slope_count = defaultdict(int)
            duplicate = 0  # Points with the same coordinates as points[i]
            vertical = 0   # Points that form a vertical line with points[i]
            current_max = 0
            
            x1, y1 = points[i]
            
            for j in range(i + 1, len(points)):
                x2, y2 = points[j]
                
                # Check for duplicate points
                if x1 == x2 and y1 == y2:
                    duplicate += 1
                    continue
                
                # Handle vertical lines separately
                if x1 == x2:
                    vertical += 1
                else:
                    dx = x2 - x1
                    dy = y2 - y1
                    
                    # Force dx to be non-negative for a unique slope representation
                    if dx < 0:
                        dx, dy = -dx, -dy
                    
                    # Reduce the slope (dy/dx) to its simplest form using gcd
                    g = gcd(dx, dy)
                    dx //= g
                    dy //= g
                    
                    slope_count[(dx, dy)] += 1
                    current_max = max(current_max, slope_count[(dx, dy)])
            
            max_points = max(max_points, current_max + duplicate + 1, vertical + duplicate + 1)
        
        return max_points
