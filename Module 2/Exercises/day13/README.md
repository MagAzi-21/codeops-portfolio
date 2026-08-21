# Business Profile Card (Day 13)

A styled profile card for **Bole Specialty Cafe**, a fictional coffee shop in Bole, Addis Ababa accepting TeleBirr payments.

## How to Run
Open `index.html` in any modern web browser with an active internet connection (to load Google Fonts).

## CSS Techniques Implemented
1. **Custom Properties (`:root`):** Defined central design tokens for colors (HSL), spacing scale, and border radiuses accessed via `var()`.
2. **Global Box-Sizing:** Set `box-sizing: border-box` across all elements.
3. **Typography:** Integrated Google Font `Inter` with distinct hierarchy (`h1`, tagline, line-height 1.6 body text).
4. **HSL State Transition:** Hover effect on the action button adjusting solely the lightness channel (`hsl(212, 68%, 33%)` -> `hsl(212, 68%, 45%)`).
5. **Pseudo-Elements:** `::before` custom bullet points for key location and payment metadata.