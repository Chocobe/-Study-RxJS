const { interval, zip } = require("rxjs");
const { take, tap } = require("rxjs/operators");

interval(1500).pipe(
  take(6),
).subscribe(result => console.log(`${(result + 1) * 1500}ms elapsed`));

const sourceObservable$ = interval(1500).pipe(
  take(5),
  tap(value => console.log(`tap: ${value}`)),
);

zip(
  sourceObservable$, 
  sourceObservable$, 
  (a, b) => `(${a}, ${b})`,
).subscribe(result => console.log(`value: ${result}`));
