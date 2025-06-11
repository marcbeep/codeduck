import { LeetCodeProblem } from "@/lib/types";

const problem: LeetCodeProblem = {
  id: 2,
  title: "Reverse Linked List",
  description:
    "Given the head of a singly linked list, reverse the list, and return the reversed list.",
  solution: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
  category: "Linked List",
  difficulty: "Easy",
};

export default problem;
