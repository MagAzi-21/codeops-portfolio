import { VAT, addVat } from './money.js';

const basePrice = 500;
console.log(`VAT Rate: ${VAT * 100}%`);
console.log(`Price (${basePrice} ETB) with VAT: ${addVat(basePrice).toFixed(2)} ETB`);