import heapq
from collections import defaultdict


# 1. Tree Basics
class TreeNode:
    def __init__(self, name: str):
        self.name = name
        self.children = []

    def add_child(self, child_node):
        self.children.append(child_node)

    def print_tree(self, level: int = 0):
        indent = "  " * level
        print(f"{indent}- {self.name}")
        for child in self.children:
            child.print_tree(level + 1)


# 2. Binary Search Tree
class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, value: int):
        if not self.root:
            self.root = BSTNode(value)
        else:
            self._insert_recursive(self.root, value)

    def _insert_recursive(self, current: BSTNode, value: int):
        if value < current.value:
            if current.left is None:
                current.left = BSTNode(value)
            else:
                self._insert_recursive(current.left, value)
        elif value > current.value:
            if current.right is None:
                current.right = BSTNode(value)
            else:
                self._insert_recursive(current.right, value)

    def search(self, value: int) -> bool:
        return self._search_recursive(self.root, value)

    def _search_recursive(self, current: BSTNode, value: int) -> bool:
        if current is None:
            return False
        if current.value == value:
            return True
        elif value < current.value:
            return self._search_recursive(current.left, value)
        else:
            return self._search_recursive(current.right, value)


# 3. Graph Basics
class CustomerGraph:
    def __init__(self):
        self.graph = defaultdict(list)

    def add_connection(self, sender: str, receiver: str):
        self.graph[sender].append(receiver)
        if receiver not in self.graph:
            self.graph[receiver] = []

    def print_graph(self):
        for customer, transfers in self.graph.items():
            transfers_str = ", ".join(transfers) if transfers else "None"
            print(f"{customer} -> [{transfers_str}]")


# 4. Heap Basics
class PriorityTransactionQueue:
    def __init__(self):
        self.heap = []

    def add_transaction(self, priority_score: int, description: str):
        heapq.heappush(self.heap, (-priority_score, description))

    def pop_highest_priority():
        pass


if __name__ == "__main__":
    #1. TREE BASICS
    head_office = TreeNode("Head Office")
    bole = TreeNode("Bole Branch")
    piassa = TreeNode("Piassa Branch")

    bole.add_child(TreeNode("Teller"))
    bole.add_child(TreeNode("Loan Officer"))

    head_office.add_child(bole)
    head_office.add_child(piassa)
    head_office.print_tree()
    print()

    #2. BINARY SEARCH TREE
    bst = BinarySearchTree()
    values = [50, 30, 70, 20, 40, 60]
    for val in values:
        bst.insert(val)

    for search_val in [40, 100]:
        found = bst.search(search_val)
        print(f"Search for {search_val}: {'Exists' if found else 'Does not exist'}")
    print()

    print("--- 3. GRAPH BASICS ---")
    cg = CustomerGraph()
    cg.add_connection("Almaz", "Dawit")
    cg.add_connection("Dawit", "Tigist")
    cg.add_connection("Tigist", "Hanna")
    cg.add_connection("Hanna", "Almaz")
    cg.print_graph()
    print()

    print("--- 4. HEAP BASICS ---")
    priority_queue = []
    transactions = [(5000, "Big Loan"), (200, "Small Deposit"), (10000, "Fraud Alert")]

    for score, desc in transactions:
        heapq.heappush(priority_queue, (-score, desc))

    neg_score, desc = heapq.heappop(priority_queue)
    print(f"Popped Highest Priority Item: {desc} (Priority Score: {-neg_score})")