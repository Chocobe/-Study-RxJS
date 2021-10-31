const { of } = require("rxjs");
const { reduce, scan } = require("rxjs/operators");

const obs$ = of(1, 2, 3, 4, 5);

// obs$.pipe(
//   reduce((acc, value) => acc + value, 0),
// ).subscribe(console.log);

obs$.pipe(
  scan((acc, value) => acc + value, 0),
).subscribe(console.log);
