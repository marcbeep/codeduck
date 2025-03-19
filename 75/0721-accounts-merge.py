class UnionFind:
    def __init__(self):
        self.parent = {}
        self.rank = {}

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        rootX = self.find(x)
        rootY = self.find(y)

        if rootX != rootY:
            if self.rank[rootX] > self.rank[rootY]:
                self.parent[rootY] = rootX
            elif self.rank[rootX] < self.rank[rootY]:
                self.parent[rootX] = rootY
            else:
                self.parent[rootY] = rootX
                self.rank[rootX] += 1

class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        uf = UnionFind()
        email_to_name = {}

        for account in accounts:
            name = account[0]
            first_email = account[1]
            for email in account[1:]:
                if email not in uf.parent:
                    uf.parent[email] = email
                    uf.rank[email] = 0
                uf.union(first_email, email)
                email_to_name[email] = name

        groups = defaultdict(list)
        for email in email_to_name:
            root = uf.find(email)
            groups[root].append(email)

        result = []
        for root, emails in groups.items():
            result.append([email_to_name[root]] + sorted(emails))

        return result

