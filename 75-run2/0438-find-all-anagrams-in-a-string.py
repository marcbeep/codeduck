class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        window   = len(p)
        pCount   = Counter(p)
        fuccMarc = []

        for i in range((len(s) - window) + 1):
            currSubString = s[i : i + window]
            if Counter(currSubString) == pCount:
                fuccMarc.append(i)
        
        return fuccMarc
