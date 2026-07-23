# =====================================================================
#        ADDIS BANK ACCOUNT SYSTEM Version 4.0 (Day 7 SOLID + DSA Integration)
# =====================================================================

from abc import ABC, abstractmethod
from datetime import datetime
import random
from typing import Dict, List, Optional



# Data Structure: Transaction Model & Analytics
class Transaction:
    def __init__(self, transaction_id: str, amount: float, date_str: str, trans_type: str):
        self.transaction_id = transaction_id
        self.amount = float(amount)
        self.date = datetime.strptime(date_str, "%Y-%m-%d")
        self.trans_type = trans_type.upper()  # 'DEPOSIT', 'WITHDRAWAL', 'INTEREST'

    @property
    def formatted_date(self) -> str:
        return self.date.strftime("%Y-%m-%d")

    def __repr__(self):
        return f"[{self.transaction_id}] {self.formatted_date} | {self.trans_type:<10} | {self.amount:>8.2f} ETB"


# 1. Singleton Pattern, Bank Configuration
class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(BankConfig, cls).__new__(cls)
            cls._instance.savings_interest_rate = 0.07
            cls._instance.overdraft_limit = 5000.0
            cls._instance.large_transaction_threshold = 3000.0
        return cls._instance



# 2. Observer Pattern: Notification System

class Observer(ABC):
    @abstractmethod
    def update(self, account_number: str, message: str):
        pass


class SMSAlert(Observer):
    def update(self, account_number: str, message: str):
        print(f"\n[SMS ALERT - Acc #{account_number}]: {message}")


class AuditLog(Observer):
    def update(self, account_number: str, message: str):
        print(f"[AUDIT LOG - Acc #{account_number}]: {message}")


# 3. Base Account Abstraction with DSA Extensions

class Account(ABC):
    def __init__(self, number: str, owner: str, balance: float):
        self._number = number
        self._owner = owner
        self._balance = max(0.0, float(balance))
        self._observers: List[Observer] = []
        self.transactions: List[Transaction] = []
        
        # Log Initial Deposit
        if balance > 0:
            tx_id = f"TX{random.randint(10000, 99999)}"
            today = datetime.now().strftime("%Y-%m-%d")
            self.transactions.append(Transaction(tx_id, balance, today, "DEPOSIT"))

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
        
        # Track Transaction
        tx_id = f"TX{random.randint(10000, 99999)}"
        today = datetime.now().strftime("%Y-%m-%d")
        self.transactions.append(Transaction(tx_id, amount, today, "DEPOSIT"))

        print(f"\n[+] Deposited {amount} ETB. New Balance: {self._balance:.2f} ETB")
        return True

    def withdraw(self, amount: float) -> bool:
        if amount <= 0:
            print("\n[!] Withdrawal amount must be positive.")
            return False
        if amount > self._balance:
            print(f"\n[!] Insufficient funds! Current balance: {self._balance:.2f} ETB")
            return False

        self._balance -= amount

        # Track Transaction
        tx_id = f"TX{random.randint(10000, 99999)}"
        today = datetime.now().strftime("%Y-%m-%d")
        self.transactions.append(Transaction(tx_id, amount, today, "WITHDRAWAL"))

        print(f"\n[-] Withdrew {amount} ETB. Remaining Balance: {self._balance:.2f} ETB")

        if amount >= BankConfig().large_transaction_threshold:
            self.notify_all(f"Large withdrawal of {amount} ETB processed.")
        return True

    # Day 7 DSA Functions Integrated
    
    # Recursion, Balance Calculation from History
    def calculate_balance_recursive(self, index: int = 0) -> float:
        if index >= len(self.transactions):
            return 0.0
        tx = self.transactions[index]
        val = tx.amount if tx.trans_type in ["DEPOSIT", "INTEREST"] else -tx.amount
        return val + self.calculate_balance_recursive(index + 1)

    def sort_transactions_by_amount(self):
        n = len(self.transactions)
        for i in range(n):
            min_idx = i
            for j in range(i + 1, n):
                if self.transactions[j].amount < self.transactions[min_idx].amount:
                    min_idx = j
            self.transactions[i], self.transactions[min_idx] = self.transactions[min_idx], self.transactions[i]

    def sort_transactions_by_date(self):
        for i in range(1, len(self.transactions)):
            key_tx = self.transactions[i]
            j = i - 1
            while j >= 0 and self.transactions[j].date > key_tx.date:
                self.transactions[j + 1] = self.transactions[j]
                j -= 1
            self.transactions[j + 1] = key_tx


    def linear_search_tx(self, tx_id: str) -> Optional[Transaction]:
        for tx in self.transactions:
            if tx.transaction_id.lower() == tx_id.lower():
                return tx
        return None


    def binary_search_tx(self, amount: float) -> Optional[Transaction]:
        self.sort_transactions_by_amount()
        left, right = 0, len(self.transactions) - 1
        while left <= right:
            mid = (left + right) // 2
            if self.transactions[mid].amount == amount:
                return self.transactions[mid]
            elif self.transactions[mid].amount < amount:
                left = mid + 1
            else:
                right = mid - 1
        return None

    # Recursion: Report Generation
    def filter_large_tx_recursive(self, threshold: float, index: int = 0) -> List[Transaction]:
        if index >= len(self.transactions):
            return []
        current_tx = self.transactions[index]
        rest = self.filter_large_tx_recursive(threshold, index + 1)
        if current_tx.amount >= threshold:
            return [current_tx] + rest
        return rest

    @abstractmethod
    def statement(self):
        pass


