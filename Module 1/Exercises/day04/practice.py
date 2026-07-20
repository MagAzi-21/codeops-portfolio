#1. Book Class
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
        print(f"'{self.title}' by {self.author} ({self.pages} pages)")



book1 = Book("Breaking The Habit of Being Yourself", "Dr. Joe Dispenza", 464)
book2 = Book("Think and Grow Rich", "Napoleon Hill", 352)

book1.describe()
book2.describe()
print()


#2, 3 & 4. Encapsulated & Validated Product Class
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    @quantity.setter
    def quantity(self, value):
        if value < 0:
            print(f"[!] Error: Cannot set negative quantity ({value}) for {self.name}.")
        else:
            self.__quantity = value

    def restock(self, n):
        if n > 0:
            self.__quantity += n
            print(f"[+] Restocked {n} unit(s) of {self.name}. New total: {self.__quantity}")
        else:
            print("[!] Restock amount must be greater than zero.")

    def sell(self, n):
        if n <= 0:
            print("[!] Sale amount must be greater than zero.")
        elif n > self.__quantity:
            print(f"[!] Sale refused: Cannot sell {n} unit(s) of {self.name}. Only {self.__quantity} in stock.")
        else:
            self.__quantity -= n
            print(f"[-] Sold {n} unit(s) of {self.name}. Remaining stock: {self.__quantity}")


# Test Product operations and validation
item = Product("Wireless Mouse", 1200.0, 10)
print(f"Created: {item.name} | Price: {item.price} ETB | Quantity: {item.quantity}")

item.restock(5)
item.sell(3)
item.sell(20)

item.quantity = -10
print()


#5, Prove Independence 
p1 = Product("Keyboard", 2500, 15)
p2 = Product("Monitor", 18000, 8)
p3 = Product("Headphones", 3500, 20)

print("Initial States:")
print(f"  P1 ({p1.name}): {p1.quantity} units")
print(f"  P2 ({p2.name}): {p2.quantity} units")
print(f"  P3 ({p3.name}): {p3.quantity} units")

print("\n--> Modifying P1 stock (selling 10 units)...")
p1.sell(10)

print("\nStates after modifying P1:")
print(f"  P1 ({p1.name}): {p1.quantity} units (Updated)")
print(f"  P2 ({p2.name}): {p2.quantity} units (Unaffected)")
print(f"  P3 ({p3.name}): {p3.quantity} units (Unaffected)")