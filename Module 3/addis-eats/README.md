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

## Checkout Validation Rules & Feedback

1. **Full Name (`form.name`):** Must not be empty after trimming whitespace (`!form.name.trim()`). Ensures delivery personnel have an identifiable recipient name.
2. **TeleBirr Phone (`form.phone`):** Matches `/^(?:\+251|0)9\d{8}$/`. Accepts either local `09...` or international `+2519...` format with exactly 8 succeeding digits to ensure valid mobile transaction routing.
3. **Delivery Area (`form.area`):** Mandatory selection ensuring a valid geographic dispatch destination.
4. **Timing & Accessibility:** Errors are deferred until field `blur` (touch tracking), updating live once shown. Accessible ARIA attributes (`aria-invalid`, `aria-describedby`, `role="alert"`) ensure screen readers communicate failures directly. Focus automatically shifts to the first invalid input upon attempted submission.

## How to Run
1. `npm install`
2. `npm run dev`