# 4. Interface Segregation: Interest System

class InterestBearing(ABC):
    @abstractmethod
    def apply_interest(self):
        pass



# 5. Concrete Account Types

class SavingsAccount(Account, InterestBearing):
    def apply_interest(self):
        rate = BankConfig().savings_interest_rate
        interest = self._balance * rate
        self._balance += interest

        tx_id = f"TX{random.randint(10000, 99999)}"
        today = datetime.now().strftime("%Y-%m-%d")
        self.transactions.append(Transaction(tx_id, interest, today, "INTEREST"))

        print(f"[{self._number}] Applied {rate*100}% interest (+{interest:.2f} ETB). New Balance: {self._balance:.2f} ETB")

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
            print(f"\n[!] Overdraft limit exceeded! Max allowed: {self._balance + limit:.2f} ETB")
            return False

        self._balance -= amount

        tx_id = f"TX{random.randint(10000, 99999)}"
        today = datetime.now().strftime("%Y-%m-%d")
        self.transactions.append(Transaction(tx_id, amount, today, "WITHDRAWAL"))

        print(f"\n[-] Withdrew {amount} ETB. Current Balance: {self._balance:.2f} ETB")

        if amount >= BankConfig().large_transaction_threshold:
            self.notify_all(f"Large withdrawal of {amount} ETB processed (Overdraft active).")
        return True

    def statement(self):
        print("          CURRENT ACCOUNT STATEMENT      ")
        print(f" Account Number : {self._number}")
        print(f" Account Holder : {self._owner}")
        print(f" Current Balance: {self._balance:.2f} ETB")
        print(f" Overdraft Limit: {BankConfig().overdraft_limit:.2f} ETB")


class FixedDepositAccount(SavingsAccount):
    def statement(self):
        print("       FIXED DEPOSIT ACCOUNT STATEMENT   ")
        print(f" Account Number : {self._number}")
        print(f" Account Holder : {self._owner}")
        print(f" Current Balance: {self._balance:.2f} ETB")


# =====================================================================
# 6. Factory Pattern: Account Factory
# =====================================================================

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


# =====================================================================
# CLI Engine
# =====================================================================

def display_menu():
    print("      ADDIS BANK SYSTEM (v4.0 - SOLID + DSA)   ")
    print("1. Create Savings Account")
    print("2. Create Current Account")
    print("3. Create Fixed Deposit Account")
    print("4. Deposit")
    print("5. Withdraw")
    print("6. Show Statement")
    print("7. Apply Interest to All Applicable Accounts")
    print("8. Display All Accounts")
    print("9. Transaction Analyzer Submenu (DSA)")
    print("10. Exit")


def display_dsa_menu():
    print("\n--- TRANSACTION ANALYZER SUBMENU ---")
    print("a. Calculate Net Balance Recursively")
    print("b. Sort Transactions by Amount (Selection Sort)")
    print("c. Sort Transactions by Date (Insertion Sort)")
    print("d. Search Transaction by ID (Linear Search)")
    print("e. Search Transaction by Amount (Binary Search)")
    print("f. Generate High-Value Report (Recursive)")
    print("g. Back to Main Menu")


def generate_account_number(existing_accounts):
    while True:
        acc_num = str(random.randint(1000, 9999))
        if acc_num not in existing_accounts:
            return acc_num


