import { transactions } from './transactions.js';
import { totalByType, generateReceipts, updateTransactionAmount } from './report.js';

console.log('==============================================');
console.log('      TELEBIRR MERCHANT TRANSACTION REPORT    ');
console.log('==============================================\n');

// 1. Calculate Aggregations
const totalCredits = totalByType(transactions, 'credit');
const totalDebits = totalByType(transactions, 'debit');
const netSettlement = totalCredits - totalDebits;

console.log('--- Summary Metrics ---');
console.log(`Total Inflow (Credits):  ${totalCredits.toFixed(2)} ETB`);
console.log(`Total Outflow (Debits):  ${totalDebits.toFixed(2)} ETB`);
console.log(`Net Settlement Balance:  ${netSettlement.toFixed(2)} ETB\n`);

// 2. Formatted Receipts via map + destructuring
console.log('--- Itemized Transaction Log ---');
const receipts = generateReceipts(transactions);
receipts.forEach(receipt => console.log(receipt));

// 3. Immutable Update Demonstration
console.log('\n--- Immutable Correction Demo ---');
const correctedList = updateTransactionAmount(transactions, 103, 300);
console.log('Original Transaction #103 Amount:', transactions.find(t => t.id === 103).amount, 'ETB');
console.log('Corrected Transaction #103 Amount:', correctedList.find(t => t.id === 103).amount, 'ETB');
console.log('Original Dataset Untouched:', transactions[2].amount === 180);