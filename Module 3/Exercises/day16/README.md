# Day 16 / Day 41: Client Data Fetching with SWR

## Implemented Exercises
1. Created standardized `lib/fetcher.js` throwing descriptive errors for non-OK HTTP responses.
2. Built `OrderStatus.jsx` driven by `useSWR`, replacing manual `useEffect`, cancellation flags, and state management[cite: 19, 23].
3. Configured `refreshInterval: 5000` to poll order progression in the background[cite: 20, 23].
4. Rendered order data in Server Component (`/orders/[id]`) and piped it into SWR as `fallbackData` (zero-spinner first paint)[cite: 22, 23].
5. Created a debounced search input sending queries only after 300ms of typing inactivity[cite: 22, 23].
6. Enabled `keepPreviousData: true` on dish lists to eliminate empty screen flashes between requests[cite: 22, 23].
7. Wired URL search parameters (`?page=`) to array keys for shareable pagination[cite: 20, 22, 23].

## Verification
- Run `npm run dev` and navigate to `/orders/ord_101`: notice zero initial loading spinner, followed by status updates in the Network tab every 5 seconds[cite: 22, 23].
- Navigate to `/search`: inspect the Network tab while typing "shiro" to verify only 1 request fires after typing pauses[cite: 22, 23].