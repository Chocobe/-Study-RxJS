const { interval, timer } = require("rxjs");
const { skipUntil } = require("rxjs/operators");

const skipTimer = timer(2000);
const obs$ = interval(500);

obs$.pipe(
  skipUntil(skipTimer),
).subscribe(console.log);
