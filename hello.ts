function assertIntegerInRange(
  value: number,
  name: string,
  minimum: number,
): void {
  if (!Number.isInteger(value) || value < minimum) {
    throw new RangeError(`${name} must be an integer greater than or equal to ${minimum}`);
  }
}

/**
 * Returns the nth Fibonacci number.
 *
 * The sequence is zero-indexed: fib(0) is 0, fib(1) is 1, and fib(10) is 55.
 *
 * @param n - Zero-based Fibonacci index.
 * @returns The Fibonacci number at index n.
 * @throws {RangeError} When n is not an integer greater than or equal to 0.
 */
export function fib(n: number): number {
  assertIntegerInRange(n, "n", 0);

  if (n < 2) {
    return n;
  }

  let previous = 0;
  let current = 1;

  for (let i = 2; i <= n; i += 1) {
    const next = previous + current;
    previous = current;
    current = next;
  }

  return current;
}

/**
 * Returns the nth prime number.
 *
 * The sequence is one-indexed: nthPrime(1) is 2, nthPrime(2) is 3, and
 * nthPrime(10) is 29.
 *
 * @param n - One-based prime number index.
 * @returns The prime number at position n.
 * @throws {RangeError} When n is not an integer greater than or equal to 1.
 */
export function nthPrime(n: number): number {
  assertIntegerInRange(n, "n", 1);

  const isPrime = (candidate: number): boolean => {
    if (candidate < 2) {
      return false;
    }

    for (let divisor = 2; divisor * divisor <= candidate; divisor += 1) {
      if (candidate % divisor === 0) {
        return false;
      }
    }

    return true;
  };

  let count = 0;
  let candidate = 1;

  while (count < n) {
    candidate += 1;
    if (isPrime(candidate)) {
      count += 1;
    }
  }

  return candidate;
}

if (import.meta.main) {
  console.log({
    fib10: fib(10),
    prime10: nthPrime(10),
  });
}
