# Day 14 / Day 39: API Routes & Route Handlers

## Endpoint Documentation

| Method | Endpoint | Status Codes | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/dishes` | `200` | Returns full list of dishes as JSON. |
| **GET** | `/api/dishes/[id]` | `200`, `404` | Returns single dish or uniform 404 JSON error shape. |
| **POST** | `/api/orders` | `201`, `422`, `400` | Validates TeleBirr phone and required fields; returns 422 with fieldErrors. |

## Server Actions & Authorizations
- `placeOrderAction`: Handles form validation on the server using `useActionState`, invalidating page caches via `revalidatePath`.
- `cancelOrderAction`: Enforces ownership and active session verification before mutating order state.
- `.env.local`: Configured with private server secrets ensuring zero leak into browser bundles.