# 1. Simple Inheritance

class Vehicle:
    def __init__(self, name, model, year):
        self.name = name
        self.model = model
        self.year = year

    def info(self):
        print(f"Vehicle: {self.year} {self.name} {self.model}")


class Car(Vehicle):
    def __init__(self, name, model, year, num_doors):
        super().__init__(name, model, year)
        self.num_doors = num_doors

    def open_trunk(self):
        print(f"Opening the trunk of the {self.name} {self.model}.")


class Motorcycle(Vehicle):
    def __init__(self, name, model, year, engine_cc):
        super().__init__(name, model, year)
        self.engine_cc = engine_cc

    def pop_wheelie(self):
        print(f"The {self.name} {self.model} ({self.engine_cc}cc) popped a wheelie!")


car = Car("Toyota", "Corolla", 2022, 4)
car.info()
car.open_trunk()

bike = Motorcycle("Yamaha", "MT-07", 2023, 689)
bike.info()
bike.pop_wheelie()
print()


class Account:
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self._balance = max(0.0, float(balance))

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            print(f"[{self.owner}] Deposited {amount} ETB. Balance: {self._balance} ETB")
        else:
            print("Deposit amount must be positive.")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self._balance:
            print(f"[{self.owner}] Insufficient funds! Balance: {self._balance} ETB")
        else:
            self._balance -= amount
            print(f"[{self.owner}] Withdrew {amount} ETB. Remaining: {self._balance} ETB")


# 2. SavingsAccount Inheritance

class SavingsAccount(Account):
    def __init__(self, owner, balance=0.0, interest_rate=0.07):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def add_interest(self):
        interest = self._balance * self.interest_rate
        self._balance += interest
        print(f"[{self.owner}] Applied interest (+{interest} ETB). New Balance: {self._balance} ETB")


sav_acc = SavingsAccount("Mike", 10000.0, interest_rate=0.07)
sav_acc.deposit(2000)
sav_acc.add_interest()
print()


# 3. CurrentAccount Inheritance

class CurrentAccount(Account):
    def __init__(self, owner, balance=0.0, overdraft_limit=5000.0):
        super().__init__(owner, balance)
        self.overdraft_limit = float(overdraft_limit)

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > (self._balance + self.overdraft_limit):
            print(f"[{self.owner}] Overdraft limit exceeded! Max allowed withdrawal: {self._balance + self.overdraft_limit} ETB")
        else:
            self._balance -= amount
            print(f"[{self.owner}] Withdrew {amount} ETB. Current Balance: {self._balance} ETB")


curr_acc = CurrentAccount("Abebe", 1000.0, overdraft_limit=3000.0)
curr_acc.withdraw(2500)
curr_acc.withdraw(3000)