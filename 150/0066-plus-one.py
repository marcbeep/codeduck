class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        carry = 1
        idx = len(digits)-1
        while carry > 0 and idx >= 0:
            digits[idx] += carry
            carry = 0
            if digits[idx] > 9:
                carry = digits[idx] - 9
                digits[idx] = 0
            idx -= 1
        
        if carry > 0:
            digits.insert(0, carry)
        
        return digits
