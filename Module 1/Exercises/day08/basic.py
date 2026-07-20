# 1. Recursion Basics

def factorial_recursive(n):
     
    if n <= 1:
        return 1
  
    return n * factorial_recursive(n - 1)

def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result


# 2. Recursion with Lists

def sum_list(numbers):
   
    if not numbers:
        return 0
    
    return numbers[0] + sum_list(numbers[1:])


# 3. Linear Search

def linear_search(arr, target):
    for index, value in enumerate(arr):
        if value == target:
            return index
    return -1
   

if __name__ == "__main__":
    print("1. Factorial")
    print("Recursive (5!):", factorial_recursive(5))
    print("Iterative (5!):", factorial_iterative(5))

    print("\n2. Sum List")
    nums = [1, 2, 3, 4, 5]
    print(f"Sum of {nums}:", sum_list(nums))

    print("\n3, Linear Search")
    arr = [10, 20, 30, 40, 50]
    print(f"Index of 30 in {arr}:", linear_search(arr, 30))
    print(f"Index of 99 in {arr}:", linear_search(arr, 99))