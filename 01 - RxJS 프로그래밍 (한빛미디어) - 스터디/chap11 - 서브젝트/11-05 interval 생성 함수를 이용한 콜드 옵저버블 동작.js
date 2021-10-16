const { interval } = require("rxjs");
const { take } = require("rxjs/operators");

const intervalSource$ = interval(500).pipe(
  take(5),
);

const observerA = {
  next: result => console.log(`observerA: ${result}`),
  error: error => console.log(`observerA ERROR: ${error}`),
  complete: () => console.log(`observerA: complete`),
};

const observerB = {
  next: result => console.log(`observerB: ${result}`),
  error: error => console.log(`observerB ERROR: ${error}`),
  complete: () => console.log(`observerB: complete`),
};

intervalSource$.subscribe(observerA);
setTimeout(() => intervalSource$.subscribe(observerB), 2000);