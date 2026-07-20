# 6. Recursive Problems

def reverse_string(s):
    
    if len(s) <= 1:
        return s
   
    return s[-1] + reverse_string(s[:-1])


def count_occurrences(numbers, target):
   
    if not numbers:
        return 0
   
    match = 1 if numbers[0] == target else 0
    return match + count_occurrences(numbers[1:], target)


# 7. Sorting Comparison

def selection_sort_instrumented(arr):
    a = arr.copy()
    n = len(a)
    comparisons = 0
    swaps = 0
    
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            comparisons += 1
            if a[j] < a[min_idx]:
                min_idx = j
        if min_idx != i:
            a[i], a[min_idx] = a[min_idx], a[i]
            swaps += 1
            
    return a, comparisons, swaps


def insertion_sort_instrumented(arr):
    a = arr.copy()
    n = len(a)
    comparisons = 0
    swaps = 0  
    
    for i in range(1, n):
        key = a[i]
        j = i - 1
        while j >= 0:
            comparisons += 1
            if a[j] > key:
                a[j + 1] = a[j]
                swaps += 1
                j -= 1
            else:
                break
        a[j + 1] = key
        
    return a, comparisons, swaps


# 8. Two Pointer Technique

def two_sum_sorted(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return (arr[left], arr[right])
        elif current_sum < target:
            left += 1
        else:
            right -= 1
            
    return None

if __name__ == "__main__":
    print("6, Recursive Problems")
    print("Reverse 'hello':", reverse_string("hello"))
    sample_list = [1, 2, 3, 2, 4, 2, 5]
    print("Count 2s in [1, 2, 3, 2, 4, 2, 5]:", count_occurrences(sample_list, 2))

    print("\n7, Sorting Comparison")  
    test_list = [29, 10, 14, 37, 13]
    sel_sorted, sel_comp, sel_swaps = selection_sort_instrumented(test_list)
    ins_sorted, ins_comp, ins_swaps = insertion_sort_instrumented(test_list)

    print(f"Original list: {test_list}")
    print(f"Selection Sort: {sel_sorted} | Comparisons: {sel_comp}, Swaps: {sel_swaps}")
    print(f"Insertion Sort: {ins_sorted} | Comparisons: {ins_comp}, Swaps/Shifts: {ins_swaps}")

    print("\n8, Two Pointer Technique")
    sorted_pair_arr = [2, 7, 11, 15]
    target_val = 9
    print(f"Two numbers in {sorted_pair_arr} that sum to {target_val}:", two_sum_sorted(sorted_pair_arr, target_val))