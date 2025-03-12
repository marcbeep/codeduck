class Solution:
	def containsDuplicate(self, nums: List[int]) -> bool:
		return any(count > 1 for count in Counter(nums).values())
