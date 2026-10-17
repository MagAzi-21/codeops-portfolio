# Component Boundary Architecture (Day 38)

| Component / File | Environment | Justification |
| :--- | :--- | :--- |
| `app/layout.js` | **Server** | Root shell containing `<html>` and `<body>`; passes `children` to client provider with 0 JS overhead. |
| `components/Providers.jsx` | **Client** (`"use client"`) | React Context requires component state (`useState`) to manage global store across screens. |
| `app/menu/page.js` | **Server** | Directly awaits data sources on the server without `useState`, `useEffect`, or API waterfalls. |
| `components/FilterShell.jsx`| **Client** (`"use client"`) | Interactive category tabs; receives server `DishList` through `children`. |
| `components/DishList.jsx` | **Server** | Pure presentation wrapper; emits plain HTML without client dependencies. |
| `components/DishCard.jsx` | **Server** | Presentation markup; sends 0 JS to the browser. |
| `components/AddToCartButton.jsx` | **Client** (`"use client"`) | Smallest interactive leaf node binding `onClick` to trigger cart dispatch. |
| `app/menu/[id]/page.js` | **Server** | Uses `Promise.all` for parallel resolution of dish details and reviews. |
| `app/menu/error.js` | **Client** (`"use client"`) | Next.js error boundaries require client state and event handlers to execute `reset()`. |