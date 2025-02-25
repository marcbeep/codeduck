class Solution:
    def addBinary(self, a: str, b: str) -> str:
        carry = 0
        result = ""

        # Pad shorter string with zeros
        max_length = max(len(a), len(b))
        a = a.zfill(max_length)
        b = b.zfill(max_length)

        for i in range(len(a) - 1, -1, -1):
            total = int(a[i]) + int(b[i]) + carry
            result = str(total % 2) + result
            carry = total // 2

        if carry:
            result = '1' + result

        return result
