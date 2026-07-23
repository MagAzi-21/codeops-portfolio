# 1. Recursion Basics=

def factorial_recursive(n: int) -> int:
    """Calculates factorial recursively. Base case: n <= 1."""
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)


def factorial_iterative(n: int) -> int:
    """Calculates factorial iteratively using a loop."""
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result



# 2. Recursion with Lists
def sum_list(numbers: list) -> float:
    """Recursively sums all numbers in a list."""
    if not numbers:
        return 0
    return numbers[0] + sum_list(numbers[1:])



# 3. Linear Search

def linear_search(arr: list, target) -> int:
    """
    Searches sequentially through the list for target.
    Time Complexity: O(n)
    Returns index if found, else -1.
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# 4. Binary Search

def binary_search(arr: list, target) -> int:
    """
    Performs binary search on a SORTED array.
    Time Complexity: O(log n)
    
    Why does Binary Search require a sorted array?
    ----------------------------------------------
    Binary search relies on dividing the search space in half at each step based on 
    comparing the target with the middle element. If the array is unsorted, knowing 
    that target > arr[mid] gives NO guarantee that the target lies to the right. 
    Sorted order provides the structural guarantee required to discard half the array safely.
    """
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


# 5. Bubble Sort

def bubble_sort(arr: list) -> list:
    """Sorts array using Bubble Sort and prints array after each pass."""
    n = len(arr)
    arr_copy = arr.copy() 

    print(f"Initial Array: {arr_copy}")
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr_copy[j] > arr_copy[j + 1]:
                arr_copy[j], arr_copy[j + 1] = arr_copy[j + 1], arr_copy[j]
                swapped = True
        print(f"Pass {i + 1}: {arr_copy}")
        if not swapped:
            print("No swaps occurred. Array is fully sorted early!")
            break

    return arr_copy

# Execution Driver

if __name__ == "__main__":
    print("1. RECURSION BASICS")
    print(f"Recursive Factorial(5): {factorial_recursive(5)}")
    print(f"Iterative Factorial(5): {factorial_iterative(5)}\n")

    print("2. RECURSION WITH LISTS")
    sample_nums = [10, 20, 30, 40, 50]
    print(f"Sum of {sample_nums}: {sum_list(sample_nums)}\n")

    print("3. LINEAR SEARCH")
    data = [15, 3, 9, 22, 41, 7]
    target = 22
    idx = linear_search(data, target)
    print(f"Linear Search for {target} in {data}: Found at index {idx}\n")

    print("4. BINARY SEARCH")
    sorted_data = sorted(data)
    target = 22
    idx_bin = binary_search(sorted_data, target)
    print(f"Binary Search for {target} in sorted array {sorted_data}: Found at index {idx_bin}\n")

    print("5. BUBBLE SORT PASSES")
    unsorted_list = [64, 34, 25, 12, 22, 11, 90]
    bubble_sort(unsorted_list)