'use strict';

const expressions = [
    { expr: '"480" + 20', prediction: '"48020" (string)', actual: "480" + 20 },
    { expr: '"480" - 20', prediction: '460 (number)', actual: "480" - 20 },
    { expr: 'Number("480") + 20', prediction: '500 (number)', actual: Number("480") + 20 },
    { expr: 'typeof NaN', prediction: '"number"', actual: typeof NaN },
    { expr: '480 === "480"', prediction: 'false (boolean)', actual: 480 === "480" },
    { expr: '480 == "480"', prediction: 'true (boolean)', actual: 480 == "480" },
    { expr: 'Boolean(0)', prediction: 'false (boolean)', actual: Boolean(0) },
    { expr: 'Boolean("Addis")', prediction: 'true (boolean)', actual: Boolean("Addis") },
    { expr: '17 % 5', prediction: '2 (number)', actual: 17 % 5 },
    { expr: 'null === undefined', prediction: 'false (boolean)', actual: null === undefined }
];

console.log('--- Type Prediction & Evaluation Results ---');
for (const item of expressions) {
    const resultType = typeof item.actual;
    console.log(`Expression: ${item.expr}`);
    console.log(`  Predicted: ${item.prediction}`);
    console.log(`  Actual Value: ${item.actual} | typeof: ${resultType}`);
    console.log('-------------------------------------------');
}