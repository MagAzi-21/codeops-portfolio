# =====================================================================
#         ADDIS BANK ACCOUNT SYSTEM Version 5.0 (Day 9 DSA III)
#         Trees (Hierarchy), Graphs (Network), Heaps (Priority)
# =====================================================================

from abc import ABC, abstractmethod
from datetime import datetime
import heapq
import random
from typing import Dict, List, Optional
from collections import deque, defaultdict


# ---------------------------------------------------------------------
# DAY 9 DATA STRUCTURES: TREE, GRAPH, HEAP
# ---------------------------------------------------------------------

# 1. Tree: Organizational & Branch Hierarchy
class HierarchyNode:
    """Represents a node in the Bank Branch / Employee Hierarchy Tree."""
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role  # e.g., 'Head Office', 'Branch', 'Teller', 'Loan Officer'
        self.children: List['HierarchyNode'] = []

    def add_child(self, child_node: 'HierarchyNode'):
        self.children.append(child_node)

    def print_tree(self, level: int = 0):
        indent = "   " * level
        print(f"{indent}└── [{self.role}] {self.name}")
        for child in self.children:
            child.print_tree(level + 1)


# 2. Graph: Customer Money Transfer Network
class TransferNetworkGraph:
    """Adjacency List representation of money transfers between accounts."""
    def __init__(self):
        self.adj_list = defaultdict(list)

    def add_transfer_edge(self, sender_acc: str, receiver_acc: str, amount: float):
        self.adj_list[sender_acc].append((receiver_acc, amount))
        if receiver_acc not in self.adj_list:
            self.adj_list[receiver_acc] = []

    def print_network(self):
        print("\n--- MONEY TRANSFER NETWORK GRAPH ---")
        if not self.adj_list:
            print("No transfers recorded yet.")
            return
        for account, transfers in self.adj_list.items():
            connections = ", ".join([f"{to} ({amt} ETB)" for to, amt in transfers])
            print(f" Account #{account} ➔ [{connections if connections else 'No Outgoing Transfers'}]")

    def bfs_traversal(self, start_acc: str) -> List[str]:
        """Breadth-First Search to find all reachable accounts in network."""
        if start_acc not in self.adj_list:
            return []
        visited = set()
        queue = deque([start_acc])
        visited.add(start_acc)
        traversal_order = []

        while queue:
            curr = queue.popleft()
            traversal_order.append(curr)
            for neighbor, _ in self.adj_list[curr]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return traversal_order

    def dfs_traversal(self, start_acc: str, visited: set = None) -> List[str]:
        """Depth-First Search to traverse customer network."""
        if visited is None:
            visited = set()
        if start_acc not in self.adj_list or start_acc in visited:
            return []
        visited.add(start_acc)
        traversal_order = [start_acc]

        for neighbor, _ in self.adj_list[start_acc]:
            if neighbor not in visited:
                traversal_order.extend(self.dfs_traversal(neighbor, visited))
        return traversal_order


# 3. Priority Queue (Heap): Urgent Transactions & Alerts
class PriorityAlertHeap:
    """Max-Heap for managing urgent bank alerts and high-priority operations."""
    def __init__(self):
        self._heap = []
        self._counter = 0
    def add_alert(self, priority: int, account_num: str, description: str):
        self._counter += 1
        heapq.heappush(self._heap, (-priority, self._counter, account_num, description))

    def process_highest_priority(self) -> Optional[tuple]:
        if not self._heap:
            return None
        neg_prio, _, acc, desc = heapq.heappop(self._heap)
        return (-neg_prio, acc, desc)

    def display_pending(self):
        print("\n--- PENDING PRIORITY ALERTS (HEAP) ---")
        if not self._heap:
            print("No pending alerts.")
            return
        # Display elements ordered by priority without destroying heap state
        sorted_temp = sorted(self._heap)
        for neg_prio, _, acc, desc in sorted_temp:
            print(f" [Priority {-neg_prio}] Acc #{acc}: {desc}")


# ---------------------------------------------------------------------
# DAY 7 & 8 BASE CORE: TRANSACTION & ACCOUNT ABSTRACTIONS
# ---------------------------------------------------------------------

