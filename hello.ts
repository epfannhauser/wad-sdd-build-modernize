// returns the nth Fibonacci number
function fib(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n must be a non-negative integer");
  }

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

// returns the nth prime
function nthPrime(n: number): number {
  if (!Number.isInteger(n) || n < 1) {
    throw new Error("n must be a positive integer");
  }

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

console.log({
  fib10: fib(10),
  prime10: nthPrime(10),
});
