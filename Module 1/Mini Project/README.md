# CodeOps Addis Bank Account System Mini Project
By Mikiyas Abesha

# Addis Bank — Account Management System

A progressive mini project built across Module 1 (Days 4–9).  
Four files in one folder, each growing as new concepts were introduced.

---

## Files

| File | Days | Version | What's Inside |
|------|------|---------|---------------|
| `account.py` | 4 | V1.0 | Encapsulated `Account` — private balance, `@property`, deposit/withdraw validation |
| `bank.py` | 5–8 | V2.0 → V5.0 | Inheritance (`SavingsAccount`, `CurrentAccount`), Singleton (`BankConfig`), Factory (`AccountFactory`), Observer (`SMSAlert`, `AuditLog`) |
| `registry.py` | 7–8 | V1.0 → V2.0 | Dict-based `AccountRegistry` (O(1) lookup), transaction history stack, `undo_last()`, leaderboard, binary search, recursive totals |
| `bank_moduel.py` | 9 | V6.0 | `Branch` tree (recursive `total_balance()`), transfers graph, BFS reachability |

---

## How to Run

```bash
# Each file has a demo block under if __name__ == "__main__":
python account.py      # Day 4 — basic Account
python bank.py         # Day 5–8 — transactions + observers
python registry.py     # Day 7–8 — registry + search + undo
python bank_moduel.py  # Day 9 — branch tree + graph BFS
