# =========================================================
 #   Addis Bank Account System (Version 1)
# =========================================================

import random

class BankAccount:
    """
    Represents a bank account with full encapsulation for sensitive data.
    """
    def __init__(self, account_number, holder_name, initial_balance=0.0):
        self.__account_number = account_number
        self.__holder_name = holder_name
        self.__balance = max(0.0, float(initial_balance))

   
    @property
    def account_number(self):
        return self.__account_number

    @property
    def holder_name(self):
        return self.__holder_name

    @property
    def balance(self):
        return self.__balance


    def deposit(self, amount):
        if amount <= 0:
            print("\n[!] Error: Deposit amount must be positive.")
            return False
        self.__balance += amount
        print(f"\n[+] Successfully deposited {amount} ETB.")
        print(f"    Current Balance: {self.__balance} ETB")
        return True

    def withdraw(self, amount):
        if amount <= 0:
            print("\n[!] Error: Withdrawal amount must be positive.")
            return False
        if amount > self.__balance:
            print(f"\n[!] Insufficient Funds! Requested {amount} ETB, but balance is {self.__balance} ETB.")
            return False
        
        self.__balance -= amount
        print(f"\n[-] Successfully withdrew {amount} ETB.")
        print(f"    Remaining Balance: {self.__balance} ETB")
        return True

    def display_info(self):
        print("       ACCOUNT DETAILS       ")
        print(f" Account Number : {self.__account_number}")
        print(f" Account Holder : {self.__holder_name}")
        print(f" Current Balance: {self.__balance} ETB")


#Helper Functions

def display_menu():
    print("      ADDIS BANK SYSTEM (v1.0)      ")
    print("1. Create new account")
    print("2. Deposit")
    print("3. Withdraw")
    print("4. Check balance")
    print("5. View account info")
    print("6. Exit")
   

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
        choice = input("Select an option (1-6): ").strip()

        # 1. Create new account
        if choice == "1":
            print("\nCreate New Account")
            name = input("Enter account holder's full name: ").strip()
            if not name:
                print("[!] Error: Account holder name cannot be empty.")
                continue

            try:
                initial_deposit = float(input("Enter initial deposit amount (ETB): "))
                if initial_deposit < 0:
                    print("[!] Initial deposit cannot be negative.")
                    continue
            except ValueError:
                print("[!] Error: Invalid deposit amount. Please enter a number.")
                continue

            acc_num = generate_account_number(accounts)
            new_account = BankAccount(acc_num, name, initial_deposit)
            accounts[acc_num] = new_account

            print(f"\n[✓] Account created successfully!")
            print(f"    Assigned Account Number: {acc_num}")
            print(f"    Holder: {name}")
            print(f"    Initial Balance: {initial_deposit} ETB")

        # 2. Deposit
        elif choice == "2":
            print("\nDeposit Funds")
            acc_num = input("Enter 4-digit Account Number: ").strip()
            if acc_num in accounts:
                try:
                    amount = float(input("Enter deposit amount (ETB): "))
                    accounts[acc_num].deposit(amount)
                except ValueError:
                    print("[!] Error: Invalid amount entered.")
            else:
                print(f"[!] Error: Account '{acc_num}' not found.")

        # 3. Withdraw
        elif choice == "3":
            print("\nWithdraw Funds")
            acc_num = input("Enter 4-digit Account Number: ").strip()
            if acc_num in accounts:
                try:
                    amount = float(input("Enter withdrawal amount (ETB): "))
                    accounts[acc_num].withdraw(amount)
                except ValueError:
                    print("[!] Error: Invalid amount entered.")
            else:
                print(f"[!] Error: Account '{acc_num}' not found.")

        # 4. Check balance
        elif choice == "4":
            print("\nCheck Balance")
            acc_num = input("Enter 4-digit Account Number: ").strip()
            if acc_num in accounts:
                account = accounts[acc_num]
                print(f"\n[i] Balance for {account.holder_name} (#{acc_num}): {account.balance} ETB")
            else:
                print(f"[!] Error: Account '{acc_num}' not found.")

        # 5. View account info
        elif choice == "5":
            print("\nAccount Info")
            acc_num = input("Enter 4-digit Account Number: ").strip()
            if acc_num in accounts:
                accounts[acc_num].display_info()
            else:
                print(f"[!] Error: Account '{acc_num}' not found.")

        # 6. Exit
        elif choice == "6":
            print("\nThank you for using Addis Bank System! Goodbye.")
            break

        else:
            print("\n[!] Invalid choice! Please enter a number from 1 to 6.")


if __name__ == "__main__":
    main()