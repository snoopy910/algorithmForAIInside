const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Input number: `, (num) => {
  if (num < 0) {
    console.log("Number must be over 0!");
  } else {
    console.log(getSum(num, 0));
  }
  rl.close();
});

const getSum = (num, step) => {
  let a = Number.parseInt(num);
  let sum = a,
    n = num.length,
    ss = 0;
  for (let i = n - 1; i > 0; i--) {
    ss = Number.parseInt(num.substr(i - n));
    sum += Math.pow(2, i - 1) * ss;
  }
  sum = sum * Math.pow(2, step > 0 ? step - 1 : 0);
  if (n > 1) sum += getSum(num.substr(0, n - 1), step + 1);
  return sum;
};
