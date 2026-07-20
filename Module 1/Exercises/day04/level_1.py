#Level 1: Basic OOP Exercises,Simple Class – Person ---
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"Hello! My name is {self.name} and I am {self.age} years old.")

person1 = Person("Abebe", 22)
person2 = Person("Kebede", 25)

person1.introduce()
person2.introduce()
print()


# 2,Rectangle Class

class Rectangle:
    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width

    def perimeter(self):
        return 2 * (self.length + self.width)

rect1 = Rectangle(10, 5)
rect2 = Rectangle(7.5, 4)


print(f"Rectangle 1 (10x5)  -> Area: {rect1.area()} | Perimeter: {rect1.perimeter()}")
print(f"Rectangle 2 (7.5x4) -> Area: {rect2.area()} | Perimeter: {rect2.perimeter()}")
print()


#3, Bank Account (Basic)

class Account:
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"Deposited {amount:,} ETB. New Balance: {self.balance:,} ETB")
        else:
            print("Deposit amount must be positive.")

    def withdraw(self, amount):
        if amount > self.balance:
            print(f"Insufficient funds! Available balance: {self.balance:,} ETB")
        elif amount <= 0:
            print("Withdrawal amount must be positive.")
        else:
            self.balance -= amount
            print(f"Withdrew {amount:,} ETB. Remaining Balance: {self.balance:,} ETB")


account1 = Account("Abebe", 5000.0)
print(f"Account created for {account1.owner} with initial balance of {account1.balance:,} ETB.")

account1.deposit(1500)
account1.withdraw(2000)
account1.withdraw(10000) 