# Addis Bank — Account Management System V1.0

class Account:
    """A single bank account with encapsulated balance."""

    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance

    # balance property
    @property
    def balance(self):
        return self.__balance

    # Deposit: reject non-positive amounts
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount

    # Withdraw: reject non-positive & overdrafts
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient funds")
        self.__balance -= amount

    # Statement
    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Account #: {self.account_number}")
        print(f"Balance: {self.__balance} ETB")


if __name__ == "__main__":
    acc1 = Account("Almaz Bekele", "ACC-1001", 1500)
    acc2 = Account("Dawit Tesfaye", "ACC-1002")

    acc1.deposit(500)
    acc1.withdraw(300)
    acc1.statement()

    print("------")

    acc2.deposit(1000)
    acc2.statement()