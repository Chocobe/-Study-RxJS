const { interval } = require("rxjs");
const { skipWhile, map } = require("rxjs/operators");

const obs$ = interval(500);
obs$.pipe(
  map(value => value % 10),
  skipWhile(value => value < 5),
).subscribe(console.log);
