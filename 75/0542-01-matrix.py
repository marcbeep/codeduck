# 0 和 1 组成的矩阵 mat ，请输出一个大小相同的矩阵，其中每一个格子是 mat 中对应位置元素到最近的 0 的距离。

# 两个相邻元素间的距离为 1 。

# 這道題目要求計算每個位置到最近的 0 的距離。
# 這個問題可以使用廣度優先搜索（BFS）來解決，因為我們要找到從每個位置到最近的 0 的最短路徑。
# BFS 的特性是可以逐層擴展，因此適合這類最短路徑問題。

# 解題思路

# 初始化：
# 創建一個 m x n 的矩陣 dist，初始值為無窮大（inf），表示每個位置到最近的 0 的距離尚未確定。
# 創建一個隊列 queue，用來存儲所有初始的 0 位置，因為距離 0 本身的距離是 0，這些位置作為 BFS 的起點。

# BFS 遍歷：
# 從所有的 0 位置開始，使用 BFS 遍歷矩陣，將每個 1 位置更新為到最近的 0 的距離。
# 每次從隊列中取出當前位置 (i, j)，然後查看其上下左右四個相鄰位置。
# 如果相鄰位置的距離比當前位置的距離加 1 更大，則更新相鄰位置的距離，並將其加入隊列中繼續擴展。

# 返回結果：
# BFS 結束後，dist 矩陣將包含每個位置到最近 0 的距離，返回這個矩陣作為結果。


# 計算每個位置到最近的 0 的距離。-> 從每個0出發 -> 把每個 0 的座標放入 deque -> 開始 BFS
# 把每個 0 的座標 dist = 0
# m x n 的矩陣 dist，初始值為無窮大（inf）

# 286 542
# 286. Walls and Gates
# 542. 01 Matrix 同 1765. Map of Highest Peak?
# 317. Shortest Distance from All Buildings

# 417. Pacific Atlantic Water Flow
# 994. Rotting Oranges
# 1162. As Far from Land as Possible
# 1765. Map of Highest Peak

# BFS, DP, deque O(m * n), s:O(m * n) 遍歷整個矩陣的每一個元素。空間來存儲 dist 矩陣以及 BFS 的隊列


from collections import deque
class Solution:
    def updateMatrix(self, mat: List[List[int]]) -> List[List[int]]:
        if not mat or not mat[0]:
            return mat

        rows, cols = len(mat), len(mat[0])
        INF = float("inf")
        dq = deque()
        # dist = [[float("inf")] * cols for row in range(rows)]           # 最外面要有 []
        # visited = set()                 # 沒有 visited 也可以

        # 將所有的 0 加入隊列，並將其對應的距離設置為 0
        for row in range(rows):
            for col in range(cols):
                if mat[row][col] == 0:
                    dq.append((row, col))
                else:
                    mat[row][col] = INF

        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        while dq:
            cur_x, cur_y = dq.popleft()
            for dx, dy in directions:
                new_x, new_y = cur_x + dx, cur_y + dy

                if 0 <= new_x < rows and 0 <= new_y < cols and mat[new_x][new_y] == INF:                  
                    mat[new_x][new_y] = mat[cur_x][cur_y] + 1
                    dq.append((new_x, new_y))

        return mat
