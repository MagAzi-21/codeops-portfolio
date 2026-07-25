# CodeOps | Module 1 | Day 9 | Larger Project
# Addis Bank — Account Management System V6.0
# Added: Branch tree (hierarchy) + transfers graph (BFS)

from collections import deque
from bank import AccountFactory, SMSAlert, AuditLog
from registry import AccountRegistry


# BRANCH TREE — head office >> regions >> branches
class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []   # sub-branches
        self.accounts = []

    def add_child(self, branch):
        self.children.append(branch)

    def add_account(self, acc):
        self.accounts.append(acc)

    def total_balance(self):
        # sum this branch's accounts + recurse into children
        total = sum(a.balance for a in self.accounts)
        for child in self.children:
            total += child.total_balance()
        return total



# TRANSFERS GRAPH — BFS traversal
def bfs(transfers, start):
    # breadth-first search, returns every reachable account number
    seen = {start}
    q = deque([start])
    while q:
        node = q.popleft()
        for neighbor in transfers.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                q.append(neighbor)
    return seen



# demo
if __name__ == "__main__":
    registry = AccountRegistry()
    sms = SMSAlert()
    audit = AuditLog()

    # seed accounts
    accounts = [
        AccountFactory.create("savings", "Almaz Bekele",    "SAV-2001", 1500),
        AccountFactory.create("current", "Dawit Tesfaye",    "CUR-3001", 800),
        AccountFactory.create("savings", "Hanna Girma",      "SAV-2002", 3000),
        AccountFactory.create("current", "Bethlehem Alem",   "CUR-3002", 5000),
        AccountFactory.create("savings", "Yonas Tadesse",    "SAV-2003", 1200),
        AccountFactory.create("current", "Tigist Haile",     "CUR-3003", 2500),
    ]
    for acc in accounts:
        acc.subscribe(sms)
        acc.subscribe(audit)
        registry.add(acc)

    # build branch tree — 3 levels deep
    head = Branch("Addis Bank HQ")

    north = Branch("North Region")
    south = Branch("South Region")
    east = Branch("East Region")

    bole = Branch("Bole Branch")
    merkato = Branch("Merkato Branch")
    hawassa = Branch("Hawassa Branch")
    adama = Branch("Adama Branch")
    dire_dawa = Branch("Dire Dawa Branch")

    head.add_child(north)
    head.add_child(south)
    head.add_child(east)

    north.add_child(bole)
    north.add_child(merkato)
    south.add_child(hawassa)
    south.add_child(adama)
    east.add_child(dire_dawa)

    # assign accounts to leaf branches
    bole.add_account(registry.find("SAV-2001"))
    bole.add_account(registry.find("CUR-3001"))
    merkato.add_account(registry.find("SAV-2002"))
    hawassa.add_account(registry.find("CUR-3002"))
    adama.add_account(registry.find("SAV-2003"))
    dire_dawa.add_account(registry.find("CUR-3003"))

    # recursive total
    print("-" * 55)
    print("BRANCH TREE BALANCES")
    print("-" * 55)
    print(f"  {head.name:<20} >> {head.total_balance():.2f} ETB")
    print(f"  {north.name:<20} >> {north.total_balance():.2f} ETB")
    print(f"  {bole.name:<20} >> {bole.total_balance():.2f} ETB")
    print(f"  {merkato.name:<20} >> {merkato.total_balance():.2f} ETB")
    print(f"  {south.name:<20} >> {south.total_balance():.2f} ETB")
    print(f"  {hawassa.name:<20} >> {hawassa.total_balance():.2f} ETB")
    print(f"  {adama.name:<20} >> {adama.total_balance():.2f} ETB")
    print(f"  {east.name:<20} >> {east.total_balance():.2f} ETB")
    print(f"  {dire_dawa.name:<20} >> {dire_dawa.total_balance():.2f} ETB")

    # transfers graph — who paid whom
    transfers = {
        "SAV-2001": ["CUR-3001", "SAV-2002"],
        "CUR-3001": ["SAV-2003"],
        "SAV-2002": ["CUR-3002"],
        "CUR-3002": ["CUR-3003"],
        "SAV-2003": ["SAV-2001"],   # cycle back
        "CUR-3003": [],
    }

    print("\n" + "-" * 55)
    print("TRANSFERS GRAPH — BFS REACHABILITY")
    print("-" * 55)
    for start in ["SAV-2001", "CUR-3003", "SAV-2003"]:
        reachable = bfs(transfers, start)
        print(f"  From {start} >> reachable: {sorted(reachable)}")

    # why tree vs graph
    print("\n" + "-" * 55)
    print("WHY THESE STRUCTURES?")
    print("-" * 55)
    print("  Tree  >> branches have one parent (HQ >> region >> branch)")
    print("  Graph >> transfers are any-to-any, possibly cyclic")