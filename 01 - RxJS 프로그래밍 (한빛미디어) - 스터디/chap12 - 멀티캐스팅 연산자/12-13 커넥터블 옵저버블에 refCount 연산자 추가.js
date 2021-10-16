const { interval } = require("rxjs");
const { take, tap, publish, refCount } = require("rxjs/operators");

const source$ = interval(500).pipe(
  take(5),
  tap(value => console.log(`tap: ${value}`)),
  publish(),
  refCount(),
);

const a = source$.subscribe(result => console.log(`a: ${result}`));
const b = source$.subscribe(result => console.log(`b: ${result}`));

setTimeout(() => {
  console.log(`TIME OUT`);
  source$.subscribe(result => console.log(`c: ${result}`));
}, 3000);
