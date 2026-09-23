# Addis Eats - Multi-Screen Routed Application

Built with React Router v6 for IBT College CodeOps Module 3 Day 31.

## Route Table
| Path | Screen | Protection |
|---|---|---|
| `/` | Landing page with highlights | Public |
| `/menu` | Full menu with URL query category filter (`?category=...`) | Public |
| `/menu/:id` | Dynamic dish view reading route params | Public |
| `/cart` | Order summary displaying global cart state | Public |
| `/checkout` | Delivery and TeleBirr checkout form | Protected (`RequireAuth`) |
| `/login` | Authentication form redirecting to origin | Public |
| `*` | 404 Not Found fallback | Public |

## How to Run
1. `npm install`
2. `npm run dev`