# Addis Bank — Account Management System V1.0
 
class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be greater than zero.")
        self.__balance += amount
        return self.__balance

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be greater than zero.")
        if amount > self.__balance:
            raise ValueError("Insufficient funds for this withdrawal.")
        self.__balance -= amount
        return self.__balance

    def statement(self):
        print(f"Account Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Current Balance: {self.__balance:.2f} ETB")


if __name__ == "__main__":
    # For test run
    acc = Account("Abebe Bikila", "ETB-100234", 500)
    acc.deposit(250)
    acc.withdraw(100)
    acc.statement()