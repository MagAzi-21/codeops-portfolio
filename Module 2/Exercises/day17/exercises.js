'use strict';

// --------------------------------------------------------------------------
// Exercise 1: Default Parameters & Arrow Function with Implicit Return
// --------------------------------------------------------------------------
function vat(amount, rate = 0.15) {
    return amount * rate;
}

const vatArrow = (amount, rate = 0.15) => amount * rate;

console.log('Exercise 1:');
console.log('VAT (declaration):', vat(1000));
console.log('VAT (arrow):', vatArrow(1000));
console.log('-------------------------------------------');

// --------------------------------------------------------------------------
// Exercise 2: Private State Counter Closure
// --------------------------------------------------------------------------
function makeCounter() {
    let count = 0;
    return () => ++count;
}

/*
  Explanation:
  The `count` variable is declared inside the `makeCounter` scope. 
  When `makeCounter` runs, it returns an inner function that maintains a reference 
  to `count` through lexical scoping (a closure). Because `count` is not declared globally 
  and is not directly exposed as an object property, outside code cannot read, modify, 
  or overwrite it directly.
*/

const counter = makeCounter();
console.log('Exercise 2:');
console.log('Counter Call 1:', counter()); // 1
console.log('Counter Call 2:', counter()); // 2
console.log('Counter Call 3:', counter()); // 3
console.log('-------------------------------------------');

// --------------------------------------------------------------------------
// Exercise 3: Function Factory for Discounts
// --------------------------------------------------------------------------
function discountBy(rate) {
    return price => price * (1 - rate);
}

const memberPrice = discountBy(0.10);
const salePrice = discountBy(0.30);

console.log('Exercise 3:');
console.log('Member Price (1000 ETB - 10%):', memberPrice(1000), 'ETB');
console.log('Sale Price (1000 ETB - 30%):', salePrice(1000), 'ETB');
console.log('-------------------------------------------');

// --------------------------------------------------------------------------
// Exercise 4: Higher-Order Function (applyToAll)
// --------------------------------------------------------------------------
function applyToAll(list, fn) {
    const result = [];
    for (const item of list) {
        result.push(fn(item));
    }
    return result;
}

const prices = [100, 200, 350, 500];
const pricesWithVat = applyToAll(prices, p => p * 1.15);

console.log('Exercise 4:');
console.log('Original Prices:', prices);
console.log('Prices with 15% VAT:', pricesWithVat);
console.log('-------------------------------------------');

// --------------------------------------------------------------------------
// Exercise 5: Callback Iteration via forEach
// --------------------------------------------------------------------------
const cities = ['Addis Ababa', 'Hawassa', 'Dire Dawa', 'Bahir Dar', 'Gondar'];

console.log('Exercise 5:');
cities.forEach((city, index) => {
    console.log(`${index + 1}. ${city}`);
});