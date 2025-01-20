# using indexes
class Solution:
    def reverseWords(self, s: str) -> str:
        newString = ""
        currString = ""
        startI = -1
        endI = -1

        i = len(s) - 1
        while i >= 0:
            if s[i] == " ":
                if currString:
                    newString += currString
                    currString = ""
                if newString and newString[-1] != " ":
                    newString += " "
                endI = i
            else:
                startI = i
                currString = s[i] + currString

            i -= 1

        if currString:
            newString += currString

        return newString.strip()

# using python string lib funcs
class Solution:
    def reverseWords(self, s: str) -> str:
        return ' '.join(reversed(s.split()))
