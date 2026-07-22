# =====================================================================
#                        ADDIS BANK SYSTEM (Version 3.0 - Day 6 SOLID & Patterns)
# =====================================================================

from abc import ABC, abstractmethod
import random
from typing import Dict, List


# 1. Singleton Pattern: Bank Configuration
class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(BankConfig, cls).__new__(cls)
            cls._instance.savings_interest_rate = 0.07
            cls._instance.overdraft_limit = 5000.0
            cls._instance.large_transaction_threshold = 3000.0
        return cls._instance


# 2. Observer Pattern, Notification System
class Observer(ABC):

    @abstractmethod
    def update(self, account_number: str, message: str):
        pass


class SMSAlert(Observer):

    def update(self, account_number: str, message: str):
        print(f"\n[📱 SMS ALERT - Acc #{account_number}]: {message}")


class AuditLog(Observer):

    def update(self, account_number: str, message: str):
        print(f"[📜 AUDIT LOG - Acc #{account_number}]: {message}")


# 3. Base Account Abstraction
class Account(ABC):

    def __init__(self, number: str, owner: str, balance: float):
        self._number = number
        self._owner = owner
        self._balance = max(0.0, float(balance))
        self._observers: List[Observer] = []

    @property
    def number(self):
        return self._number

    @property
    def owner(self):
        return self._owner

    @property
    def balance(self):
        return self._balance

    def attach(self, observer: Observer):
        self._observers.append(observer)

    def notify_all(self, message: str):
        for obs in self._observers:
            obs.update(self._number, message)

    def deposit(self, amount: float) -> bool:
        if amount <= 0:
            print("\n[!] Deposit amount must be positive.")
            return False
        self._balance += amount
        print(f"\n[+] Deposited {amount} ETB. New Balance: {self._balance} ETB")
        return True

    def withdraw(self, amount: float) -> bool:
        if amount <= 0:
            print("\n[!] Withdrawal amount must be positive.")
            return False
        if amount > self._balance:
            print(f"\n[!] Insufficient funds! Current balance: {self._balance} ETB")
            return False

        self._balance -= amount
        print(f"\n[-] Withdrew {amount} ETB. Remaining Balance: {self._balance} ETB")

       
        if amount >= BankConfig().large_transaction_threshold:
            self.notify_all(f"Large withdrawal of {amount} ETB processed.")
        return True

    @abstractmethod
    def statement(self):
        pass


# 4, Interface Segregation, Interest System
class InterestBearing(ABC):

    @abstractmethod
    def apply_interest(self):
        pass


# 5, Concrete Account Types
class SavingsAccount(Account, InterestBearing):

    def apply_interest(self):
        rate = BankConfig().savings_interest_rate
        interest = self._balance * rate
        self._balance += interest
        print(f"[{self._number}] Applied {rate*100}% interest (+{interest} ETB). New Balance: {self._balance} ETB")

    def statement(self):
        print("          SAVINGS ACCOUNT STATEMENT      ")
        print(f" Account Number : {self._number}")
        print(f" Account Holder : {self._owner}")
        print(f" Current Balance: {self._balance:.2f} ETB")
        


class CurrentAccount(Account):

    def withdraw(self, amount: float) -> bool:
        if amount <= 0:
            print("\n[!] Withdrawal amount must be positive.")
            return False

        limit = BankConfig().overdraft_limit
        if amount > (self._balance + limit):
            print(f"\n[!] Overdraft limit exceeded! Max allowed: {self._balance + limit} ETB")
            return False

        self._balance -= amount
        print(f"\n[-] Withdrew {amount} ETB. Current Balance: {self._balance} ETB")

        if amount >= BankConfig().large_transaction_threshold:
            self.notify_all(f"Large withdrawal of {amount} ETB processed (Overdraft active).")
        return True

    def statement(self):
        print("          CURRENT ACCOUNT STATEMENT      ")
        print(f" Account Number : {self._number}")
        print(f" Account Holder : {self._owner}")
        print(f" Current Balance: {self._balance} ETB")
        print(f" Overdraft Limit: {BankConfig().overdraft_limit} ETB")
       


