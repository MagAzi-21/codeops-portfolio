import heapq
from collections import deque


# 1. Build a BST
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    return root


def in_order_traversal(root, result=None):
    if result is None:
        result = []
    if root:
        in_order_traversal(root.left, result)
        result.append(root.value)
        in_order_traversal(root.right, result)
    return result


# 2. Tree depth
def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))


# 3. Graph BFS
def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    traversal_order = []

    while queue:
        vertex = queue.popleft()
        traversal_order.append(vertex)
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return traversal_order, visited


# 4. Graph DFS
def dfs(graph, start, visited=None, traversal_order=None):
    if visited is None:
        visited = set()
    if traversal_order is None:
        traversal_order = []

    visited.add(start)
    traversal_order.append(start)

    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited, traversal_order)
    return traversal_order, visited


# 5. Priority queue
def run_priority_queue():
    pq = []
    tasks = [
        (3, "Routine Audit"),
        (1, "Critical Fraud Alert"),
        (4, "Monthly Statement Generation"),
        (2, "High-Value Loan Approval"),
        (5, "General Support Ticket"),
    ]

    for item in tasks:
        heapq.heappush(pq, item)

    popped_tasks = []
    while pq:
        popped_tasks.append(heapq.heappop(pq))
    return popped_tasks


if __name__ == "__main__":
    print("Question 1 Output:")
    balances = [1200.50, 450.00, 3200.75, 150.00, 800.25, 5000.00]
    root = None
    for bal in balances:
        root = insert(root, bal)
    sorted_balances = in_order_traversal(root)
    print("In-order Traversal (Sorted Balances):", sorted_balances)

    print("\nQuestion 2 Output:")
    tree_height = height(root)
    print("Depth/Height of Binary Search Tree:", tree_height)

    print("\nQuestion 3 & 4 Output:")
    customer_graph = {
        "Almaz": ["Dawit", "Tigist"],
        "Dawit": ["Hanna"],
        "Tigist": ["Hanna", "Beti"],
        "Hanna": [],
        "Beti": []
    }

    bfs_order, bfs_reachable = bfs(customer_graph, "Almaz")
    dfs_order, dfs_reachable = dfs(customer_graph, "Almaz")

    print("BFS Visit Order:", bfs_order)
    print("BFS Reachable Vertices:", bfs_reachable)
    print("DFS Visit Order:", dfs_order)
    print("DFS Reachable Vertices:", dfs_reachable)

    print("\nQuestion 5 Output:")
    processed_priority_tasks = run_priority_queue()
    print("Tasks Processed by Priority:")
    for priority, task in processed_priority_tasks:
        print(f"Priority {priority}: {task}")