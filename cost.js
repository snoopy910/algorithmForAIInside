const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(``, (original) => {
  rl.question(``, (target) => {
    console.log();
    getCost(original, target);
    rl.close();
  });
});

const getCost = (A, B) => {
  let n = A.length,
    m = B.length;
  let dp = [],
    track = [];
  for (let i = 0; i <= n; i++) {
    let tmp = new Array(m + 1),
      tmp1 = new Array(m + 1);
    dp.push(tmp);
    track.push(tmp1);
  }
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (i == 0 && j == 0) {
        dp[0][0] = 0;
        continue;
      }

      if (i == 0) {
        dp[i][j] = dp[i][j - 1] + 2;
        track[i][j] = ["insert", i, j - 1];
      } else if (j == 0) {
        dp[i][j] = dp[i - 1][j] + 3;
        track[i][j] = ["delete", i - 1, j];
      } else {
        dp[i][j] = dp[i - 1][j - 1] + (A[i - 1] != B[j - 1] ? 1 : 0);

        if (A[i - 1] == B[j - 1]) track[i][j] = ["none", i - 1, j - 1];
        else track[i][j] = ["replace", i - 1, j - 1];

        if (dp[i][j] > dp[i][j - 1] + 2) {
          dp[i][j] = dp[i][j - 1] + 2;
          track[i][j] = ["insert", i, j - 1];
        }

        if (dp[i][j] > dp[i - 1][j] + 3) {
          dp[i][j] = dp[i - 1][j] + 3;
          track[i][j] = ["delete", i - 1, j];
        }
      }
    }
  }
  let a = n,
    b = m,
    aa,
    bb,
    cur;
  let rlt = [];
  while (a > 0 || b > 0) {
    (aa = a), (bb = b);
    if (track[aa][bb][0] == "none") {
      a = track[aa][bb][1];
      b = track[aa][bb][2];
      continue;
    }
    if (track[aa][bb][0] == "replace") {
      cur = "replace: " + A[aa - 1].toString() + " -> " + B[bb - 1].toString();
      a = track[aa][bb][1];
      b = track[aa][bb][2];
    }
    if (track[aa][bb][0] == "insert") {
      cur = "insert: " + B[bb - 1].toString();
      a = track[aa][bb][1];
      b = track[aa][bb][2];
    }
    if (track[aa][bb][0] == "delete") {
      cur = "delete: " + A[aa - 1].toString();
      a = track[aa][bb][1];
      b = track[aa][bb][2];
    }
    rlt.unshift(cur);
  }
  rlt.forEach((value) => console.log(value));
  console.log("cost:", dp[n][m]);
  return dp[n][m];
};
