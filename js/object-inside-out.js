// Similar to lodash's invert(object)
//
// Learn more about Object.fromEntries() at:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries

function insideOut(obj) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
}

console.log(insideOut({a: 1, b: 2, c: 1}));
// => { '1': 'c', '2': 'b' }
