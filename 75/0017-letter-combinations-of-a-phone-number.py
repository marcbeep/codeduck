class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        numberpad = {
            "2" : "abc",
            "3" : "def",
            "4" : "ghi",
            "5" : "jkl",
            "6" : "mno",
            "7" : "pqrs",
            "8" : "tuv",
            "9" : "wxyz",
        }

        result = []

        if not digits:
            return []
        
        def backtrack(accumulator, index):
            if index == len(digits):
                result.append(accumulator)
                return 

            for char in numberpad[digits[index]]:
                backtrack(accumulator + char, index + 1)

        backtrack("", 0)
        return result
