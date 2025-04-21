class Solution:
    def reverseBits(self, n: int) -> int:
        binNum = bin(n)
        binNum = binNum[2:]
        binNum = binNum.rjust(32, '0')
        binNum = str(binNum)[::-1]

        return int(binNum, 2)
