const { of, interval } = require("rxjs");
const { timeoutWith, timeout, delay, scan, map } = require("rxjs/operators");

const obs$ = of(10, 20, 30, 40, 50);

// obs$.pipe(
//   delay(3000),
//   timeoutWith(2000, interval(1000)),
//   scan(acc => ++acc),
// ).subscribe(console.log);

obs$.pipe(
  delay(3000),
  timeout({ each: 2000 , with: () => interval(1000).pipe(
    scan(acc => ++acc, 1000),
    map(value => `timeout됨: ${value}`),
  ) }),
).subscribe(console.log);
