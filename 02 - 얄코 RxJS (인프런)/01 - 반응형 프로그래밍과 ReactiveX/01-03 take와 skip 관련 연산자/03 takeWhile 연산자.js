const { interval } = require("rxjs");
const { takeWhile } = require("rxjs/operators");

const obs$ = interval(500);
obs$.pipe(
  takeWhile(value => value < 10),
).subscribe(console.log);
