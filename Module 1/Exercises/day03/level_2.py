# Level 2: Intermediate Exercises

#4. List Operations
numbers = [10, 25, 40, 15, 60, 30]

print("Numbers greater than 30:")
for num in numbers:
    if num > 30:
        print(f" - {num}")


sorted_numbers = sorted(numbers)
print("Sorted list:", sorted_numbers)


total_sum = sum(numbers)
average = total_sum / len(numbers)
print(f"Sum: {total_sum}")
print(f"Average: {average:.2f}\n")


#5.Dictionary Operations
products = {
    "Laptop": 45000,
    "Mouse": 1200,
    "Keyboard": 2500,
    "Monitor": 18000,
    "Headphones": 3500
}


print(f"{'PRODUCT':<15} | {'PRICE (ETB)':<10}")
print("-" * 30)
for product, price in products.items():
    print(f"{product:<15} | {price:>10,.2f} ETB")
print("-" * 30)


user_product = input("\nEnter a product name to check price: ").strip()
price_result = products.get(user_product.capitalize(), "Product not found in store inventory.")
print(f"Result: {price_result}\n")


#6. List Comprehension
nums_1_to_20 = [i for i in range(1, 21)]
print("1 to 20:", nums_1_to_20)


evens_1_to_30 = [i for i in range(1, 31) if i % 2 == 0]
print("Evens (1 to 30):", evens_1_to_30)


odds_1_to_10 = [i for i in range(1, 11) if i % 2 != 0]
print("Odds (1 to 10):", odds_1_to_10)