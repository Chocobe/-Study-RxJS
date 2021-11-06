const { interval } = require("rxjs");
const { take, concatMap, map } = require("rxjs/operators");

const obs$ = interval(1000).pipe(
  take(3),
  concatMap(i => interval(Math.floor(Math.random() * 1000)).pipe(
    take(3),
    map(j => `[${i}-${j}]`),
  )),
);

obs$.subscribe(console.log);
