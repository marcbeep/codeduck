# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        rightView = [] * 100

        def dfs(root, depth):
            if not root:
                return
            
            if len(rightView) - 1 < depth:
                rightView.append(root.val)
            else:
                rightView[depth] = root.val

            dfs(root.left,  depth+1)
            dfs(root.right, depth+1)
        
        dfs(root, 0)
        return rightView
