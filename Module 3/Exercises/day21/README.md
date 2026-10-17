# Day 21 / Day 46 Exercises: Data Representation

## Implemented Exercises
1. **Server-Side Aggregation:** Compact summarized datasets calculated on the server; only aggregated rows cross the network to client chart leaves[cite: 52].
2. **Revenue Bar Chart:** Composed using Recharts with zero-origin Y-axis and native ETB currency tick formatting.
3. **Timeline Line Chart:** Displays daily orders volume with explicit date scope and unit labels[cite: 53].
4. **Dual Representation:** Every chart pairs with an accessible HTML table directly beneath it for screen readers and copyability[cite: 53].
5. **Semantic Table Markup:** Built with `<table>`, `<caption>`, `<thead>`, `<tbody>`, and `<th scope="col">`[cite: 53, 54].
6. **URL-Persisted Sorting:** Sorting updates URL query strings (`?sort=&dir=`), reflecting `aria-sort` attributes on column headers without client JavaScript waterfalls.
7. **Four States Complete:** Loading skeleton, honest empty state with action link, error retry boundary, and formatted loaded table.

## How to Test
```bash
npm run dev