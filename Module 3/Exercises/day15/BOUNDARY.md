# Addis Eats - Component Boundary Architecture (Day 40)

| Component / File | Environment | Justification |
| :--- | :--- | :--- |
| `app/layout.js` | **Server** | Root shell containing `<html>` and `<body>`; passes `children` into providers with 0 JS overhead. |
| `components/Providers.jsx` | **Client** (`"use client"`) | React Context requires component state (`useState`) to manage cart storage across screens. |
| `app/menu/page.js` | **Server** | Directly awaits data sources on the server without `useState`, `useEffect`, or API waterfalls. |
| `components/FilterShell.jsx`| **Client** (`"use client"`) | Interactivity required to toggle category chips; receives server `DishList` through `children`. |
| `components/CategoryBar.jsx`| **Client** (`"use client"`) | Manages selected active category button state. |
| `components/DishList.jsx` | **Server** | Pure rendering wrapper; emits plain HTML without client dependencies. |
| `components/DishCard.jsx` | **Server** | Pure presentation markup; sends 0 JS to the browser. |
| `components/AddToCartButton.jsx` | **Client** (`"use client"`) | Smallest interactive leaf node binding `onClick` to trigger cart dispatch. |
| `app/menu/[id]/page.js` | **Server** | Server component reading params and fetching dish data at build time. |
| `app/menu/error.js` | **Client** (`"use client"`) | Error boundaries require client state and event handlers to execute `reset()`. |