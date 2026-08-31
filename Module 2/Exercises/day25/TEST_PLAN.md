# Addis Eats Manual Test Plan

- [ ] Add a dish to cart, change quantity by adding again, and remove it via delete button.
- [ ] Search a dish that does not exist -> triggers calm empty state message.
- [ ] Attempt checkout with an invalid phone number -> shows specific validation error.
- [ ] Attempt checkout with an empty cart -> blocked with clear error message.
- [ ] Place a valid order -> clears cart, displays success confirmation box with ETB total.
- [ ] Reload page with items in cart -> cart state correctly restored from `localStorage`.
- [ ] Break data URL path -> displays calm error message on menu container.