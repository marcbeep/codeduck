class Solution:
    def intToRoman(self, num: int) -> str:
        # Define the Roman numeral values, including subtractive cases
        values = [
            (1000, 'M'), (900, 'CM'), (500, 'D'), (400, 'CD'),
            (100, 'C'), (90, 'XC'), (50, 'L'), (40, 'XL'),
            (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')
        ]
        
        # Initialize the result string
        answer = ''
        
        # Loop through each value-symbol pair
        for value, symbol in values:
            while num >= value:  # Use the symbol as long as the number is >= value
                answer += symbol
                num -= value  # Subtract the value from num
        
        return answer
