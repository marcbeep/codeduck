from collections import Counter

def findAnagrams(s: str, p: str):
    len_p = len(p)
    len_s = len(s)

    if len_p > len_s:
        return []

    p_count = Counter(p)
    s_count = Counter(s[:len_p - 1])
    result = []

    for i in range(len_p - 1, len_s):
        # Add the new character to the window
        s_count[s[i]] += 1
        
        # Compare window with target anagram
        if s_count == p_count:
            result.append(i - len_p + 1)

        # Remove the oldest character from the window
        s_count[s[i - len_p + 1]] -= 1
        if s_count[s[i - len_p + 1]] == 0:
            del s_count[s[i - len_p + 1]]

    return result
