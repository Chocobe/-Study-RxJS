const { interval } = require("rxjs");
const { take, tap, share } = require("rxjs/operators");

const obs$ = interval(500).pipe(
  take(20),
  tap(value => console.log(`Side Effect: ${value}`)),
  share(),
);

obs$.subscribe({
  next: value => console.log(`* 옵저버 1: ${value}`),
});

setTimeout(() => {
  obs$.subscribe({
    next: value => console.log(`** 옵저버 2: ${value}`),
  });
}, 2000);

setTimeout(() => {
  obs$.subscribe({
    next: value => console.log(`*** 옵저버 3: ${value}`),
  });
}, 4000);
