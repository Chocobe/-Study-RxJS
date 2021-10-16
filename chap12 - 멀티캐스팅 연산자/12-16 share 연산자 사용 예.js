const { interval } = require("rxjs");
const { take, tap, share } = require("rxjs/operators");

const source$ = interval(500).pipe(
  take(5),
  tap(value => console.log(`tap: ${value}`)),
  share(),
);

const a = source$.subscribe(result => console.log(`a: ${result}`));

setTimeout(() => {
  const b = source$.subscribe(result => console.log(`b: ${result}`));
}, 1000);

setTimeout(() => {
  console.log(`TIME OUT`);

  source$.subscribe(result => console.log(`c: ${result}`));
}, 3000);
