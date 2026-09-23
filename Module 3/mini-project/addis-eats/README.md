# Addis Eats - Week 1 Assembled Project

A complete React application bringing together Days 26 to 30 for IBT College CodeOps Module 3.

## Architectural Highlights & Hook Usage
- **`useContext` (`CartContext`):** Distributes cart state, item dispatch, and running total across the header badge, menu cards, and checkout form without prop drilling.
- **`useReducer` (`cartReducer`):** Manages all cart mutations (`add`, `remove`, `clear`) in one pure, testable function.
- **`useMemo`:**
  - Memoises the `CartContext.Provider` value to prevent wasteful consumer re-renders.
  - Caches the filtered dishes list based on the active category and fetched data.
- **`useCallback`:** Provides stable callback reference (`handleAdd`) to child components.
- **`useFetch` (Custom Hook):** Encapsulates data fetching, loading, error state handling, and cancellation via `AbortController`.

## How to Run
1. `npm install`
2. `npm run dev`