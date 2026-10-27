# Addis Eats - Component Boundary Architecture (Day 40)

| Component / File | Environment | Justification |
| :--- | :--- | :--- |
| `app/layout.js` | **Server** | Root shell rendering HTML tags and passing children into client context provider[cite: 9]. |
| `components/Providers.jsx` | **Client** (`"use client"`) | React Context requires `useState` to persist cart items across client navigations[cite: 9]. |
| `app/menu/page.js` | **Server** | Directly awaits data queries on the server without hooks or waterfalls[cite: 9, 10]. |
| `components/FilterShell.jsx`| **Client** (`"use client"`) | Holds active category tab state; wraps server-rendered `DishList` via `children`[cite: 9, 10]. |
| `components/CategoryBar.jsx`| **Client** (`"use client"`) | Interactive chip buttons triggering category selection[cite: 9]. |
| `components/DishList.jsx` | **Server** | Pure structural layout sending zero JavaScript to the browser[cite: 9]. |
| `components/DishCard.jsx` | **Server** | Pure presentation card; sends plain HTML[cite: 9]. |
| `components/AddToCartButton.jsx` | **Client** (`"use client"`) | Smallest interactive leaf node binding `onClick` to update cart state[cite: 9, 10]. |
| `app/menu/[id]/page.js` | **Server** | Prerendered statically with `generateStaticParams`[cite: 9, 10]. |
| `app/menu/error.js` | **Client** (`"use client"`) | Error boundaries require client handlers to execute `reset()`[cite: 7]. |