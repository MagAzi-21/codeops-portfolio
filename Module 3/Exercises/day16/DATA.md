# Client Data Fetching Architecture (Day 41)

| Query / Feature | SWR Key | Refresh Rule | Justification |
| :--- | :--- | :--- | :--- |
| **Order Status** | `"/api/orders/${id}"` | `refreshInterval: 5000` | Kitchen progress updates dynamically; polling every 5s maintains live accuracy without manual refreshing[cite: 20]. |
| **Dish Search** | `["/api/dishes", debouncedQuery, page]` | Keystroke Debounce (300ms) | Prevents firing a request per character; array key triggers refetch only when the debounced term or page changes[cite: 20, 22]. |
| **Empty Search Key** | `null` (conditional) | No-op when query is inactive | Passing `null` pauses fetching cleanly without breaking React Hook ordering rules[cite: 20]. |
| **Pagination Cache**| `keepPreviousData: true` | Retains old page while fetching | Prevents screen flashing between page transitions, delivering a smooth client experience[cite: 20, 22]. |