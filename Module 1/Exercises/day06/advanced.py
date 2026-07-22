# Day 6  Advanced Exercises: Full Integration
from abc import ABC, abstractmethod
from typing import List



class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(BankConfig, cls).__new__(cls)
            cls._instance.savings_interest_rate = 0.07
            cls._instance.fixed_deposit_interest_rate = 0.12
            cls._instance.investment_return_rate = 0.15
            cls._instance.overdraft_limit = 5000.0
            cls._instance.large_transaction_threshold = 3000.0
        return cls._instance



class Observer(ABC):

    @abstractmethod
    def notify(self, account_num: str, action: str, amount: float):
        pass


class SMSNotifier(Observer):

    def notify(self, account_num: str, action: str, amount: float):
        print(f"[SMS Alert] Account #{account_num}: {action} of {amount} ETB performed.")


class AuditLogger(Observer):

    def notify(self, account_num: str, action: str, amount: float):
        print(f"[Audit Log] Recorded {action} of {amount} ETB on Account #{account_num}.")



class BankAccount(ABC):

    def __init__(self, number: str, owner: str, balance: float):
        self.number = number
        self.owner = owner
        self.balance = balance
        self._observers: List[Observer] = []

    def attach_observer(self, obs: Observer):
        self._observers.append(obs)

    def _notify(self, action: str, amount: float):
        config = BankConfig()
        if amount >= config.large_transaction_threshold:
            for obs in self._observers:
                obs.notify(self.number, action, amount)

    def deposit(self, amount: float):
        self.balance += amount
        return True

    def withdraw(self, amount: float) -> bool:
        if amount <= self.balance:
            self.balance -= amount
            self._notify("Withdrawal", amount)
            return True
        return False


class SavingsAccount(BankAccount):

    def apply_interest(self):
        rate = BankConfig().savings_interest_rate
        interest = self.balance * rate
        self.balance += interest
        return interest


class CurrentAccount(BankAccount):

    def withdraw(self, amount: float) -> bool:
        limit = BankConfig().overdraft_limit
        if amount <= (self.balance + limit):
            self.balance -= amount
            self._notify("Withdrawal (Overdraft)", amount)
            return True
        return False


# 11. Refactoring Challenge: Adding InvestmentAccount without modifying existing logic (OCP)
class InvestmentAccount(BankAccount):

    def apply_yield(self):
        rate = BankConfig().investment_return_rate
        returns = self.balance * rate
        self.balance += returns
        return returns



class AccountFactory:

    @staticmethod
    def create_account(
        account_type: str, number: str, owner: str, initial_balance: float
    ) -> BankAccount:
        acc_type = account_type.lower().strip()
        if acc_type == "savings":
            return SavingsAccount(number, owner, initial_balance)
        elif acc_type == "current":
            return CurrentAccount(number, owner, initial_balance)
        elif acc_type == "investment":
            return InvestmentAccount(number, owner, initial_balance)
        else:
            raise ValueError(f"Invalid account type: {account_type}")