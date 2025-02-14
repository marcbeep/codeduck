from collections import deque
from typing import List

class Solution:
    def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:
        # comment
        if endGene not in bank:
            return -1  # If endGene is not in bank, no valid transformation exists

        bank_set = set(bank)  # Convert bank to a set for O(1) lookup
        queue = deque([(startGene, 0)])  # (current_gene, mutations_count)
        visited = set([startGene])  # Keep track of visited genes
        mutation_options = ['A', 'C', 'G', 'T']  # Possible mutations

        while queue:
            gene, mutations = queue.popleft()

            if gene == endGene:
                return mutations  # Found the shortest path

            # Try mutating each character in the gene
            for i in range(len(gene)):
                for char in mutation_options:
                    if char != gene[i]:  # Ensure a single mutation
                        mutated_gene = gene[:i] + char + gene[i+1:]

                        if mutated_gene in bank_set and mutated_gene not in visited:
                            visited.add(mutated_gene)
                            queue.append((mutated_gene, mutations + 1))

        return -1  # No valid mutation path found
