const { interval } = require("rxjs");
const { take, map, mergeAll } = require("rxjs/operators");

const obs$ = interval(1000).pipe(
  take(3),
  map(i => interval(Math.floor(Math.random() * 1000)).pipe(
    take(3),
    map(j => `[${i}-${j}]`),
  )),
  mergeAll(),
)

obs$.subscribe(console.log);
