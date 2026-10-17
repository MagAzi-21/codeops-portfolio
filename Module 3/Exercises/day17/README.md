# Day 17 / Day 42: Middleware & Authentication

## Implemented Exercises
1. Created `lib/session.js` helper reading and verifying session cookie tokens[cite: 26, 29].
2. Configured session cookie with `httpOnly: true`, `secure`, and `sameSite: "lax"`[cite: 26, 29].
3. Created `middleware.js` with narrow matcher for `/checkout`, `/orders`, and `/kitchen`[cite: 24, 29].
4. Preserved user destination via `next` query parameter during sign-in redirects[cite: 28, 29].
5. Sanitized redirect paths to reject absolute external URLs (open redirect defense)[cite: 28, 29].
6. Scoped database queries to authenticated `user.id`[cite: 27, 29].
7. Enforced staff role server-side on `/kitchen` route[cite: 28, 29].

## How to Test
```bash
npm run dev