def main():
    accounts: Dict[str, Account] = {}

    while True:
        display_menu()
        choice = input("Select an option (1-10): ").strip()

        if choice in ["1", "2", "3"]:
            kind_map = {"1": "savings", "2": "current", "3": "fixed"}
            name = input("Enter holder name: ").strip()
            if not name:
                print("[!] Name cannot be empty.\n")
                continue
            try:
                deposit_amt = float(input("Enter initial deposit (ETB): "))
                acc_num = generate_account_number(accounts)
                acc = AccountFactory.create_account(kind_map[choice], acc_num, name, deposit_amt)
                accounts[acc_num] = acc
                print(f"[✓] {kind_map[choice].capitalize()} Account Created! Account Number: {acc_num}\n")
            except ValueError as e:
                print(f"[!] Error: {e}\n")

        elif choice == "4":
            acc_num = input("Enter Account Number: ").strip()
            if acc_num in accounts:
                try:
                    amt = float(input("Enter deposit amount (ETB): "))
                    accounts[acc_num].deposit(amt)
                    print()
                except ValueError:
                    print("[!] Invalid amount.\n")
            else:
                print("[!] Account not found.\n")

        elif choice == "5":
            acc_num = input("Enter Account Number: ").strip()
            if acc_num in accounts:
                try:
                    amt = float(input("Enter withdrawal amount (ETB): "))
                    accounts[acc_num].withdraw(amt)
                    print()
                except ValueError:
                    print("[!] Invalid amount.\n")
            else:
                print("[!] Account not found.\n")

        elif choice == "6":
            acc_num = input("Enter Account Number: ").strip()
            if acc_num in accounts:
                accounts[acc_num].statement()
                print()
            else:
                print("[!] Account not found.\n")

        elif choice == "7":
            print("\n--- Applying Interest ---")
            found = False
            for acc in accounts.values():
                if isinstance(acc, InterestBearing):
                    acc.apply_interest()
                    found = True
            if not found:
                print("[!] No interest-bearing accounts found.")
            print()

        elif choice == "8":
            print("\n--- All Accounts ---")
            if not accounts:
                print("No accounts exist.")
            else:
                for acc in accounts.values():
                    acc.statement()
            print()

        elif choice == "9":
            acc_num = input("Enter Account Number to Analyze: ").strip()
            if acc_num not in accounts:
                print("[!] Account not found.\n")
                continue

            target_acc = accounts[acc_num]
            display_dsa_menu()
            sub_choice = input("Select DSA option (a-g): ").strip().lower()

            if sub_choice == "a":
                rec_bal = target_acc.calculate_balance_recursive()
                print(f"\n[✓] Calculated Balance (Recursive): {rec_bal:.2f} ETB\n")

            elif sub_choice == "b":
                target_acc.sort_transactions_by_amount()
                print("\n[✓] Transactions Sorted by Amount:")
                for tx in target_acc.transactions:
                    print(tx)
                print()

            elif sub_choice == "c":
                target_acc.sort_transactions_by_date()
                print("\n[✓] Transactions Sorted by Date:")
                for tx in target_acc.transactions:
                    print(tx)
                print()

            elif sub_choice == "d":
                tx_id = input("Enter Transaction ID (e.g., TX12345): ").strip()
                res = target_acc.linear_search_tx(tx_id)
                if res:
                    print(f"\n[✓] Found: {res}\n")
                else:
                    print("\n[!] Transaction ID not found.\n")

            elif sub_choice == "e":
                try:
                    amt = float(input("Enter Target Amount (ETB): "))
                    res = target_acc.binary_search_tx(amt)
                    if res:
                        print(f"\n[✓] Found via Binary Search: {res}\n")
                    else:
                        print("\n[!] Transaction Amount not found.\n")
                except ValueError:
                    print("[!] Invalid numerical input.\n")

            elif sub_choice == "f":
                try:
                    thresh = float(input("Enter Minimum Threshold Amount (ETB): "))
                    report = target_acc.filter_large_tx_recursive(thresh)
                    print(f"\n--- Transactions >= {thresh:.2f} ETB ---")
                    for tx in report:
                        print(tx)
                    print()
                except ValueError:
                    print("[!] Invalid input.\n")

            elif sub_choice == "g":
                print()
                continue

        elif choice == "10":
            print("\nThank you for using Addis Bank System!")
            break

        else:
            print("[!] Invalid option choice.\n")


if __name__ == "__main__":
    main()