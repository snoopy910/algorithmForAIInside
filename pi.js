const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Input Number: `, (num) => {
  const indexes = findIndexInPI(num);
  console.log(`${num} =>`, indexes[0]);
  console.log(`${num.split("").reverse().join("")} =>`, indexes[1]);
  rl.close();
});

// Build Pi of the length of n
function findPI(n) {
  let i = 1n;
  let x = 3n * 10n ** (BigInt(n) + 20n);
  let pi = x;

  while (x > 0) {
    x = (x * i) / ((i + 1n) * 4n);
    pi += x / (i + 2n);
    i += 2n;
  }
  return (pi / 10n ** 20n).toString(10);
}

// Knuth-Morris-Pratt (KMP) algorithm to find a string match in a long string
function buildPartialMatchTable(pattern) {
  const table = [0];
  let prefix = 0;

  for (let i = 1; i < pattern.length; i++) {
    while (prefix > 0 && pattern.charAt(i) !== pattern.charAt(prefix)) {
      prefix = table[prefix - 1];
    }
    if (pattern.charAt(i) === pattern.charAt(prefix)) {
      prefix++;
    }
    table[i] = prefix;
  }

  return table;
}

function kmpSearch(text, pattern) {
  const table = buildPartialMatchTable(pattern);
  let textIndex = 0;
  let patternIndex = 0;

  while (textIndex < text.length) {
    if (text.charAt(textIndex) === pattern.charAt(patternIndex)) {
      textIndex++;
      patternIndex++;

      if (patternIndex === pattern.length) {
        return textIndex - patternIndex;
      }
    } else if (patternIndex > 0) {
      patternIndex = table[patternIndex - 1];
    } else {
      textIndex++;
    }
  }

  return -1;
}

function findIndexInPI(num) {
  let flag = 0,
    index = -1,
    indexRevert = -1,
    Pi = "";
  while (index === -1 || indexRevert === -1) {
    flag++;
    Pi = findPI(10000 * flag);
    index = kmpSearch(Pi, num);
    indexRevert = kmpSearch(Pi, num.split("").reverse().join(""));
  }
  return [index, indexRevert];
}
