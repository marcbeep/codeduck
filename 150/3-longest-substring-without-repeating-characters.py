class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_appeared = set()
        left = 0
        max_length = 0

        for right in range(len(s)):
            # If duplicate character is found, shrink the window from the left
            while s[right] in char_appeared:
                char_appeared.remove(s[left])
                left += 1

            # Add the current character to the set
            char_appeared.add(s[right])

            # Update the maximum length
            max_length = max(max_length, right - left + 1)

        return max_length
