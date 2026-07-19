# Exercise 1: Unique cities
cities_list = ["Addis Ababa", "Hawassa", "Adama", "Addis Ababa", "Bahir Dar", "Hawassa"]
distinct_cities = set(cities_list)

print("Distinct cities:", distinct_cities)
print("Count of unique cities:", len(distinct_cities))
print()



# Exercise 2: Price report
grocery_prices = {
    "Teff (kg)": 120.0,
    "Injera": 15.0,
    "Coffee (kg)": 450.0,
    "Milk (L)": 80.0,
    "Sugar (kg)": 95.0
}


for item, price in grocery_prices.items():
    print(f"{item}: {price} ETB")
print()


# Exercise 3: Tax comprehension
prices = [100, 250, 400, 80]
prices_with_tax = [price * 1.15 for price in prices]
print("Prices with 15% tax:", prices_with_tax)
print()



# Exercise 4: Cheap items
cheap_prices = [price for price in prices if price < 200]
print("Prices under 200 ETB:", cheap_prices)
print()



# Exercise 5: Write & read
customer_names = ["Abebe", "Kebede", "Tigist"]

with open("names.txt", "w") as f:
    for name in customer_names:
        f.write(f"{name}\n")


print("Names read from file:")
with open("names.txt", "r") as f:
    for line in f:
        print(line.strip())
print()



# Exercise 6: Safe division
user_input = input("Enter a number to divide 1000 by: ")

try:
    number = float(user_input)
    result = 1000 / number
    print(f"1000 divided by {number} is: {result}")
except ValueError:
    print("Error: Please enter a valid numerical value!")
except ZeroDivisionError:
    print("Error: Cannot divide by zero!")