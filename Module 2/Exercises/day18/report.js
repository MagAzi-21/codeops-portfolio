/**
 * Calculates total ETB sum for a given transaction type ('credit' or 'debit').
 */
export const totalByType = (txns, targetType) =>
    txns
        .filter(t => t.type === targetType)
        .reduce((sum, { amount }) => sum + amount, 0);

/**
 * Returns formatted receipt strings using parameter destructuring and template literals.
 */
export const generateReceipts = txns =>
    txns.map(({ customer, amount, type }) => 
        `Receipt: [${type.toUpperCase()}] ${customer} - ${amount.toFixed(2)} ETB`
    );

/**
 * Immutably updates a transaction amount by ID using spread syntax.
 */
export const updateTransactionAmount = (txns, targetId, newAmount) =>
    txns.map(t => (t.id === targetId ? { ...t, amount: newAmount } : { ...t }));