# Addis Eats - Authentication & Authorization Architecture (Day 45)

## Protection Layers

| Route / Action | Layer 1 (Middleware) | Layer 2 (Page / Layout) | Layer 3 (Action / Scoped Query) | What It Proves |
| :--- | :--- | :--- | :--- | :--- |
| `/menu` | None | None | None | Public and indexable[cite: 42]. |
| `/orders` | Checks session cookie existence | Checks session validity | Scoped query: `getOrdersFor(user.id)` | Authenticated and viewing strictly own records[cite: 42]. |
| `/orders/[id]` | Checks session cookie existence | Checks session validity | Record check: `order.userId === user.id` | Cannot inspect another customer's order status[cite: 42]. |
| `/checkout` | Checks session cookie existence | Checks session validity | Write action binds session | Authenticated user ready for payment[cite: 42]. |
| `/kitchen` | Checks session cookie existence | Enforces `user.role === 'staff'` | Server action rejects non-staff | Permitted staff access only[cite: 42]. |
| `cancelOrder` | N/A | N/A | Session + `order.userId === user.id` | Point of mutation defense. |

## Three Simulated Attacks & Refusal Evidence

1. **Attack 1: Calling `cancelOrder("ord_101")` while signed out**
   - *Outcome:* Refused with `401: Unauthenticated. Session required.`[cite: 43]
   - *Refusal Line:* `app/actions.js`: `if (!user) throw new Error("401...")`[cite: 43]
2. **Attack 2: Calling `cancelOrder("ord_103")` signed in as Mike (`usr_mike`) on Almaz's order**
   - *Outcome:* Refused with `403: Forbidden. You do not own this order.`[cite: 43]
   - *Refusal Line:* `app/actions.js`: `if (order.userId !== user.id) throw new Error("403...")`[cite: 43]
3. **Attack 3: Open redirect via `/signin?next=https://malicious.com`**
   - *Outcome:* Refused; sanitized to internal path `/orders`[cite: 43]
   - *Refusal Line:* `app/actions.js`: `destination = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : ...`[cite: 43]