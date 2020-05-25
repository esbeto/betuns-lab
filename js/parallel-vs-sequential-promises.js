//@ts-check

/** Chapter I: The Setup */

/**
 * setTimeout as Promise
 * @param {number} ms
 * @returns {Promise<any>}
 */
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * number as Promise that resolves after 1 second
 * @param {number} x
 * @returns {Promise<number>}
 */
async function p(x) {
  await timeout(1000); // wait 1 second
  return x;
}

/** Chapter 2: The Methods */

/**
 * Sequential should take values.length seconds
 * @param {number[]} values
 * @returns {Promise<number[]>}
 */
async function sequential(values) {
  let results = [];
  for (const val of values) {
    const result = await p(val);
    results = [...results, result];
  }
  return results;
}

/**
 * chunks should take ceil( length / size ) seconds
 * @param {number[]} values
 * @param {number} size - amount of promises to parse in parallel
 * @returns {Promise<number[]>}
 */
async function chunks(values, size) {
  const chunks = Array.from(
    Array(Math.ceil(values.length / (Math.abs(size) || 1))),
    (_, i) => values.slice(i * size, i * size + size)
  );

  let results = [];
  for (const chunk of chunks) {
    const result = await Promise.all(chunk.map((val) => p(val)))
    results = [...results, ...result];
  }
  return results;
}

/**
 * parallel should take 1 second
 * @param {number[]} values
 * @returns {Promise<number[]>}
 */
function parallel(values) {
  return Promise.all(values.map((val) => p(val)));
}

/** Chapter 3: The Findings */

async function main() {
  console.time("parallel");
  const pResults = await parallel([1, 2, 3, 4]);
  console.log("Parallel results", pResults);
  console.timeEnd("parallel"); // Should take aprox. 1 second

  console.time("chunks");
  const cResults = await chunks([1, 2, 3, 4], 2);
  console.log("Chunks results", cResults);
  console.timeEnd("chunks"); // Should take aprox. 2 seconds

  console.time("sequential");
  const sResults = await sequential([1, 2, 3, 4]);
  console.log("Sequential results", sResults);
  console.timeEnd("sequential"); // Should take aprox. 4 seconds
}

main();
