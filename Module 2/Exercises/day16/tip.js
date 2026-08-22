'use strict';

// Sample Inputs
const billRaw = '480';
const partySize = 4;
const paymentMethod = 'telebirr'; // Options: 'telebirr', 'cbebirr', 'awash', 'cash'

// 1. Explicit Type Conversion
const bill = Number(billRaw);

// 2. Tiered Tip Calculation via Ternary: 10% if over 300 ETB, else 5%
const tip = bill > 300 ? bill * 0.10 : bill * 0.05;

// 3. Payment Service Fee via switch
let serviceFee = 0;
switch (paymentMethod.toLowerCase()) {
    case 'telebirr':
        serviceFee = bill * 0.005; // 0.5%
        break;
    case 'cbebirr':
    case 'awash':
        serviceFee = bill * 0.01; // 1%
        break;
    case 'cash':
    default:
        serviceFee = 0;
        break;
}

// 4. Compute Totals
const subtotalWithTip = bill + tip;
const grandTotal = subtotalWithTip + serviceFee;
const perPerson = grandTotal / partySize;

// 5. Output via Template Literals
console.log(`--- Habesha Eatery Bill Summary ---`);
console.log(`Initial Bill: ${bill.toFixed(2)} ETB`);
console.log(`Tip Applied: ${tip.toFixed(2)} ETB`);
console.log(`Payment Method (${paymentMethod}): Service Fee ${serviceFee.toFixed(2)} ETB`);
console.log(`Grand Total: ${grandTotal.toFixed(2)} ETB`);
console.log(`Split for ${partySize} guests: ${perPerson.toFixed(2)} ETB each`);