#4, Student Class

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = []

    def add_grade(self, grade):
        if 0 <= grade <= 100:
            self.grades.append(grade)
            print(f"Added grade {grade} for {self.name}.")
        else:
            print(f"Invalid grade: {grade}. Must be between 0 and 100.")

    def average_grade(self):
        if not self.grades:
            return 0.0
        return sum(self.grades) / len(self.grades)


# Test Student Class
student1 = Student("Abebe", "ST-1024")
student1.add_grade(85)
student1.add_grade(92)
student1.add_grade(78)

print(f"Student: {student1.name} (ID: {student1.student_id})")
print(f"Grades: {student1.grades}")
print(f"Average Grade: {student1.average_grade()}\n")


#5, Product Class
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def sell(self, quantity):
        if quantity <= 0:
            print("Quantity to sell must be greater than zero.")
        elif quantity > self.stock:
            print(f"Cannot sell {quantity} unit(s). Only {self.stock} unit(s) in stock for {self.name}.")
        else:
            self.stock -= quantity
            print(f"Sold {quantity} unit(s) of {self.name}. Remaining stock: {self.stock}")

    def restock(self, quantity):
        if quantity > 0:
            self.stock += quantity
            print(f"Restocked {quantity} unit(s) of {self.name}. New total stock: {self.stock}")
        else:
            print("Restock quantity must be positive.")


laptop = Product("Laptop", 45000.0, 10)
print(f"Product Created: {laptop.name} | Price: {laptop.price} ETB | Initial Stock: {laptop.stock}")

laptop.sell(3)
laptop.sell(10)  
laptop.restock(5)
laptop.sell(8)
print()


#6, Encapsulation Practice
class Account:
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self.__balance = max(0.0, float(balance))

    
    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited {amount} ETB. New Balance: {self.__balance} ETB")
        else:
            print("Deposit amount must be positive.")

    def withdraw(self, amount):
        if amount <= 0:
            print("Error: Withdrawal amount must be greater than zero.")
        elif amount > self.__balance:
            print(f"Error: Insufficient funds! Requested {amount} ETB, but balance is {self.__balance} ETB.")
        else:
            self.__balance -= amount
            print(f"Withdrew {amount} ETB. Remaining Balance: {self.__balance} ETB")


# Test Encapsulated Account Class
acc = Account("Kebede", 5000.0)

print(f"Account Owner: {acc.owner}")
print(f"Initial Balance (via @property): {acc.balance} ETB")


try:
    acc.balance = 1000000  
except AttributeError as e:
    print(f"Direct assignment failed as expected: {e}")


acc.deposit(2500)
acc.withdraw(10000) 
acc.withdraw(-500)   
acc.withdraw(3000)   