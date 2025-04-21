from typing import List

class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        dick = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz",
        }

        out = []
        if not digits:
            return out

        def backtrack(i, curr):
            if i == len(digits):
                out.append(curr)
                return
            
            for c in dick[digits[i]]:
                backtrack(i + 1, curr + c)

        backtrack(0, "")
        return out
