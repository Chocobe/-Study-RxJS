const { range } = require("rxjs");
const { reduce } = require("rxjs/operators");

range(1, 4).pipe(
  reduce((acc, cur) => acc + cur, 1),
).subscribe(result => console.log(`result: ${result}`));
