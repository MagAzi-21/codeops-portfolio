# CodeOps | Module 1 | Day 7 | Larger Project
# Addis Bank — Account Registry (O(1) lookup + ordered listing)

from bank import AccountFactory, SMSAlert, AuditLog


class AccountRegistry:
    """
    Stores accounts in a dict for O(1) lookup by account number
    and a list to preserve insertion order.
    """

    def __init__(self):
        self.by_number = {}     
        self.order = []         

    def add(self, acc):
        if acc.account_number in self.by_number:
            raise ValueError(f"Account {acc.account_number} already exists")
        self.by_number[acc.account_number] = acc
        self.order.append(acc)

    def find(self, number: str):
        """O(1) lookup — single dict get, never a loop."""
        return self.by_number.get(number)

    def list_all(self):
        """Return accounts in the order they were added."""
        return self.order

    def undo_last(self, number: str):
        """Delegate undo to the account's own history stack."""
        acc = self.find(number)
        if acc is None:
            raise ValueError("Account not found")
        acc.undo_last()



#Registry + History + Undo
if __name__ == "__main__":
    registry = AccountRegistry()

    # create & subscribe observers
    sms = SMSAlert()
    audit = AuditLog()

    acc1 = AccountFactory.create("savings", "Almaz Bekele", "SAV-2001", 1500)
    acc2 = AccountFactory.create("current", "Dawit Tesfaye", "CUR-3001", 800)
    acc3 = AccountFactory.create("savings", "Hanna Girma", "SAV-2002", 3000)

    for acc in (acc1, acc2, acc3):
        acc.subscribe(sms)
        acc.subscribe(audit)
        registry.add(acc)

    #O(1) lookup
    print("-" * 55)
    print("O(1) LOOKUP")
    print("-" * 55)
    found = registry.find("CUR-3001")
    found.statement()

    #Transactions (auto-logged to history)
    print("\n" + "-" * 55)
    print("TRANSACTIONS")
    print("-" * 55)
    acc1.deposit(500)     
    acc1.add_interest()     
    acc2.withdraw(1200)     

    print("\n--- Before undo ---")
    for acc in registry.list_all():
        acc.statement()

    #Undo LIFO
    print("\n" + "-" * 55)
    print("UNDO LAST (LIFO)")
    print("-" * 55)
    registry.undo_last("SAV-2001")   
    registry.undo_last("CUR-3001")   

    print("\n--- After undo ---")
    for acc in registry.list_all():
        acc.statement()

    #Big-O explanation
    print("\n" + "-" * 55)
    print("COMPLEXITY")
    print("-" * 55)
    print("add()      >> O(1)  (dict set + list append)")
    print("find()     >> O(1)  (dict get by key)")
    print("list_all() >> O(n)  (returns the list, one pass to print)")
    print("undo_last()>> O(1)  (list pop from account history)")