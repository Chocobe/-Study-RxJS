const { interval } = require("rxjs");
const { take, map, mergeMap } = require("rxjs/operators");

const obs$ = interval(1000).pipe(
  take(3),
  mergeMap(i => interval(Math.floor(Math.random() * 1000)).pipe(
    take(3),
    map(j => `[${i}-${j}]`),
  )),
)

obs$.subscribe(console.log);
