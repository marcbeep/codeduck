class Solution:
    def construct(self, grid: List[List[int]]) -> 'Node':
        return self.build(grid, 0, 0, len(grid))

    def build(self, grid, r, c, size):
        if size == 1:
            return Node(grid[r][c], True, None, None, None, None)

        half = size // 2
        topLeft = self.build(grid, r, c, half)
        topRight = self.build(grid, r, c + half, half)
        bottomLeft = self.build(grid, r + half, c, half)
        bottomRight = self.build(grid, r + half, c + half, half)

        if topLeft.isLeaf and topRight.isLeaf and bottomLeft.isLeaf and bottomRight.isLeaf and \
           topLeft.val == topRight.val == bottomLeft.val == bottomRight.val:
            return Node(topLeft.val, True, None, None, None, None)

        return Node(1, False, topLeft, topRight, bottomLeft, bottomRight)
