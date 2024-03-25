const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`n: `, (n) => {
  rl.question(`m: `, (m) => {
    const checkedValues = palindromicPrimeToDecimal(n, m);
    checkedValues.map((value) => {
      console.log(value);
    });
    rl.close();
  });
});

// Implement Seive of Atkin to find the primes in the limitation
function sieveOfAtkin(limit) {
  let primes = [];
  let isPrime = new Array(limit + 1).fill(false);
  let sqrtLimit = Math.sqrt(limit) + 1;

  for (let x = 1; x < sqrtLimit; x++) {
    for (let y = 1; y < sqrtLimit; y++) {
      let n = 4 * x * x + y * y;
      if (n <= limit && (n % 12 === 1 || n % 12 === 5)) {
        isPrime[n] = !isPrime[n];
      }

      n = 3 * x * x + y * y;
      if (n <= limit && n % 12 === 7) {
        isPrime[n] = !isPrime[n];
      }

      n = 3 * x * x - y * y;
      if (x > y && n <= limit && n % 12 === 11) {
        isPrime[n] = !isPrime[n];
      }
    }
  }

  for (let n = 5; n < sqrtLimit; n++) {
    if (isPrime[n]) {
      for (let k = n * n; k <= limit; k += n * n) {
        isPrime[k] = false;
      }
    }
  }

  primes.push(2, 3);
  for (let n = 5; n <= limit; n++) {
    if (isPrime[n]) {
      primes.push(n);
    }
  }

  return primes;
}

function checkPalindrome(numString) {
  if (numString.length === 1) return false;
  return numString.split("").reverse().join("") == numString;
}

function palindromicPrimeToDecimal(limit, decimal) {
  const primeToDecimal = sieveOfAtkin(limit).map((value) =>
    value.toString(decimal)
  );

  const palindromicPrimeToDecimal = primeToDecimal.filter((value) => {
    return checkPalindrome(value);
  });

  return palindromicPrimeToDecimal;
}
