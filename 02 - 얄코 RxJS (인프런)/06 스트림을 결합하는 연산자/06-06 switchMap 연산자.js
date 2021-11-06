const { interval } = require("rxjs");
const { take, switchMap, map } = require("rxjs/operators");

const obs$ = interval(1000).pipe(
  take(3),
  switchMap(i => interval(Math.floor(Math.random() * 3000)).pipe(
    take(3),
    map(j => `[${i}-${j}]`),
  )),
);

obs$.subscribe(console.log);
