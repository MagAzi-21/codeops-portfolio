# React DevTools Profiler Record

## 1. Problem Identification
- **Scenario:** Adding dishes to the cart while viewing the menu screen.
- **Observed Behavior:** Each time a dish was added to the cart, the parent `Menu` component was triggering full reconciliation across all child `Dish` items, even though their names, prices, and categories had not changed.
- **Baseline Timing (Before):** 
  - `Menu` commit duration: **14.2 ms**
  - All rendered child dish cards re-rendered on every state update.

## 2. Root Cause
- The `Menu` component originally subscribed to the write action without an explicit memoized callback, causing new anonymous function instances to be passed to each `Dish` card.

## 3. Optimization Applied
- Extracted and wrapped the item selection handler in `useCallback` with narrow dependencies.
- Migrated cart reads to narrow Zustand selectors (`useCartStore(s => s.items.length)`) so the menu list view does not subscribe to cart mutations.

## 4. Verification Timing (After)
- `Menu` commit duration: **3.8 ms**
- **Improvement:** ~73% reduction in re-render time during cart additions. Child dish components skipped re-rendering completely.