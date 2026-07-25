# CodeOps | Module 1 | Day 8 | Larger Project
# Addis Bank — Account Management System V5.0
# Added: history property for recursive transaction sum


# SINGLETON — shared configuration
class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance



# OBSERVER PATTERN — notification handlers
class SMSAlert:
    def update(self, event: str):
        print(f"[TeleBirr SMS] {event}")


class AuditLog:
    def update(self, event: str):
        print(f"[Audit Log]   {event}")



# BASE ACCOUNT — balance logic + transaction history stack
class Account:
    def __init__(self, owner: str, account_number: str, balance: float = 0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self._observers = []
        self._history = []

    @property
    def balance(self):
        return self.__balance

    @property
    def history(self):
        """Return a copy of the transaction history for external use."""
        return self._history.copy()

    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, event: str):
        for obs in self._observers:
            obs.update(event)

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount
        self._history.append(("deposit", amount))
        self._notify(f"Deposit +{amount:.2f} ETB >> #{self.account_number}")

    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient funds")
        self.__balance -= amount
        self._history.append(("withdraw", amount))
        self._notify(f"Withdrawal -{amount:.2f} ETB >> #{self.account_number}")

    def undo_last(self):
        if not self._history:
            raise ValueError("No transactions to undo")
        tx_type, amount = self._history.pop()
        if tx_type == "deposit":
            self.__balance -= amount
        else:
            self.__balance += amount
        self._notify(f"Undo {tx_type} {amount:.2f} ETB >> #{self.account_number}")

    def statement(self):
        print(f"[Account] {self.owner} | #{self.account_number} | Balance: {self.__balance:.2f} ETB")



# SAVINGS ACCOUNT
class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0, rate=None):
        super().__init__(owner, account_number, balance)
        self.rate = rate if rate is not None else BankConfig().interest_rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print(f"[Savings] {self.owner} | #{self.account_number} | "
              f"Balance: {self.balance:.2f} ETB | Rate: {self.rate:.0%}")



# CURRENT ACCOUNT
class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0, overdraft_limit=None):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit = (
            overdraft_limit if overdraft_limit is not None else BankConfig().overdraft_limit
        )

    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        max_available = self.balance + self.overdraft_limit
        if amount > max_available:
            raise ValueError(f"Overdraft limit exceeded (max available: {max_available:.2f} ETB)")
        self._Account__balance -= amount
        self._history.append(("withdraw", amount))
        self._notify(f"Withdrawal -{amount:.2f} ETB >> #{self.account_number} (overdraft zone)")

    def statement(self):
        print(f"[Current] {self.owner} | #{self.account_number} | "
              f"Balance: {self.balance:.2f} ETB | Overdraft: {self.overdraft_limit} ETB")



# FACTORY
class AccountFactory:
    @staticmethod
    def create(kind: str, owner: str, number: str, balance: float = 0):
        kind = kind.lower()
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        if kind == "current":
            return CurrentAccount(owner, number, balance)
        raise ValueError(f"Unknown account type: '{kind}'")