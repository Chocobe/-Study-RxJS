const { BehaviorSubject, interval } = require("rxjs");
const { take, map } = require("rxjs/operators");

const behaviorSubject = new BehaviorSubject(0);

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

const observerC = {
  next: result => console.log(`observerC: ${result}`),
  error: error => console.log(`observerC ERROR: ${error}`),
  complete: () => console.log(`observerC: complete`),
};

behaviorSubject.subscribe(observerA);
behaviorSubject.subscribe(observerB);

interval(1000).pipe(
  take(5),
  map(() => behaviorSubject.value + 1),  
).subscribe(behaviorSubject);

setTimeout(() => behaviorSubject.subscribe(observerC), 3200);
