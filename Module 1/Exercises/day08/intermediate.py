# 4. Binary Search

def binary_search(arr, target):
    
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

def bubble_sort(arr):
    n = len(arr)
   
    a = arr.copy()
    
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        print(f"Pass {i + 1}: {a}")
        if not swapped:
            break
    return a   

if __name__ == "__main__":
    print("4, Binary Search")
    sorted_arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
    print(f"Array: {sorted_arr}")
    print("Find 23 -> Index:", binary_search(sorted_arr, 23))
    print("Find 100 -> Index:", binary_search(sorted_arr, 100))

    print("\n5, Bubble Sort")
    unsorted = [64, 34, 25, 12, 22, 11, 90]
    print("Initial array:", unsorted)
    sorted_res = bubble_sort(unsorted)
    print("Sorted result:", sorted_res)