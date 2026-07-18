# name = None
# name = input("Enter your name: ")
# print(name.upper())
# print(len(name))
# print(name.upper())
# print(name.lower())
# print(f"almaz {name.upper()}")
# age = None
# age = input("Enter your age: ")
# print(f"You are {int(age) + 5} years old.")

# x = 10
# y = 20
# y = x
# print(x>y and x<y)
# print(x<y)
# print(x==y)
# print(y==x)


# count = 3
# while count > 0:
#     print(f"sending... {count}")
#     count = count - 1
# print("Sending via Telebirr")    


# for i in range(10, 15):
#     print(i)

# names = ["Almaz", "Dawit", "Abebe"]    
# for name in names:
#     print(name.lower())
# a=10
# b=20
# def no(x, y):
#     p=30
#     z = x+y+p
#     return z
# q=no(a, b) 
# print(q)


# def greet(name):
#     print(f"Selam {name}!")
# greet("Almaz")
# greet("Dawit")
# greet("Abebe")





# class Account:
#     def __init__(self, owner, balance):
#         self.owner = owner
#         self.balance = balance
#     def deposit(self, amount):
#         self.balance += amount    
#     def withdraw(self, amount):
#         self.balance -= amount
#     def statement(self):
#         print(f"{self.owner}: {self.balance} ETB")   

# X = Account("Mikiyas", 100000) 
# print(X.balance) 
# X.deposit(2000)          
# print(X.balance)
# print(X.owner)
# X.statement()
# X.withdraw(150000)
# X.statement()


class acc:
    def __init__(self, bal):
        self.__balance = bal

    def getBalance(self):
        return self.__balance
x = acc(1000)
print(x.getBalance())       