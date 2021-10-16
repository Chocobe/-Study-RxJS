const { ReplaySubject, interval } = require("rxjs");
const { take } = require("rxjs/operators");

const intervalSource$ = interval(500).pipe(
  take(8),
);

const replaySubject = new ReplaySubject();

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

console.log("replaySubject 구독: 옵저버A");
replaySubject.subscribe(observerA);

console.log("intervalSource$ 구독: replaySubject");
intervalSource$.subscribe(replaySubject);

setTimeout(() => {
  console.log("replaySubject 구독: 옵저버B");
  replaySubject.subscribe(observerB);
}, 2600);
