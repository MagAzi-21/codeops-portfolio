# Addis Eats - Authentication & Authorization Architecture (Day 42)

## Protection Layers

| Layer | Implementation File | What It Guarantees | Security Verdict |
| :--- | :--- | :--- | :--- |
| **1. Middleware** | `middleware.js` | Fast edge redirect for unauthenticated requests; carries `next` param. | **Not Security** (Only checks cookie existence). |
| **2. Page / Layout** | `app/orders/page.js` | Verifies valid session and scopes query strictly to `user.id`. | **Partly** (Provides proper screen per account). |
| **3. Server Action** | `app/actions.js` | Re-verifies session and confirms user owns the record (`order.userId === user.id`). | **Real Security** (Point of mutation defense). |

## Three Simulated Attack Outcomes

1. **Calling server action while signed out:**
   - *Result:* Throws `401: Authentication required`. Bypassing the UI fails because `cancelOrderAction` checks `getSession()`.
2. **Accessing someone else's order (ID spoofing):**
   - *Result:* Throws `403: Forbidden`. Record ownership check stops unauthorized mutation even if user is authenticated.
3. **Open redirect attack via crafted `?next=https://malicious.com`:**
   - *Result:* Sanitizer validates `next.startsWith("/") && !next.startsWith("//")`, fallbacking safely to `/orders`.