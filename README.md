# Module 1 — Foundation

CodeOps Full Stack SD | IBT College Canada  
Days 1–9: Python basics, OOP, SOLID, design patterns, and data structures.

---

## What's Inside

| Folder | What It Is |
|--------|-----------|
| `Exercises/` | Daily practice files for Days 1–9 |
| `Mini Project/` | The Addis Bank — a progressive account management system |
| `qodo/` | Project |

---

## Exercises

Daily reading-sheet exercises, one folder per day.

| Day | Topic |
|-----|-------|
| day01 | Variables, types, control flow |
| day02 | Functions, scope, modules |
| day03 | File I/O, error handling |
| day04 | OOP — classes, objects, encapsulation |
| day05 | OOP — inheritance, polymorphism, abstraction |
| day06 | SOLID principles + design patterns |
| day07 | DSA — linear structures, Big-O |
| day08 | DSA — recursion, searching, sorting |
| day09 | DSA — trees, graphs, heaps |

---

## Mini Project — Addis Bank

A single project that grows from Day 4 through Day 9. Four files, each building on the last.

| File | Days | Version | What's Inside |
|------|------|---------|---------------|
| `account.py` | 4 | V1.0 | Encapsulated `Account` — private balance, `@property`, validation |
| `bank.py` | 5–8 | V2.0 → V5.0 | Inheritance, Singleton, Factory, Observer |
| `registry.py` | 7–8 | V1.0 → V2.0 | Dict registry (O(1)), history stack, undo, binary search, recursion |
| `bank_moduel.py` | 9 | V6.0 | Branch tree, transfers graph, BFS |

### How to Run

```bash
cd "Mini Project"
python account.py      # Day 4 — basic Account
python bank.py         # Day 5–8 — transactions + observers
python registry.py     # Day 7–8 — registry + search + undo
python bank_moduel.py  # Day 9 — branch tree + graph BFS