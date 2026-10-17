# Day 15 / Day 40: Next.js Foundations Project

## Endpoint Documentation

| Method | Endpoint | Status Codes | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/dishes` | `200` | Returns full list of dishes as JSON. |
| **GET** | `/api/dishes/[id]` | `200`, `404` | Returns single dish or uniform 404 JSON error shape. |
| **POST** | `/api/orders` | `201`, `422`, `400` | Validates TeleBirr phone and required fields; returns 422 with fieldErrors. |

## Verification Commands

### 1. Build Verification
```bash
npm run build