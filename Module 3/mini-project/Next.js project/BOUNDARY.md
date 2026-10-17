# Addis Eats - Component Boundary Architecture (Day 38)

| Component / File | Execution Side | Justification |
| :--- | :--- | :--- |
| `app/layout.js` | **Server** | Root shell containing `<html>` and `<body>`; passes `children` to `Providers` with 0 JS overhead. |
| `components/Providers.jsx` | **Client** (`"use client"`) | React Context requires state (`useState`) to manage shopping cart items across route changes. |
| `app/menu/page.js` | **Server** | Directly awaits data sources on the server without `useState`, `useEffect`, or loading states. |
| `components/FilterShell.jsx`| **Client** (`"use client"`) | Requires click handlers and state to track category tabs; wraps server content via `children`. |
| `components/DishList.jsx` | **Server** | Pure markup list renderer; sends 0 JS to the browser. |
| `components/DishCard.jsx` | **Server** | Presentation card; ships plain HTML. |
| `components/AddToCartButton.jsx` | **Client** (`"use client"`) | Smallest interactive leaf node binding `onClick` to update cart state. |
| `app/menu/[id]/page.js` | **Server** | Async server component using `Promise.all` to fetch dish data and reviews concurrently. |
| `app/menu/error.js` | **Client** (`"use client"`) | Next.js error boundaries require client state and event handlers to trigger `reset()`. |