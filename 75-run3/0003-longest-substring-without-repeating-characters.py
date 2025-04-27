class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:

        if s == "":
            return 0

        length = []
        j = 0
        substr = ""

        for i in range(len(s)):
            while j < len(s) and s[j] not in substr:
                substr = substr + s[j]
                length.append(len(substr))
                j += 1
                # print(f"curr substr: {substr}")
            j = i
            substr = ""

        # print(length)
        return max(length)
