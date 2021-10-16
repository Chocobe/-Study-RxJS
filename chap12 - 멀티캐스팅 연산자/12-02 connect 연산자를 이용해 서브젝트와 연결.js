const { interval, Subject } = require("rxjs");
const { take, tap } = require("rxjs/operators");

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

const createHotObservable = (sourceObservable$, subject) => ({
  connect: () => sourceObservable$.subscribe(subject),
  subscribe: subject.subscribe.bind(subject),
});

const sourceObservable$ = interval(500).pipe(
  take(5),
  tap(value => console.log(`tap: ${value}`)),
);

const mySubject = new Subject();

const hotObservable$ = createHotObservable(sourceObservable$, mySubject);

hotObservable$.subscribe(observerA);
console.log(`observerA subscribe`);

hotObservable$.subscribe(observerB);
console.log(`observerB subscribe`);

hotObservable$.connect();

setTimeout(() => {
  console.log(`observerC subscribe (1000ms)`);
  hotObservable$.subscribe(observerC);
}, 1000);
