# Addis Eats - State Management (Zustand & Context)

Upgraded state architecture for IBT College CodeOps Module 3 Day 32.

## Why Each State Lives Where It Does

### 1. Cart State in Zustand (`cartStore.js`)
- **Granular Selectors:** The cart total and item list change frequently on user action. With Zustand, components subscribe only to the slice they need (e.g., `CartBadge` subscribes only to count and total), avoiding global re-renders.
- **Persistence (`persist` middleware):** The cart automatically syncs to `localStorage`, allowing customer orders to survive complete page refreshes.
- **Independence from DOM Tree:** Living in an external module, the cart state is accessible without wrapping the application in a provider.

### 2. Authentication State in Context (`AuthContext.jsx` + `useAuth.js`)
- **Infrequent Changes:** The authentication session changes only upon explicit login or logout actions. The broad re-rendering caused by Context updates is completely acceptable here.
- **Simplicity:** Auth requires simple session availability across route guards without complex selector slices or middleware.
- **Guarded Access:** The `useAuth` hook enforces safety by throwing a descriptive runtime error if accessed outside the provider.

## How to Run
1. `npm install`
2. `npm run dev`