class Transaction:
    def __init__(self, transaction_id: str, amount: float, date_str: str, trans_type: str):
        self.transaction_id = transaction_id
        self.amount = float(amount)
        self.date = datetime.strptime(date_str, "%Y-%m-%d")
        self.trans_type = trans_type.upper()

    @property
    def formatted_date(self) -> str:
        return self.date.strftime("%Y-%m-%d")

    def __repr__(self):
        return f"[{self.transaction_id}] {self.formatted_date} | {self.trans_type:<10} | {self.amount:>8.2f} ETB"


class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(BankConfig, cls).__new__(cls)
            cls._instance.savings_interest_rate = 0.07
            cls._instance.overdraft_limit = 5000.0
            cls._instance.large_transaction_threshold = 3000.0
        return cls._instance


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


class Account(ABC):
    def __init__(self, number: str, owner: str, balance: float):
        self._number = number
        self._owner = owner
        self._balance = max(0.0, float(balance))
        self._observers: List[Observer] = []
        self.transactions: List[Transaction] = []

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
        tx_id = f"TX{random.randint(10000, 99999)}"
        today = datetime.now().strftime("%Y-%m-%d")
        self.transactions.append(Transaction(tx_id, amount, today, "WITHDRAWAL"))
        print(f"\n[-] Withdrew {amount} ETB. Remaining Balance: {self._balance:.2f} ETB")

        if amount >= BankConfig().large_transaction_threshold:
            self.notify_all(f"Large withdrawal of {amount} ETB processed.")
        return True

    @abstractmethod
    def statement(self):
        pass


class InterestBearing(ABC):
    @abstractmethod
    def apply_interest(self):
        pass


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


# ---------------------------------------------------------------------
# CLI & SYSTEM INTEGRATION
# ---------------------------------------------------------------------

def build_default_hierarchy() -> HierarchyNode:
    root = HierarchyNode("Head Office", "HQ")
    bole = HierarchyNode("Bole Branch", "Branch")
    piassa = HierarchyNode("Piassa Branch", "Branch")

    bole.add_child(HierarchyNode("Abebe Bikila", "Teller"))
    bole.add_child(HierarchyNode("Tigist Assefa", "Loan Officer"))
    piassa.add_child(HierarchyNode("Dawit Kebede", "Teller"))

    root.add_child(bole)
    root.add_child(piassa)
    return root


def display_menu():
    print("\n=======================================================")
    print("      ADDIS BANK SYSTEM (v5.0 - Trees, Graphs, Heaps)")
    print("=======================================================")
    print("1. Create New Bank Account")
    print("2. Deposit / Withdraw Funds")
    print("3. Add New Branch or Employee Node (Tree)")
    print("4. View Bank Organization Hierarchy (Tree)")
    print("5. Record Money Transfer (Graph)")
    print("6. Show Customer Transfer Connections (Graph BFS/DFS)")
    print("7. Add Urgent Transaction / Security Alert (Heap)")
    print("8. Process Highest Priority Alert (Heap)")
    print("9. Display All Priority Alerts (Heap)")
    print("10. Exit System")


def generate_account_number(existing_accounts):
    while True:
        acc_num = str(random.randint(1000, 9999))
        if acc_num not in existing_accounts:
            return acc_num


