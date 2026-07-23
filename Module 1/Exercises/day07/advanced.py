# 6. Recursive Problems

def reverse_string_recursive(s: str) -> str:
    """Recursively reverses a string."""
    if len(s) <= 1:
        return s
    return reverse_string_recursive(s[1:]) + s[0]


def count_occurrences_recursive(arr: list, target) -> int:
    """Recursively counts occurrences of target in a list."""
    if not arr:
        return 0
    match = 1 if arr[0] == target else 0
    return match + count_occurrences_recursive(arr[1:], target)


# 7. Sorting Comparison 

def selection_sort_tracked(arr: list):
    """
    Selection Sort: Repeatedly finds the minimum element and moves it to the front.
    Tracks total comparisons and swaps.
    """
    arr_copy = arr.copy()
    comparisons = 0
    swaps = 0
    n = len(arr_copy)

    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            comparisons += 1
            if arr_copy[j] < arr_copy[min_idx]:
                min_idx = j
        if min_idx != i:
            arr_copy[i], arr_copy[min_idx] = arr_copy[min_idx], arr_copy[i]
            swaps += 1

    return arr_copy, comparisons, swaps


def insertion_sort_tracked(arr: list):
    """
    Insertion Sort: Builds the sorted array item by item by inserting elements into place.
    Tracks total comparisons and swaps/shifts.
    """
    arr_copy = arr.copy()
    comparisons = 0
    shifts = 0
    n = len(arr_copy)

    for i in range(1, n):
        key = arr_copy[i]
        j = i - 1
        while j >= 0:
            comparisons += 1
            if arr_copy[j] > key:
                arr_copy[j + 1] = arr_copy[j]
                shifts += 1
                j -= 1
            else:
                break
        arr_copy[j + 1] = key

    return arr_copy, comparisons, shifts



# 8. Two Pointer Technique
def two_sum_sorted(arr: list, target_sum: float):
    """
    Given a SORTED array, finds two numbers that add up to target_sum.
    Time Complexity: O(n), Space Complexity: O(1)
    Returns tuple of (val1, val2) or None if not found.
    """
    left = 0
    right = len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target_sum:
            return arr[left], arr[right]
        elif current_sum < target_sum:
            left += 1
        else:
            right -= 1

    return None



# Execution Driver

if __name__ == "__main__":
    print("6. RECURSIVE PROBLEMS")
    text = "AddisBank"
    print(f"Reversing '{text}': {reverse_string_recursive(text)}")
    items = ["ETB", "USD", "ETB", "EUR", "ETB", "GBP"]
    print(f"Count of 'ETB' in {items}: {count_occurrences_recursive(items, 'ETB')}\n")

    print("7. SORTING COMPARISON")
    test_list = [29, 10, 14, 37, 13, 89, 5, 22]
    print(f"Original Test List: {test_list}")

    sel_sorted, sel_comp, sel_swaps = selection_sort_tracked(test_list)
    ins_sorted, ins_comp, ins_shifts = insertion_sort_tracked(test_list)

    print(f"Selection Sort Result: {sel_sorted}")
    print(f" -> Comparisons: {sel_comp}, Swaps: {sel_swaps}")

    print(f"Insertion Sort Result: {ins_sorted}")
    print(f" -> Comparisons: {ins_comp}, Shifts: {ins_shifts}\n")

    print("8. TWO POINTER TECHNIQUE")
    sorted_numbers = [100, 250, 500, 750, 1000, 1500, 2000]
    target = 1250
    pair = two_sum_sorted(sorted_numbers, target)
    print(f"Sorted Array: {sorted_numbers}")
    print(f"Target Sum: {target}")
    print(f"Found Pair: {pair}")