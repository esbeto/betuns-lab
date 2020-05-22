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

  console.time("sequential");
  const sResults = await sequential([1, 2, 3, 4]);
  console.log("Sequential results", sResults);
  console.timeEnd("sequential"); // Should take aprox. 4 seconds
}

main();
