const { interval } = require("rxjs");
const { skipLast } = require("rxjs/operators");

const obs$ = interval(500);
obs$.pipe(
  skipLast(5),
).subscribe(console.log);
