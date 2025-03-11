class Solution:
    def addBinary(self, a: str, b: str) -> str:
        maxLen = max(len(a), len(b))

        a = a.zfill(maxLen)
        b = b.zfill(maxLen)

        carry  = 0
        result = ""

        for i in range(maxLen - 1, -1, -1):
            sum = int(a[i]) + int(b[i])
            sum += carry
            
            result = str(sum % 2) + result

            carry = sum // 2
        
        if carry == 1:
            result = '1' + result
        
        return result
