const { of } = require("rxjs");
const { reduce } = require("rxjs/operators");

of(0).pipe(
  reduce((acc, cur) => acc + cur),
).subscribe(result => console.log(`결과: ${result}`));
