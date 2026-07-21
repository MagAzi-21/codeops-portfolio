# =======================================================
#           Addis Bank Account System (Version 2 - Day 5)
#  ===================================================

from abc import ABC, abstractmethod
import random


# 1, Base Class converted to ABC
class BankAccount(ABC):
    """
    Abstract Base Class for bank accounts.
    Uses protected attributes (_attr) so subclasses can access them directly.
    """
    def __init__(self, account_number, holder_name, initial_balance=0.0):
        self._account_number = account_number
        self._holder_name = holder_name
        self._balance = max(0.0, float(initial_balance))

    @property
    def account_number(self):
        return self._account_number

    @property
    def holder_name(self):
        return self._holder_name

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            print("\n[!] Error: Deposit amount must be positive.")
            return False
        self._balance += amount
        print(f"\n[+] Successfully deposited {amount} ETB.")
        print(f"    Current Balance: {self._balance} ETB")
        return True

    def withdraw(self, amount):
        if amount <= 0:
            print("\n[!] Error: Withdrawal amount must be positive.")
            return False
        if amount > self._balance:
            print(f"\n[!] Insufficient Funds! Requested {amount} ETB, but balance is {self._balance} ETB.")
            return False
        
        self._balance -= amount
        print(f"\n[-] Successfully withdrew {amount} ETB.")
        print(f"    Remaining Balance: {self._balance} ETB")
        return True

    #Day 5 Abstract Methods
    @abstractmethod
    def statement(self):
        """Prints formatted account statement."""
        pass

    @abstractmethod
    def calculate_interest(self):
        """Calculates interest earned."""
        pass

class SavingsAccount(BankAccount):
    def __init__(self, account_number, holder_name, initial_balance=0.0, interest_rate=0.07):
        super().__init__(account_number, holder_name, initial_balance)
        self.interest_rate = interest_rate

    def statement(self):
        print("          SAVINGS ACCOUNT STATEMENT      ")
        print(f" Account Number : {self._account_number}")
        print(f" Account Holder : {self._holder_name}")
        print(f" Current Balance: {self._balance} ETB")
        print(f" Interest Rate  : {self.interest_rate * 100}%")


    def calculate_interest(self):
        return self._balance * self.interest_rate

    def apply_interest(self):
        interest = self.calculate_interest()
        self._balance += interest
        print(f"[{self._account_number}] Applied interest (+{interest} ETB). New Balance: {self._balance} ETB")



class CurrentAccount(BankAccount):
    def __init__(self, account_number, holder_name, initial_balance=0.0, overdraft_limit=5000.0):
        super().__init__(account_number, holder_name, initial_balance)
        self.overdraft_limit = float(overdraft_limit)

    
    def withdraw(self, amount):
        if amount <= 0:
            print("\n[!] Error: Withdrawal amount must be positive.")
            return False
        if amount > (self._balance + self.overdraft_limit):
            max_avail = self._balance + self.overdraft_limit
            print(f"\n[!] Overdraft limit exceeded! Maximum allowed withdrawal: {max_avail} ETB.")
            return False

        self._balance -= amount
        print(f"\n[-] Successfully withdrew {amount} ETB.")
        print(f"    Current Balance: {self._balance} ETB")
        return True

    def statement(self):
        print("          CURRENT ACCOUNT STATEMENT      ")
        print(f" Account Number : {self._account_number}")
        print(f" Account Holder : {self._holder_name}")
        print(f" Current Balance: {self._balance} ETB")
        print(f" Overdraft Limit: {self.overdraft_limit} ETB")


    def calculate_interest(self):
        return 0.0


class FixedDepositAccount(SavingsAccount):
    def __init__(self, account_number, holder_name, initial_balance=0.0, interest_rate=0.12, lock_period_months=12):
        super().__init__(account_number, holder_name, initial_balance, interest_rate)
        self.lock_period_months = lock_period_months

    # Method Overriding
    def withdraw(self, amount):
        print(f"\n[!] Warning: Early withdrawal from Fixed Deposit Account (#{self._account_number}) carries penalty charges.")
        return super().withdraw(amount)

    def statement(self):
        print("       FIXED DEPOSIT ACCOUNT STATEMENT   ")
        print(f" Account Number    : {self._account_number}")
        print(f" Account Holder    : {self._holder_name}")
        print(f" Current Balance   : {self._balance} ETB")
        print(f" Fixed Interest    : {self.interest_rate * 100}%")
        print(f" Lock Period       : {self.lock_period_months} months")
        

