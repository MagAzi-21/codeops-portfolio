import random


# 1. Recursive sum and count down
def total(nums: list):
    if not nums:
        return 0
    return nums[0] + total(nums[1:])


def count_down(n: int):
    if n <= 0:
        return
    print(n)
    count_down(n - 1)


# 2. Binary search
def binary_search(items: list, target):
    left, right = 0, len(items) - 1
    while left <= right:
        mid = (left + right) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1


# 3. Merge sort
def merge(left: list, right: list) -> list:
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result


def merge_sort(items: list) -> list:
    if len(items) <= 1:
        return items
    mid = len(items) // 2
    left_sorted = merge_sort(items[:mid])
    right_sorted = merge_sort(items[mid:])
    return merge(left_sorted, right_sorted)


# 4. Sort with a key
def sort_balances_descending(account_tuples: list) -> list:
    return sorted(account_tuples, key=lambda x: x[1], reverse=True)


# 5. Two pointers
def has_pair(nums: list, target) -> bool:
    left = 0
    right = len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return False


if __name__ == "__main__":
    print("Question 1 Output:")
    numbers = [10, 25, 30, 45]
    print("Total:", total(numbers))
    print("Count down from 5:")
    count_down(5)

    print("\nQuestion 2 Output:")
    balances = [150.0, 320.5, 500.0, 1200.75, 4500.0]
    target_balance = 1200.75
    idx = binary_search(balances, target_balance)
    print(f"Index of {target_balance} in {balances}: {idx}")

    print("\nQuestion 3 Output:")
    random_list = [random.randint(1, 100) for _ in range(10)]
    custom_sorted = merge_sort(random_list)
    builtin_sorted = sorted(random_list)
    print("Random List   :", random_list)
    print("Merge Sorted  :", custom_sorted)
    print("Matches sorted():", custom_sorted == builtin_sorted)

    print("\nQuestion 4 Output:")
    accounts = [("Abebe", 1500.0), ("Kebede", 4200.5), ("Tizita", 800.0), ("Marta", 9500.0)]
    sorted_accounts = sort_balances_descending(accounts)
    print("Sorted by balance descending:", sorted_accounts)

    print("\nQuestion 5 Output:")
    sorted_nums = [10, 20, 35, 50, 75, 100]
    target_sum = 70
    print(f"Has pair in {sorted_nums} summing to {target_sum}:", has_pair(sorted_nums, target_sum))