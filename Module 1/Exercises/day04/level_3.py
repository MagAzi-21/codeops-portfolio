# Level 3: Advanced OOP Exercises

#7. Full Bank Account with Properties
print("--- 7. Bank Account System ---")

class BankAccount:
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self._balance = max(0.0, float(balance))

    @property
    def balance(self):
        """Getter for balance."""
        return self._balance

    @balance.setter
    def balance(self, value):
        """Setter for balance with validation."""
        if value < 0:
            print("Error: Balance cannot be set to a negative value.")
        else:
            self._balance = value

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            print(f"[{self.owner}] Deposited {amount} ETB. New balance: {self._balance} ETB")
        else:
            print("Error: Deposit amount must be positive.")

    def withdraw(self, amount):
        if amount <= 0:
            print("Error: Withdrawal amount must be positive.")
        elif amount > self._balance:
            print(f"[{self.owner}] Insufficient funds! Current balance: {self._balance:,.2f} ETB")
        else:
            self._balance -= amount
            print(f"[{self.owner}] Withdrew {amount} ETB. Remaining balance: {self._balance} ETB")

    def transfer(self, to_account, amount):
        if amount <= 0:
            print("Error: Transfer amount must be positive.")
        elif amount > self._balance:
            print(f"[{self.owner}] Transfer failed due to insufficient funds.")
        else:
            self._balance -= amount
            to_account.deposit(amount)
            print(f"Successfully transferred {amount:,.2f} ETB from {self.owner} to {to_account.owner}.")


# Test BankAccount
acc1 = BankAccount("Meseret", 1000.0)
acc2 = BankAccount("Abebe", 500.0)

acc1.deposit(500)
acc1.withdraw(200)
acc1.transfer(acc2, 400)
print()


#8, Library System
class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.__is_available = True 

    @property
    def is_available(self):
        return self.__is_available

    def mark_borrowed(self):
        if self.__is_available:
            self.__is_available = False
            return True
        return False

    def mark_returned(self):
        if not self.__is_available:
            self.__is_available = True
            return True
        return False

    def __str__(self):
        status = "Available" if self.__is_available else "Borrowed"
        return f"'{self.title}' by {self.author} (ISBN: {self.isbn}) - [{status}]"


class Library:
    def __init__(self):
        self.__books = [] 

    def add_book(self, book):
        self.__books.append(book)
        print(f"Added to library: {book.title}")

    def borrow_book(self, isbn):
        for book in self.__books:
            if book.isbn == isbn:
                if book.mark_borrowed():
                    print(f"Successfully borrowed '{book.title}'.")
                else:
                    print(f"Sorry, '{book.title}' is currently checked out.")
                return
        print(f"Error: Book with ISBN {isbn} not found in library.")

    def return_book(self, isbn):
        for book in self.__books:
            if book.isbn == isbn:
                if book.mark_returned():
                    print(f"Successfully returned '{book.title}'.")
                else:
                    print(f"'{book.title}' was not marked as borrowed.")
                return
        print(f"Error: Book with ISBN {isbn} not found in library.")

    def display_catalog(self):
        print("\nLibrary Catalog:")
        for book in self.__books:
            print(f" - {book}")


#
library = Library()

b1 = Book("Breaking The Habit of Being Yourself", "Dr. Joe Dispenza", "978-0132350884")
b2 = Book("Think and Grow Rich", "Napoleon Hill", "978-0201616224")

library.add_book(b1)
library.add_book(b2)

library.display_catalog()
library.borrow_book("978-0132350884") 
library.borrow_book("978-0132350884")  
library.return_book("978-0132350884") 
print()


#9, Car Class with Encapsulation
class Car:
    def __init__(self, brand, max_fuel=50.0):
        self.brand = brand
        self.__speed = 0.0
        self.__fuel = float(max_fuel)
        self.max_fuel = float(max_fuel)

    @property
    def speed(self):
        return self.__speed

    @property
    def fuel(self):
        return self.__fuel

    def accelerate(self, increment=10):
        if self.__fuel <= 0:
            print(f"[{self.brand}] Out of fuel! Cannot accelerate.")
            self.__speed = 0
            return
        
        self.__speed += increment
        self.__fuel = max(0.0, self.__fuel - (increment * 0.2))  # Fuel consumption rate
        print(f"[{self.brand}] Accelerated to {self.__speed} km/h (Fuel remaining: {self.__fuel}L)")

    def brake(self, decrement=10):
        self.__speed = max(0.0, self.__speed - decrement)
        print(f"[{self.brand}] Slowed down to {self.__speed} km/h")

    def refuel(self, liters):
        if liters <= 0:
            print("Error: Fuel amount must be positive.")
            return

        if self.__fuel + liters > self.max_fuel:
            self.__fuel = self.max_fuel
            print(f"[{self.brand}] Tank topped off to max capacity ({self.max_fuel}L).")
        else:
            self.__fuel += liters
            print(f"[{self.brand}] Added {liters}L. Current fuel: {self.__fuel}L.")



my_car = Car("Toyota", max_fuel=20.0)

print(f"Car: {my_car.brand} | Speed: {my_car.speed} km/h | Fuel: {my_car.fuel}L")
my_car.accelerate(30)
my_car.accelerate(40)
my_car.brake(20)
my_car.refuel(10)