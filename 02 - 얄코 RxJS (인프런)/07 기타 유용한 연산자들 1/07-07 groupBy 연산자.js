const { interval } = require("rxjs");
const { take, groupBy, mergeMap, toArray } = require("rxjs/operators");

const obs$ = interval(100).pipe(
  take(50),
  groupBy(value => value % 3),
  mergeMap(groups$ => groups$.pipe(
    toArray(),
  )),
);

obs$.subscribe(console.log);
