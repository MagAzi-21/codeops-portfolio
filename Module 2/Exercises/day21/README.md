# Persistent Signup Form (Day 21)

A validated Ethiopian signup form saving records to localStorage as JSON.

## How to Run
Open `index.html` in any web browser.

## Features
- Regex validation matching Ethiopian mobile prefixes (`09...` and `+2519...`).
- Defensive `localStorage` JSON serialization using `try...catch` with fallback arrays.
- Real-time signup counter persisted across reloads.
- Safe DOM error message rendering with `textContent`.