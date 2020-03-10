import { SingletonInstanceReturn } from "./singleton-instance-return.ts";
import { foo } from "./singleton-instance-export.ts";

// Doesn't matter how many instances you try to create
const one = new SingletonInstanceReturn();
const two = new SingletonInstanceReturn();
const three = new SingletonInstanceReturn();

console.log('---')

// These three should log the same url
one.bar();
two.bar();
three.bar();

console.log('---')

// Because `foo` is an exported instance
// These three should log the same url
foo.bar();
foo.bar();
foo.bar();
