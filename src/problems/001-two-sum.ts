import { LeetCodeProblem } from "@/lib/types";

const problem: LeetCodeProblem = {
  id: 1,
  title: "Two Sum",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  solution: `function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
}`,
  category: "Array",
  difficulty: "Easy",
};

export default problem;
