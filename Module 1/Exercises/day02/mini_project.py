# Helper fun 1
def get_safe_amount(prompt_message):
    while True:
        try:
            amount = float(input(prompt_message))
            if amount < 0:
                print("Amount cannot be negative. Please try again.")
            else:
                return amount
        except ValueError:
            print("Invalid input! Please enter a valid number.")


# Helper fun 2
def add_income(current_balance):
    income = get_safe_amount("Enter income amount (in Birr): ")
    new_balance = current_balance + income
    print(f"Success! Added {income} Birr to your balance.")
    return new_balance


# Helper fun 3
def add_expense(current_balance):
    expense = get_safe_amount("Enter expense amount (in Birr): ")

    if expense > current_balance:
        print(f"Warning: This expense ({expense} Birr) is higher than your current balance ({current_balance} Birr)!")
    
    new_balance = current_balance - expense
    print(f"Success! Subtracted {expense} Birr from your balance.")
    return new_balance


# Helper fun 4
def show_balance(current_balance):
    print(f"\nCurrent Balance: {current_balance:.2f} Birr")


# Helper fun 5
def show_summary(final_balance):
    print("FINAL FINANCIAL SUMMARY")
    print(f"Final Balance: {final_balance} Birr")
    
    if final_balance > 0:
        print("Great job staying in the green! You're saving money.")
    elif final_balance == 0:
        print("You broke even! No extra savings, but no debt.")
    else:
        print("Warning: You are in debt! Try to reduce expenses.")
  



# Main fun runner

def finance_tracker():
    balance = 0.0
    
    while True:
        print("\nPERSONAL FINANCE TRACKER")
        print("1. Add Income")
        print("2. Add Expense")
        print("3. Show Balance")
        print("4. Exit")
        
        choice = input("Please select an option (1-4): ").strip()
        
        if choice == "1":
            balance = add_income(balance)
        elif choice == "2":
            balance = add_expense(balance)
        elif choice == "3":
            show_balance(balance)
        elif choice == "4":
            show_summary(balance)
            print("Thank you for using Personal Finance Tracker! Goodbye")
            break  
        else:
            print("Invalid menu choice! Please enter a number between 1 and 4.")



finance_tracker()