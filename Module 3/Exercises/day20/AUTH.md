# Addis Eats - Authentication & Authorization Architecture (Day 45)

## Protection Layers

| Route / Action | Layer 1 (Middleware) | Layer 2 (Page / Layout) | Layer 3 (Action / Scoped Query) | What It Proves |
| :--- | :--- | :--- | :--- | :--- |
| `/menu` | None | None | None | Public and indexable[cite: 45]. |
| `/orders/[id]` | Checks session cookie existence | Verifies valid user session | Scoped query confirms `order.userId === user.id` | Authenticated and strictly owns the record[cite: 45]. |
| `/checkout` | Checks session cookie existence | Verifies valid user session | Write action re-validates session | Authenticated user ready to pay[cite: 45]. |
| `/kitchen` | Checks session cookie existence | Checks `user.role === 'staff'` | Server action rejects non-staff | Permitted staff access only[cite: 45]. |
| `cancelOrder` | N/A | N/A | Checks session + `order.userId === user.id` | Cannot cancel someone else's order[cite: 45, 47]. |

## Three Simulated Attacks & Refusal Evidence

1. **Calling `cancelOrder("ord_812")` from console while signed out:**
   - *Outcome:* Refused with `401: Unauthenticated. Session required`[cite: 47].
   - *Refusal Line:* `app/actions.js` line: `if (!user) throw new Error("401...")`[cite: 46, 47].
2. **Signed in as Almaz (`usr_almaz`) and calling `cancelOrder("ord_812")` (owned by Mike):**
   - *Outcome:* Refused with `403: Forbidden. You do not own this order`[cite: 47].
   - *Refusal Line:* `app/actions.js` line: `if (order.userId !== user.id) throw new Error("403...")`[cite: 46, 47].
3. **Open redirect attack via `/signin?next=https://malicious.com`:**
   - *Outcome:* Refused; redirected safely to `/orders/ord_812`[cite: 47].
   - *Refusal Line:* `app/actions.js` line: `rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : ...`[cite: 46].