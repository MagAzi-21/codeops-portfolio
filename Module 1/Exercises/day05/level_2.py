from abc import ABC, abstractmethod
# Base Account Class 
class Account(ABC):
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

    def statement(self):
        print(f"Account Statement - Owner: {self.owner} | Balance: {self._balance} ETB")

    @abstractmethod
    def calculate_interest(self):
        pass


# 4, Method Overriding

class SavingsAccount(Account):
    def __init__(self, owner, balance=0.0, interest_rate=0.07):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def statement(self):
        print(f"Savings Account - Owner: {self.owner} | Balance: {self._balance} ETB | Interest Rate: {self.interest_rate * 100}%")

    def calculate_interest(self):
        interest = self._balance * self.interest_rate
        print(f"[{self.owner}] Calculated Interest: {interest} ETB")
        return interest


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
            print(f"[{self.owner}] Withdrew {amount} ETB. Balance: {self._balance} ETB")

    def statement(self):
        print(f"Current Account - Owner: {self.owner} | Balance: {self._balance} ETB | Overdraft Limit: {self.overdraft_limit} ETB")

    def calculate_interest(self):
        print(f"[{self.owner}] Current accounts do not earn interest.")
        return 0.0


#5.Polymorphism Practice
accounts = [
    SavingsAccount("Bekele", 1000.0, 0.05),
    CurrentAccount("Abebe", 2000.0, 3000.0),
    SavingsAccount("Kebede", 5000.0, 0.08)
]

for acc in accounts:
    acc.statement()
    acc.deposit(100)
    print()


# 6. Abstract Base Class

for acc in accounts:
    acc.calculate_interest()