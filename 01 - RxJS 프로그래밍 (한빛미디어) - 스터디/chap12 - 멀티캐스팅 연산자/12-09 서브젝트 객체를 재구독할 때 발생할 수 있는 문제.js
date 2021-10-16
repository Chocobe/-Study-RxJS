const { interval } = require("rxjs");
const { take, tap, publish } = require("rxjs/operators");

const source$ = interval(500).pipe(
  take(5),
  tap(value => console.log(`tap: ${value}`)),
  publish(),
);

const a = source$.subscribe(result => console.log(`a: ${result}`));
const b = source$.subscribe(result => console.log(`b: ${result}`));

source$.connect();

setTimeout(() => {
  console.log(`TIME OUT`);
  a.unsubscribe();
  b.unsubscribe();

  source$.subscribe(result => console.log(`c: ${result}`));
  source$.connect();
}, 3000);