# Helper Functions

def display_menu():
    print("      ADDIS BANK SYSTEM (v2.0 - Day 5)   ")
    print("1. Create Savings Account")
    print("2. Create Current Account")
    print("3. Create Fixed Deposit Account")
    print("4. Deposit")
    print("5. Withdraw")
    print("6. Show statement")
    print("7. Apply interest to all savings accounts")
    print("8. Show all accounts (Polymorphism)")
    print("9. Exit")
  


def generate_account_number(existing_accounts):
    """Generates a unique 4-digit account number."""
    while True:
        acc_num = str(random.randint(1000, 9999))
        if acc_num not in existing_accounts:
            return acc_num


def main():
    accounts = {}

    while True:
        display_menu()
        choice = input("Select an option (1-9): ").strip()

        
        if choice == "1":
            print("\nCreate Savings Account")
            name = input("Enter holder name: ").strip()
            if not name:
                print("[!] Name cannot be empty.")
                continue
            try:
                deposit_amt = float(input("Enter initial deposit (ETB): "))
                acc_num = generate_account_number(accounts)
                accounts[acc_num] = SavingsAccount(acc_num, name, deposit_amt)
                print(f"[✓] Savings Account Created! Account Number: {acc_num}")
            except ValueError:
                print("[!] Invalid deposit amount.")

        
        elif choice == "2":
            print("\nCreate Current Account")
            name = input("Enter holder name: ").strip()
            if not name:
                print("[!] Name cannot be empty.")
                continue
            try:
                deposit_amt = float(input("Enter initial deposit (ETB): "))
                acc_num = generate_account_number(accounts)
                accounts[acc_num] = CurrentAccount(acc_num, name, deposit_amt)
                print(f"[✓] Current Account Created! Account Number: {acc_num}")
            except ValueError:
                print("[!] Invalid deposit amount.")

        
        elif choice == "3":
            print("\n Create Fixed Deposit Account")
            name = input("Enter holder name: ").strip()
            if not name:
                print("[!] Name cannot be empty.")
                continue
            try:
                deposit_amt = float(input("Enter initial deposit (ETB): "))
                acc_num = generate_account_number(accounts)
                accounts[acc_num] = FixedDepositAccount(acc_num, name, deposit_amt)
                print(f"[✓] Fixed Deposit Account Created! Account Number: {acc_num}")
            except ValueError:
                print("[!] Invalid deposit amount.")

        
        elif choice == "4":
            print("\nDeposit Funds")
            acc_num = input("Enter Account Number: ").strip()
            if acc_num in accounts:
                try:
                    amount = float(input("Enter amount (ETB): "))
                    accounts[acc_num].deposit(amount)
                except ValueError:
                    print("[!] Invalid amount.")
            else:
                print(f"[!] Error: Account '{acc_num}' not found.")

        # 5. Withdraw
        elif choice == "5":
            print("\nWithdraw Funds")
            acc_num = input("Enter Account Number: ").strip()
            if acc_num in accounts:
                try:
                    amount = float(input("Enter amount (ETB): "))
                    accounts[acc_num].withdraw(amount)
                except ValueError:
                    print("[!] Invalid amount.")
            else:
                print(f"[!] Error: Account '{acc_num}' not found.")

     
        elif choice == "6":
            print("\nAccount Statement")
            acc_num = input("Enter Account Number: ").strip()
            if acc_num in accounts:
                accounts[acc_num].statement()
            else:
                print(f"[!] Error: Account '{acc_num}' not found.")

       
        elif choice == "7":
            print("\nApplying Interest to Savings Accounts")
            savings_found = False
            for acc in accounts.values():
                if isinstance(acc, SavingsAccount):
                    acc.apply_interest()
                    savings_found = True
            if not savings_found:
                print("[!] No savings accounts found in the system.")

        elif choice == "8":
            print("\nAll System Accounts")
            if not accounts:
                print("No accounts exist in the bank system yet.")
            else:
                for acc in accounts.values():
                    acc.statement()

        
        elif choice == "9":
            print("\nThank you for using Addis Bank System! Goodbye.")
            break

        else:
            print("\n[!] Invalid choice! Please select an option between 1 and 9.")


if __name__ == "__main__":
    main()