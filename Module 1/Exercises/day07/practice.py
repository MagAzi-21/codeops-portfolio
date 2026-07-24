import time
import random
from collections import deque


# 1. Name the Big-O
def list_index_example(arr: list):
    return arr[3]


def single_loop_example(arr: list):
    for item in arr:
        _ = item * 2


def nested_loop_example(arr: list):
    for i in arr:
        for j in arr:
            _ = i + j


def dict_lookup_example(d: dict, key: str):
    return d.get(key)


def binary_search_example(arr: list, target: int):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1


# 2. List vs. Dict Lookup
def benchmark_list_vs_dict():
    size = 100_000
    accounts_list = [f"ACC_{i:06d}" for i in range(size)]
    accounts_dict = {f"ACC_{i:06d}": f"Holder_{i}" for i in range(size)}

    target_account = f"ACC_{size - 5:06d}"

    start_time = time.perf_counter()
    _ = target_account in accounts_list
    list_duration = time.perf_counter() - start_time

    start_time = time.perf_counter()
    _ = target_account in accounts_dict
    dict_duration = time.perf_counter() - start_time

    print(f"Target: {target_account}")
    print(f"List Lookup Time: {list_duration:.6f} seconds")
    print(f"Dict Lookup Time: {dict_duration:.6f} seconds")
    if dict_duration > 0:
        print(f"Result: Dict lookup was ~{int(list_duration / dict_duration)}x faster!\n")


# 3. Build a Stack
class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            return None
        return self._items[-1]

    def is_empty(self) -> bool:
        return len(self._items) == 0

    def __len__(self):
        return len(self._items)


def reverse_names_with_stack(names: list) -> list:
    stack = Stack()
    for name in names:
        stack.push(name)

    reversed_names = []
    while not stack.is_empty():
        reversed_names.append(stack.pop())

    return reversed_names


# 4. Build a Queue
def run_bank_queue():
    service_line = deque()

    customers = ["Abebe", "Kebede", "Tizita", "Dawit", "Marta"]
    for customer in customers:
        service_line.append(customer)
        print(f"[+] Enqueued customer: {customer}")

    print("\n--- Serving Customers (FIFO Order) ---")
    while service_line:
        served_customer = service_line.popleft()
        print(f"[✓] Serving customer: {served_customer}")
    print()


# 5. Singly Linked List
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        current = self.head
        chain = []
        while current:
            chain.append(str(current.data))
            current = current.next
        print(" -> ".join(chain) if chain else "Empty List")


if __name__ == "__main__":
    benchmark_list_vs_dict()

    original_names = ["Yared", "Helina", "Sami", "Beti", "Michael"]
    reversed_list = reverse_names_with_stack(original_names)
    print(f"Original Names : {original_names}")
    print(f"Reversed Names : {reversed_list}\n")

    run_bank_queue()

    ll = LinkedList()
    ll.push_front(50)
    ll.push_front(40)
    ll.push_front(30)
    ll.push_front(20)
    ll.push_front(10)

    print("Linked List elements:")
    ll.print_all()