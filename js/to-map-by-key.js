// Simple map or dictionary by object key
function toDictionaryBy(items, key) {
  const result = {};
  for (const item of items) {
    result[item[key]] = item;
  }
  return result;
}

const options = [
  { id: "a1b2c3", value: 8 },
  { id: "b1c2d3", value: 0 },
  { id: "c1d2e3", value: 18 },
];

// Uses id as key for new dictionary
const dict = toDictionaryBy(options, "id");
console.log(dict);
// =>
//  {
//    a1b2c3: { id: 'a1b2c3', value: 8 },
//    b1c2d3: { id: 'b1c2d3', value: 0 },
//    c1d2e3: { id: 'c1d2e3', value: 18 }
//  }

// Useful for quick lookups without using Array.prototype.find
console.log(dict["b1c2d3"]);
// => { id: 'b1c2d3', value: 0 }
