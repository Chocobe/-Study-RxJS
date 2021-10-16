const { range } = require("rxjs");
const { reduce } = require("rxjs/operators");

range(1, 4).pipe(
  reduce((acc, cur) => acc + cur),
).subscribe(result => console.log(`result: ${result}`));
