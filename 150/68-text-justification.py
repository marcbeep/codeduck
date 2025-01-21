class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        res, cur, cur_len = [], [], 0
        
        for w in words:
            if cur_len + len(w) + len(cur) > maxWidth:
                # Distribute spaces for the current line
                for i in range(maxWidth - cur_len):
                    cur[i % (len(cur) - 1 or 1)] += " "
                res.append("".join(cur))
                cur, cur_len = [], 0
            cur.append(w)
            cur_len += len(w)
        
        # Handle the last line
        res.append(" ".join(cur).ljust(maxWidth))
        return res
