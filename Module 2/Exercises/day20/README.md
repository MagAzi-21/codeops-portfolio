# Country Facts Explorer (Day 20)

A lightweight asynchronous web application querying RESTful country datasets.

## How to Run
Open `index.html` in a web browser with an internet connection.

## API Integration Details
- REST Endpoint: `https://restcountries.com/v3.1/name/{name}`
- Fallback Endpoint (Ex 1): `https://open.er-api.com/v6/latest/USD`
- Implements `res.ok` status verification and handles loading, error, and resolved data states. 