const { range } = require("rxjs");
const { startWith, scan } = require("rxjs/operators");

range(4, 3).pipe(
  startWith(1, 2, 3),
  scan((acc, cur) => acc + cur, 0),
).subscribe(result => console.log(`range(4, 3).pipe(startWith(1, 2, 3) sum: ${result})`));

range(4, 3).pipe(
  scan((acc, cur) => acc + cur, 0),
).subscribe(result => console.log(`range(4, 3) sum: ${result}`));
