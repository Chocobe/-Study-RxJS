const { interval, timer } = require("rxjs");
const { takeUntil, defaultIfEmpty } = require("rxjs/operators");

const obs$ = interval(3000).pipe(
  takeUntil(timer(2000)),
  defaultIfEmpty("NO Value"),
);

obs$.subscribe(console.log);
