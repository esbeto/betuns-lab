// How to Read file contents with modern Node.js conventions
import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import { argv } from "node:process";
 
// [0: node path, 1: script path, ...rest: command args] = argv;
const [, , fileArg] = argv;

try {
  // import.meta.url is the file path of the current script
  const filePath = fileURLToPath(new URL(fileArg, import.meta.url));
  const fileData = await fs.readFile(filePath, "utf-8");
  console.log(fileData);
} catch (err) {
  console.error(err);
}

// Usage:
// node ./node-read-file.mjs input.text
