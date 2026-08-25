# Birr Watch - Exchange Rate Tracker (Day 22)

A data-driven exchange-rate application tracking the value of the Ethiopian Birr (ETB).

## How to Run
Open `index.html` in any web browser with an active internet connection.

## Architecture
- **API Endpoint:** `https://open.er-api.com/v6/latest/ETB`
- **State Pattern:** Application views render strictly from a central `state` object.
- **Persistence:** Watchlist preferences and target selections are serialized via `localStorage`.
- **Error Handling:** Protects against negative conversions, non-numeric inputs, network failures, and parsing faults.