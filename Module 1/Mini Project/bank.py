# CodeOps | Module1 | Day 6 | Larger Project
# Addis Bank — Account Management System V3.0
# SOLID refactor: Singleton (BankConfig), Factory (AccountFactory),
# Observer (SMSAlert + AuditLog)


#shared configuration (rate & overdraft)
class BankConfig:
    """Single source of truth for bank-wide settings."""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


# notification handlers (SRP: not inside Account)
class SMSAlert:
    def update(self, event: str):
        print(f"[TeleBirr SMS] {event}")


class AuditLog:
    def update(self, event: str):
        print(f"[Audit Log]   {event}")



#balance logic only, no hardcoded alerts
class Account:
    """Encapsulated account with observer-based notifications."""

    def __init__(self, owner: str, account_number: str, balance: float = 0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self._observers = []

    # Encapsulated balance
    @property
    def balance(self):
        return self.__balance

    #Observer wiring
    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, event: str):
        """Fire all observers — Account never knows WHO is listening."""
        for obs in self._observers:
            obs.update(event)

    #Core transactions
    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount
        self._notify(f"Deposit +{amount:.2f} ETB >> #{self.account_number}")

    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient funds")
        self.__balance -= amount
        self._notify(f"Withdrawal -{amount:.2f} ETB >> #{self.account_number}")

    def statement(self):
        print(f"[Account] {self.owner} | #{self.account_number} | Balance: {self.__balance:.2f} ETB")



# earns interest, reads rate from BankConfig
class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0, rate=None):
        super().__init__(owner, account_number, balance)
        self.rate = rate if rate is not None else BankConfig().interest_rate

    def add_interest(self):
        """Reuse parent's deposit() — triggers observers automatically."""
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print(f"[Savings] {self.owner} | #{self.account_number} | "
              f"Balance: {self.balance:.2f} ETB | Rate: {self.rate:.0%}")



# allows overdraft, reads limit from BankConfig
class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0, overdraft_limit=None):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit = (
            overdraft_limit if overdraft_limit is not None else BankConfig().overdraft_limit
        )

    def withdraw(self, amount: float):
        """Override: allow balance to drop to -overdraft_limit."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        max_available = self.balance + self.overdraft_limit
        if amount > max_available:
            raise ValueError(f"Overdraft limit exceeded (max available: {max_available:.2f} ETB)")
        self._Account__balance -= amount
        self._notify(f"Withdrawal -{amount:.2f} ETB >> #{self.account_number} (overdraft zone)")

    def statement(self):
        print(f"[Current] {self.owner} | #{self.account_number} | "
              f"Balance: {self.balance:.2f} ETB | Overdraft: {self.overdraft_limit} ETB")



#factory — centralised creation, open/closed for new types
class AccountFactory:
    @staticmethod
    def create(kind: str, owner: str, number: str, balance: float = 0):
        kind = kind.lower()
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        if kind == "current":
            return CurrentAccount(owner, number, balance)
        raise ValueError(f"Unknown account type: '{kind}'")



#Factory + Singleton + Observer + Polymorphism
if __name__ == "__main__":
    #1, Prove Singleton
    cfg1 = BankConfig()
    cfg2 = BankConfig()
    print("-" * 55)
    print(f"Singleton check: {cfg1 is cfg2}")
    print(f"Global rate: {cfg1.interest_rate:.0%} | Overdraft: {cfg1.overdraft_limit} ETB")
    print("-" * 55)

    #4, Create observers
    sms = SMSAlert()
    audit = AuditLog()

    #3, Create accounts via Factory 
    acc_sav = AccountFactory.create("savings", "Almaz Bekele", "SAV-2001", 1500)
    acc_cur = AccountFactory.create("current", "Dawit Tesfaye", "CUR-3001", 800)
    acc_base = Account("Hanna Girma", "ACC-1001", 2000)  
    # 4, Subscribe observers to all accounts
    for acc in (acc_sav, acc_cur, acc_base):
        acc.subscribe(sms)
        acc.subscribe(audit)

    # 5, Run transactions —observers fire automatically
    print("\n--- Savings: deposit + interest ---")
    acc_sav.deposit(500)
    acc_sav.add_interest()   
    acc_sav.statement()

    print("\n--- Current: overdraft withdrawal ---")
    acc_cur.withdraw(1200)   
    acc_cur.statement()

    print("\n--- Plain account: normal withdrawal ---")
    acc_base.withdraw(200)
    acc_base.statement()

    # 6, Polymorphic loop — one call, many forms
    print("\n" + "-" * 55)
    print("FINAL STATEMENTS (polymorphic loop)")
    print("-" * 55)
    for acc in (acc_sav, acc_cur, acc_base):
        acc.statement()
