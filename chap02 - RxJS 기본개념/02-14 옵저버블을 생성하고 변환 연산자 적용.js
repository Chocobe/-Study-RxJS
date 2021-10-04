const { Observable } = require("rxjs");
const { map } = require("rxjs/operators");

const observableCreated$ = Observable.create(observer => {
  observer.next(1);
  observer.next(2);
  observer.complete();
});

observableCreated$.pipe(
  map(value => value * 2),
).subscribe({
  next: value => {
    console.log(`observerA: ${value}`);
  },

  error: error => {
    console.log(`observerA: ${error}`);
  },

  complete: () => {
    console.log("observerA: complete");
  },
});