const { AsyncSubject, interval } = require("rxjs");
const { take, scan, pluck, tap } = require("rxjs/operators");

const n = 8;
const period = 500;

const fibonacci = n => period => interval(period).pipe(
  take(n),
  scan((acc, cur) => acc
    ? { lhs: acc.rhs, rhs: acc.lhs + acc.rhs }
    : { lhs: 0, rhs: 1 }
  , null),
  pluck("lhs"),
  tap(lhs => console.log(lhs)),
);

const asyncSubject = new AsyncSubject();
fibonacci(n)(period).subscribe(asyncSubject);

asyncSubject.subscribe(result => console.log(`첫번째 구독 결과: ${result}`));

setTimeout(() => asyncSubject.subscribe(result => console.log(`두번째 구독 결과: ${result}`)), period * n + 2000);
