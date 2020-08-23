// Simple map by object key (typed)
function toMapByKey<T extends Record<K, PropertyKey>, K extends Extract<keyof T, string>>(
  items: T[],
  key: K
) {
  const result: Map<T[K], T> = new Map();
  for (const item of items) {
    result.set(item[key], item)
  }
  return result;
}

const options = [
  { id: "a1b2c3", value: 8 },
  { id: "b1c2d3", value: 0 },
  { id: "c1d2e3", value: 18 },
];


// Uses id as key for new dictionary
const dict = toMapByKey(options, "id");
//  const dict: Map<string, {
//    id: string;
//    value: number;
//  }>

console.log(dict);
// =>
//  {
//    a1b2c3: { id: 'a1b2c3', value: 8 },
//    b1c2d3: { id: 'b1c2d3', value: 0 },
//    c1d2e3: { id: 'c1d2e3', value: 18 }
//  }
