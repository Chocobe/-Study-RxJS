const { of } = require("rxjs");
const { reduce } = require("rxjs/operators");

of(0).pipe(
  reduce((acc, cur) => acc + cur, 1),
).subscribe(result => console.log(`result: ${result}`));
