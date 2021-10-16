const { Subject } = require("rxjs");

const mySubject = new Subject();

const observerA = {
  next: result => console.log(`observerA: ${result}`),
  error: error => console.log(`observerA ERROR: ${error}`),
  complete: () => console.log(`observerA: complete`),
};

const observerB = {
  next: result => console.log(`observerB: ${result}`),
  error: error => console.log(`observerB: ${error}`),
  complete: () => console.log(`observerB: complete`),
};

const observerC = {
  next: result => console.log(`observerC: ${result}`),
  error: error => console.log(`observerB: ${error}`),
  complete: () => console.log(`observerC: complete`),
};

mySubject.subscribe(observerA);
mySubject.subscribe(observerB);
mySubject.subscribe(observerC);

mySubject.complete();
mySubject.next(3);
mySubject.error(new Error("에러 발생~~~~"));
