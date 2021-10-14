const { BehaviorSubject } = require("rxjs");

const behaviorSubject = new BehaviorSubject("초기값");

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

behaviorSubject.next("값1");
behaviorSubject.subscribe(observerB);

behaviorSubject.next("값2");
behaviorSubject.subscribe(observerC);

behaviorSubject.next("값3");
behaviorSubject.next("값4");
behaviorSubject.next("값5");
behaviorSubject.error(new Error("에러🐫"));

behaviorSubject.subscribe({
  next: r => console.log(`r: ${r}`),
  error: e => console.log(`r ERROR: ${e}`),
  complete: () => console.log(`r complete`),
});
