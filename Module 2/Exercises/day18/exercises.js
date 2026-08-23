'use strict';

// --------------------------------------------------------------------------
// Exercise 1: map, filter, and reduce on ETB Prices
// --------------------------------------------------------------------------
const prices = [250, 600, 1200, 180, 950, 400];

const pricesWithVat = prices.map(p => p * 1.15);
const affordablePrices = pricesWithVat.filter(p => p < 1000);
const grandTotal = affordablePrices.reduce((sum, p) => sum + p, 0);

console.log('--- Exercise 1 ---');
console.log('Original Prices:', prices);
console.log('With 15% VAT:', pricesWithVat);
console.log('Filtered (< 1000 ETB):', affordablePrices);
console.log('Grand Total:', grandTotal.toFixed(2), 'ETB');
console.log('------------------');

// --------------------------------------------------------------------------
// Exercise 2: Object Iteration with Object.entries
// --------------------------------------------------------------------------
const customer = {
    name: 'Almaz Bekele',
    city: 'Addis Ababa',
    balance: 1500
};

console.log('--- Exercise 2 ---');
for (const [key, value] of Object.entries(customer)) {
    console.log(`${key}: ${value}`);
}
console.log('------------------');

// --------------------------------------------------------------------------
// Exercise 3: Destructuring (Variable & Parameter)
// --------------------------------------------------------------------------
const { name, city } = customer;

function greet({ name, city = 'Addis Ababa' }) {
    return `Selam ${name} from ${city}!`;
}

console.log('--- Exercise 3 ---');
console.log(`Destructured: ${name}, living in ${city}`);
console.log(greet(customer));
console.log('------------------');

// --------------------------------------------------------------------------
// Exercise 4: Immutable Update using Object Spread
// --------------------------------------------------------------------------
const updatedCustomer = {
    ...customer,
    city: 'Bahir Dar',
    phone: '+251911223344'
};

console.log('--- Exercise 4 ---');
console.log('Original Customer:', customer);
console.log('Updated Customer Copy:', updatedCustomer);
console.log('Original Remains Unmutated:', customer.city === 'Addis Ababa');
console.log('------------------');