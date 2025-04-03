class Solution:
    def addBinary(self, a: str, b: str) -> str:
        carry = 0         # This stores the carry value during addition
        result = ""       # This will store the final binary result as a string

        # Make both binary strings the same length by adding leading zeros
        max_length = max(len(a), len(b))
        a = a.zfill(max_length)
        b = b.zfill(max_length)

        # Loop from the last character (rightmost bit) to the first
        for i in range(len(a) - 1, -1, -1):
            # Add corresponding bits and the carry
            total = int(a[i]) + int(b[i]) + carry

            # The result bit is total % 2 (either 0 or 1)
            result = str(total % 2) + result

            # Update carry (1 if total is 2 or 3, else 0)
            carry = total // 2

        # If there's a carry left after the loop, add it to the front
        if carry:
            result = '1' + result

        return result
