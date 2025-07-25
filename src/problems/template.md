# Instructions

1. The file name is [id]-[title].json. Example: 001-two-sum.json. No need to generate if the problem already exists
2. The id corresponds with the leetcode number
3. For the list, if the problem already exists, append the new list name to the end
4. Possible categories (pick one): Arrays & Hashing, Two Pointers, Stack, Binary Search, Sliding Window, Linked List, Trees, Tries, Heap / Priority Queue, Backtracking, Intervals, Greedy, Advanced Graphs, Graphs, 1-D DP, 2-D DP, Bit Manipulation, Math & Geometry
5. For the solution, use one approach that best aligns with the category
6. Keep the explanation concise and clear

# Template

```
{
"id": 1,
"title": "Valid Parentheses",
"list": ["grind75", "neetcode150"],
"category": "Arrays & Hashing",
"difficulty": "Easy",
"description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
"constraints": [
"1 <= s.length <= 104",
"s consists of parentheses only '()[]{}'"
],
"testCases": [
{
"input": {
"s": "()"
},
"output": true,
"explanation": "Simple valid case with matching parentheses."
},
{
"input": {
"s": "()[]{}"
},
"output": true,
"explanation": "Valid case with multiple types of brackets."
},
{
"input": {
"s": "(]"
},
"output": false,
"explanation": "Invalid case with mismatched brackets."
},
{
"input": {
"s": "([)]"
},
"output": false,
"explanation": "Invalid case with incorrectly nested brackets."
}
],
"solution": {
"code": "def two_sum(nums: list[int], target: int) -> list[int]:\n # Create a hash map to store number -> index mapping\n num_map = {}\n \n # Iterate through the array\n for i, num in enumerate(nums):\n # Calculate the complement needed\n complement = target - num\n \n # If complement exists in map, we found our pair\n if complement in num_map:\n return [num_map[complement], i]\n \n # Store current number and its index\n num_map[num] = i\n \n # No solution found (though problem states there will always be one)\n return []",
"explanation": "This solution uses a hash map to achieve O(n) time complexity:\n1. We iterate through the array once\n2. For each number, we calculate its complement (target - current number)\n3. If the complement exists in our hash map, we've found our pair\n4. Otherwise, we store the current number and its index in the hash map\n\nThe time complexity is O(n) as we only need one pass through the array. The space complexity is O(n) as we might need to store all numbers in the hash map in the worst case."
}
}
```