class FixedDepositAccount(SavingsAccount):

    def statement(self):
        print("       FIXED DEPOSIT ACCOUNT STATEMENT   ")
        print(f" Account Number : {self._number}")
        print(f" Account Holder : {self._owner}")
        print(f" Current Balance: {self._balance:.2f} ETB")
       



class AccountFactory:

    @staticmethod
    def create_account(kind: str, number: str, owner: str, initial_deposit: float) -> Account:
        kind = kind.lower().strip()
        
      
        sms = SMSAlert()
        audit = AuditLog()

        if kind == "savings":
            acc = SavingsAccount(number, owner, initial_deposit)
        elif kind == "current":
            acc = CurrentAccount(number, owner, initial_deposit)
        elif kind == "fixed":
            acc = FixedDepositAccount(number, owner, initial_deposit)
        else:
            raise ValueError(f"Unknown account type: {kind}")

        acc.attach(sms)
        acc.attach(audit)
        return acc


# CLI Engine
def display_menu():
    print("      ADDIS BANK SYSTEM (v3.0 - SOLID)   ")
    print("1. Create Savings Account")
    print("2. Create Current Account")
    print("3. Create Fixed Deposit Account")
    print("4. Deposit")
    print("5. Withdraw")
    print("6. Show Statement")
    print("7. Apply Interest to All Applicable Accounts")
    print("8. Display All Accounts")
    print("9. Exit")
    


def generate_account_number(existing_accounts):
    while True:
        acc_num = str(random.randint(1000, 9999))
        if acc_num not in existing_accounts:
            return acc_num


def main():
    accounts: Dict[str, Account] = {}

    while True:
        display_menu()
        choice = input("Select an option (1-9): ").strip()

        if choice in ["1", "2", "3"]:
            kind_map = {"1": "savings", "2": "current", "3": "fixed"}
            name = input("Enter holder name: ").strip()
            if not name:
                print("[!] Name cannot be empty.")
                continue
            try:
                deposit_amt = float(input("Enter initial deposit (ETB): "))
                acc_num = generate_account_number(accounts)
                acc = AccountFactory.create_account(kind_map[choice], acc_num, name, deposit_amt)
                accounts[acc_num] = acc
                print(f"[✓] {kind_map[choice].capitalize()} Account Created! Account Number: {acc_num}")
            except ValueError as e:
                print(f"[!] Error: {e}")

        elif choice == "4":
            acc_num = input("Enter Account Number: ").strip()
            if acc_num in accounts:
                try:
                    amt = float(input("Enter deposit amount (ETB): "))
                    accounts[acc_num].deposit(amt)
                except ValueError:
                    print("[!] Invalid amount.")
            else:
                print("[!] Account not found.")

        elif choice == "5":
            acc_num = input("Enter Account Number: ").strip()
            if acc_num in accounts:
                try:
                    amt = float(input("Enter withdrawal amount (ETB): "))
                    accounts[acc_num].withdraw(amt)
                except ValueError:
                    print("[!] Invalid amount.")
            else:
                print("[!] Account not found.")

        elif choice == "6":
            acc_num = input("Enter Account Number: ").strip()
            if acc_num in accounts:
                accounts[acc_num].statement()
            else:
                print("[!] Account not found.")

        elif choice == "7":
            print("\n--- Applying Interest ---")
            found = False
            for acc in accounts.values():
                if isinstance(acc, InterestBearing):
                    acc.apply_interest()
                    found = True
            if not found:
                print("[!] No interest-bearing accounts found.")

        elif choice == "8":
            print("\n--- All Accounts ---")
            if not accounts:
                print("No accounts exist.")
            else:
                for acc in accounts.values():
                    acc.statement()

        elif choice == "9":
            print("\nThank you for using Addis Bank System!")
            break

        else:
            print("[!] Invalid option choice.")


if __name__ == "__main__":
    main()