# CodeOps | Module 1 | Day 8 | Larger Project
# Addis Bank — Account Registry V2.0
# Added: top_by_balance, binary_search find_by_number, recursive total_transactions

from bank import AccountFactory, SMSAlert, AuditLog


# binary search — no 'in' operator, no loop over data
def binary_search(items, target):
    lo, hi = 0, len(items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1



# REGISTRY
class AccountRegistry:
    def __init__(self):
        self.by_number = {}
        self.order = []

    def add(self, acc):
        if acc.account_number in self.by_number:
            raise ValueError(f"Account {acc.account_number} already exists")
        self.by_number[acc.account_number] = acc
        self.order.append(acc)

    def find(self, number: str):
        # O(1) dict lookup
        return self.by_number.get(number)

    def list_all(self):
        return self.order

    # day 8 additions

    def top_by_balance(self, n=5):
        # return the n highest-balance accounts, sorted descending
        accts = sorted(self.by_number.values(),
                       key=lambda a: a.balance, reverse=True)
        return accts[:n]

    def find_by_number(self, number: str):
        # binary search over sorted account numbers
        nums = sorted(self.by_number.keys())
        i = binary_search(nums, number)
        if i >= 0:
            return self.by_number[nums[i]]
        return None

    def total_transactions(self, number: str):
        # recursively sum one account's transaction history
        acc = self.find(number)
        if acc is None:
            return 0
        history = acc.history
        return self._rec_sum(history, len(history) - 1)

    def _rec_sum(self, history, index):
        # base case: nothing left to sum
        if index < 0:
            return 0
        # recursive case: last amount + sum of everything before it
        return history[index][1] + self._rec_sum(history, index - 1)

    def undo_last(self, number: str):
        acc = self.find(number)
        if acc is None:
            raise ValueError("Account not found")
        acc.undo_last()



# demo
if __name__ == "__main__":
    registry = AccountRegistry()
    sms = SMSAlert()
    audit = AuditLog()

    # seed the registry
    accounts = [
        AccountFactory.create("savings", "Almaz Bekele",  "SAV-2001", 1500),
        AccountFactory.create("current", "Dawit Tesfaye",  "CUR-3001", 800),
        AccountFactory.create("savings", "Hanna Girma",    "SAV-2002", 3000),
        AccountFactory.create("current", "Bethlehem Alem", "CUR-3002", 5000),
        AccountFactory.create("savings", "Yonas Tadesse",  "SAV-2003", 1200),
    ]
    for acc in accounts:
        acc.subscribe(sms)
        acc.subscribe(audit)
        registry.add(acc)

    # build some history
    registry.find("SAV-2001").deposit(500)
    registry.find("SAV-2001").add_interest()
    registry.find("CUR-3001").withdraw(300)
    registry.find("SAV-2002").deposit(1000)
    registry.find("CUR-3002").withdraw(2000)

    print("-" * 55)
    print("TOP 3 BY BALANCE")
    print("-" * 55)
    for i, acc in enumerate(registry.top_by_balance(3), 1):
        print(f"  {i}. {acc.owner:<16} | #{acc.account_number} | {acc.balance:.2f} ETB")

    print("\n" + "-" * 55)
    print("BINARY SEARCH")
    print("-" * 55)
    for target in ["SAV-2002", "FAKE-999"]:
        result = registry.find_by_number(target)
        print(f"  Search '{target}':", result.owner if result else "Not found")

    print("\n" + "-" * 55)
    print("RECURSIVE TRANSACTION TOTALS")
    print("-" * 55)
    for num in ["SAV-2001", "CUR-3001", "SAV-2002"]:
        acc = registry.find(num)
        total = registry.total_transactions(num)
        print(f"  #{num} | {acc.owner:<16} | Total: {total:.2f} ETB")

    print("\n" + "-" * 55)
    print("ALL ACCOUNTS")
    print("-" * 55)
    for acc in registry.list_all():
        acc.statement()