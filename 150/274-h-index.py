class Solution:
    def hIndex(self, citations: List[int]) -> int:

        #sort in descending order
        citations.sort(reverse=True)
        print("citations sorted: ", citations)

        for i in range(len(citations)):
            rank = i + 1 # rank starts at 1
            if citations[i] < rank:
                return rank - 1

        # if all papers satisfy the h index condition, return total count
        return len(citations)
