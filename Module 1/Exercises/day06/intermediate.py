from abc import ABC, abstractmethod
from typing import List

# 1. Apply SRP + DIP
class INotifier(ABC):

    @abstractmethod
    def notify(self, message: str):
        pass


class IRepository(ABC):

    @abstractmethod
    def save(self, data: str):
        pass


class EmailNotifier(INotifier):

    def notify(self, message: str):
        print(f"[Notification] Email sent: {message}")


class DatabaseRepository(IRepository):

    def save(self, data: str):
        print(f"[Persistence] Saved to DB: {data}")


class CleanAccount:

    def __init__(
        self,
        account_number: str,
        balance: float,
        notifier: INotifier,
        repo: IRepository,
    ):
        self.account_number = account_number
        self.balance = balance
        self.notifier = notifier
        self.repo = repo

    def withdraw(self, amount: float):
        if amount <= self.balance:
            self.balance -= amount
            self.notifier.notify(
                f"Withdrew {amount} ETB. Balance: {self.balance} ETB"
            )
            self.repo.save(
                f"Account {self.account_number} withdrawal of {amount} ETB"
            )

# 4. Interface Segregation Principle (ISP) & Account Hierarchy


class InterestBearing(ABC):

    @abstractmethod
    def calculate_interest(self) -> float:
        pass


class Account(ABC):

    def __init__(self, number: str, owner: str, balance: float):
        self.number = number
        self.owner = owner
        self.balance = balance
        self.observers: List["AccountObserver"] = []

    def attach(self, observer: "AccountObserver"):
        self.observers.append(observer)

    def notify_observers(self, amount: float):
        for observer in self.observers:
            observer.update(self.number, amount)

    def withdraw(self, amount: float):
        if amount <= self.balance:
            self.balance -= amount
            if amount > 3000:
                self.notify_observers(amount)
            return True
        return False


class SavingsAccount(Account, InterestBearing):

    def calculate_interest(self) -> float:
        return self.balance * 0.07


class CurrentAccount(Account):
    pass


class FixedDepositAccount(SavingsAccount):

    def calculate_interest(self) -> float:
        return self.balance * 0.12

# 2. Factory Pattern


class AccountFactory:

    @staticmethod
    def create(kind: str, owner: str, number: str, balance: float) -> Account:
        kind = kind.lower().strip()
        if kind == "savings":
            return SavingsAccount(number, owner, balance)
        elif kind == "current":
            return CurrentAccount(number, owner, balance)
        elif kind == "fixed_deposit":
            return FixedDepositAccount(number, owner, balance)
        else:
            raise ValueError(f"Unknown account type: {kind}")



# 3. Observer Pattern


class AccountObserver(ABC):

    @abstractmethod
    def update(self, account_number: str, amount: float):
        pass


class SMSAlert(AccountObserver):

    def update(self, account_number: str, amount: float):
        print(f"[SMS Alert] Large withdrawal detected on #{account_number}: {amount} ETB!")


class AuditLog(AccountObserver):

    def update(self, account_number: str, amount: float):
        print(f"[Audit Log] Large transaction recorded for #{account_number}: {amount} ETB.")
