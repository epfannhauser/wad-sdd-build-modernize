import assert from "node:assert/strict";
import test from "node:test";

import { fib, nthPrime } from "./hello.ts";

test("fib returns known Fibonacci numbers", () => {
  assert.equal(fib(0), 0);
  assert.equal(fib(1), 1);
  assert.equal(fib(2), 1);
  assert.equal(fib(10), 55);
});

test("fib validates the index", () => {
  assert.throws(() => fib(-1), RangeError);
  assert.throws(() => fib(1.5), RangeError);
});

test("nthPrime returns known prime numbers", () => {
  assert.equal(nthPrime(1), 2);
  assert.equal(nthPrime(2), 3);
  assert.equal(nthPrime(5), 11);
  assert.equal(nthPrime(10), 29);
});

test("nthPrime validates the index", () => {
  assert.throws(() => nthPrime(0), RangeError);
  assert.throws(() => nthPrime(2.5), RangeError);
});