def main():
    accounts: Dict[str, Account] = {}
    hierarchy_root = build_default_hierarchy()
    transfer_graph = TransferNetworkGraph()
    priority_heap = PriorityAlertHeap()

    while True:
        display_menu()
        choice = input("Select an option (1-10): ").strip()

        if choice == "1":
            print("\nAccount Types: 1. Savings | 2. Current | 3. Fixed Deposit")
            kind_choice = input("Select Type (1-3): ").strip()
            kind_map = {"1": "savings", "2": "current", "3": "fixed"}
            if kind_choice not in kind_map:
                print("[!] Invalid type selected.")
                continue

            name = input("Enter Holder Name: ").strip()
            if not name:
                print("[!] Name cannot be empty.")
                continue
            try:
                deposit_amt = float(input("Enter Initial Deposit (ETB): "))
                acc_num = generate_account_number(accounts)
                acc = AccountFactory.create_account(kind_map[kind_choice], acc_num, name, deposit_amt)
                accounts[acc_num] = acc
                print(f"[✓] Created {kind_map[kind_choice].capitalize()} Account! Acc Num: {acc_num}")
            except ValueError as e:
                print(f"[!] Error: {e}")

        elif choice == "2":
            acc_num = input("Enter Account Number: ").strip()
            if acc_num not in accounts:
                print("[!] Account not found.")
                continue
            action = input("Type 'd' for Deposit, 'w' for Withdraw: ").strip().lower()
            try:
                amt = float(input("Enter Amount (ETB): "))
                if action == "d":
                    accounts[acc_num].deposit(amt)
                elif action == "w":
                    success = accounts[acc_num].withdraw(amt)
                    if amt >= BankConfig().large_transaction_threshold and success:
                        priority_heap.add_alert(5, acc_num, f"Large Withdrawal Alert: {amt:.2f} ETB")
                else:
                    print("[!] Invalid action.")
            except ValueError:
                print("[!] Invalid numerical value.")

        elif choice == "3":
            print("\n--- Add Branch / Staff Member ---")
            parent_name = input("Enter Parent Node Name (e.g., 'Head Office', 'Bole Branch'): ").strip()
            node_name = input("Enter New Node Name: ").strip()
            role = input("Enter Role (e.g., 'Branch', 'Teller', 'Loan Officer'): ").strip()

            def find_and_add(curr: HierarchyNode, target: str, new_node: HierarchyNode) -> bool:
                if curr.name.lower() == target.lower():
                    curr.add_child(new_node)
                    return True
                for child in curr.children:
                    if find_and_add(child, target, new_node):
                        return True
                return False

            added = find_and_add(hierarchy_root, parent_name, HierarchyNode(node_name, role))
            if added:
                print(f"[✓] Added [{role}] {node_name} under {parent_name}.")
            else:
                print(f"[!] Target parent node '{parent_name}' not found.")

        elif choice == "4":
            print("\n--- BANK ORGANIZATION HIERARCHY ---")
            hierarchy_root.print_tree()

        elif choice == "5":
            sender = input("Enter Sender Account #: ").strip()
            receiver = input("Enter Receiver Account #: ").strip()
            try:
                amt = float(input("Enter Transfer Amount (ETB): "))
                if sender in accounts and accounts[sender].withdraw(amt):
                    if receiver in accounts:
                        accounts[receiver].deposit(amt)
                    transfer_graph.add_transfer_edge(sender, receiver, amt)
                    print(f"[✓] Transferred {amt:.2f} ETB from #{sender} to #{receiver}.")
            except ValueError:
                print("[!] Invalid amount.")

        elif choice == "6":
            transfer_graph.print_network()
            start_node = input("\nEnter starting Account # to run traversal search: ").strip()
            if start_node in transfer_graph.adj_list:
                print(f"BFS Reachable Accounts: {transfer_graph.bfs_traversal(start_node)}")
                print(f"DFS Reachable Accounts: {transfer_graph.dfs_traversal(start_node)}")
            else:
                print("[!] Account has no registered outgoing transfers.")

        elif choice == "7":
            acc_num = input("Enter Account #: ").strip()
            desc = input("Enter Incident/Alert Description: ").strip()
            try:
                prio = int(input("Enter Priority Level (1 = Low, 10 = Critical Emergency): "))
                priority_heap.add_alert(prio, acc_num, desc)
                print(f"[✓] Alert added with priority level {prio}.")
            except ValueError:
                print("[!] Priority must be an integer.")

        elif choice == "8":
            processed = priority_heap.process_highest_priority()
            if processed:
                prio, acc, desc = processed
                print(f"\n[⚡ PROCESSED HIGHEST PRIORITY ALERT]")
                print(f" Priority Level : {prio}")
                print(f" Account Number : {acc}")
                print(f" Description    : {desc}")
            else:
                print("\n[!] Priority queue is empty.")

        elif choice == "9":
            priority_heap.display_pending()

        elif choice == "10":
            print("\nThank you for using Addis Bank System v5.0!")
            break

        else:
            print("[!] Invalid option choice.")


if __name__ == "__main__":
    main()