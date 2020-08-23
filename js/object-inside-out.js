// Similar to lodash's invert(object)
//
// Learn more about Object.fromEntries() at:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries

// Shallow insideOut
function insideOut(obj) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
}

console.log(insideOut({ a: 1, b: 2, c: 1 }));
// => { '1': 'c', '2': 'b' }

// Nested insideOut
function insideOutDeep(object) {
  return Object.entries(object).reduce((acc, [parentKey, parentValue]) => {
    // parentKey: 'FEE', parentValue { SEVEN: 10, PHARM: 8 }

    for (const [key, value] of Object.entries(parentValue)) {
      // key: 'SEVEN', value: 10

      acc[key] = acc[key] || {};
      acc[key][parentKey] = value;
    }
    return acc;
  }, {});
}

const options = {
  FEE: { SEVEN: 10, PHARM: 8 },
  MINIMUM: { SEVEN: 18, PHARM: 0 },
  MAXIMUM: { SEVEN: 10000, PHARM: 10000 },
};
console.log(insideOutDeep(options));
// => { SEVEN: { FEE: 10, MINIMUM: 18, MAXIMUM: 10000 },
//      PHARM: { FEE: 8, MINIMUM: 0, MAXIMUM: 10000 } }
