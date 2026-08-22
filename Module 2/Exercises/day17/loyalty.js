'use strict';

/**
 * Creates an isolated customer loyalty card instance.
 * @param {Function} earnRule - Pure function determining points earned per ETB.
 */
function createLoyalty(earnRule = etb => Math.floor(etb / 10)) {
    // Private variable preserved via closure
    let points = 0;

    return {
        earn(etb) {
            if (typeof etb !== 'number' || etb <= 0) return 0;
            const earned = earnRule(etb);
            points += earned;
            return earned;
        },
        redeem(amount) {
            if (typeof amount !== 'number' || amount <= 0) return 0;
            const redeemed = Math.min(points, amount);
            points = Math.max(0, points - amount);
            return redeemed;
        },
        balance() {
            return points;
        }
    };
}

// --------------------------------------------------------------------------
// Module Demonstration
// --------------------------------------------------------------------------
console.log('--- TeleBirr Shop Loyalty Program Demo ---');

// Standard Customer Card (1 point per 10 ETB)
const standardCard = createLoyalty();
standardCard.earn(250); // +25 points
console.log('Standard Card balance after spending 250 ETB:', standardCard.balance()); // 25

standardCard.redeem(10); // Redeems 10 points
console.log('Standard Card balance after redeeming 10 points:', standardCard.balance()); // 15

standardCard.redeem(50); // Attempts over-redeem; bounds to zero
console.log('Standard Card balance after over-redeeming 50 points:', standardCard.balance()); // 0

// Holiday Promotion Card (Double points: 2 points per 10 ETB)
const holidayRule = etb => Math.floor(etb / 10) * 2;
const holidayCard = createLoyalty(holidayRule);

holidayCard.earn(250); // +50 points
console.log('Holiday Card balance after spending 250 ETB (Double Rule):', holidayCard.balance()); // 50

// Verification of Independent Private Scopes
console.log('Re-checking Standard Card balance (remains isolated):', standardCard.balance()); // 0