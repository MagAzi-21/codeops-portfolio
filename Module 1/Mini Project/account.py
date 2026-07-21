
# Addis Bank — Account Management System V2.0 | Day 05
# Inheritance + Polymorphism

class Account:
    """A single bank account with encapsulated balance."""

    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient funds")
        self.__balance -= amount

    def statement(self):
        print(f"[Account] \n {self.owner} \n #{self.account_number} \n Balance: {self.__balance} ETB")


# savings account  — earns interest
class SavingsAccount(Account):
    """A savings account that earns interest on its balance."""

    def __init__(self, owner, account_number, balance=0, rate=0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        """Deposit interest earnings using the parent's deposit()."""
        interest = self.balance * self.rate
        self.deposit(interest)
        print(f"Interest added: {interest:.2f} ETB @ {self.rate:.0%}")

    def statement(self):
        print(f"[Savings] \n {self.owner} \n #{self.account_number} \n Balance: {self.balance:.2f} ETB \n Rate: {self.rate:.0%}")



# current balance  — allows overdraft
class CurrentAccount(Account):
    """A current (checking) account with an approved overdraft limit."""

    def __init__(self, owner, account_number, balance=0, overdraft_limit=500):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        """Allow withdrawal down to the overdraft limit."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.balance + self.overdraft_limit:
            raise ValueError(f"Overdraft limit exceeded (max available: {self.balance + self.overdraft_limit} ETB)")
        # Access the private balance directly via the mangled name
        self._Account__balance -= amount

    def statement(self):
        print(f"[Current] \n {self.owner} \n #{self.account_number} \n Balance: {self.balance:.2f} ETB \n Overdraft: {self.overdraft_limit} ETB")



#Polymorphic loop over mixed account types
if __name__ == "__main__":
    # Create one of each type
    plain = Account("Hanna Girma", "ACC-1001", 2000)
    savings = SavingsAccount("Almaz Bekele", "SAV-2001", 1500, rate=0.05)
    current = CurrentAccount("Dawit Tesfaye", "CUR-3001", 800, overdraft_limit=500)

    print("-" * 55)
    print("INITIAL STATEMENTS")
    print("-" * 55)
    for acc in [plain, savings, current]:
        acc.statement()
    print()

    # saving: add interest
    print("-" * 55)
    print("SAVINGS: ADDING INTEREST")
    print("-" * 55)
    savings.add_interest()
    savings.statement()
    print()

    # current: use overdraft
    print("-" * 55)
    print("CURRENT: WITHDRAWING WITH OVERDRAFT")
    print("-" * 55)
    current.withdraw(1000)   # 800 - 1000 = -200 (within 500 limit)
    current.statement()
    print()

    # plain account: normal deposit
    print("-" * 55)
    print("PLAIN: DEPOSIT")
    print("-" * 55)
    plain.deposit(500)
    plain.statement()
    print()

    # final polymorphic loop
    print("-" * 55)
    print("FINAL STATEMENTS (polymorphic loop)")
    print("-" * 55)
    accounts = [plain, savings, current]
    for acc in accounts:
        acc.statement()
