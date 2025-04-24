class Solution:
    def addBinary(self, a: str, b: str) -> str:
        maxLen = max(len(a), len(b))
        a = a.zfill(maxLen)
        b = b.zfill(maxLen)

        outy = ''
        carry = 0
        for i in range(maxLen - 1, -1, -1):
            sum = int(a[i]) + int(b[i]) + carry
            if sum == 1:
                outy = '1' + outy
                carry = 0
            elif sum == 2:
                carry = 1
                outy = '0' + outy
            elif sum == 3:
                carry = 1
                outy = '1' + outy
            else:
                outy = '0' + outy
        
        if carry == 1:
            outy = '1' + outy
            
        return outy
