const { combineLatest, from, of } = require("rxjs");
const { map, delay, mergeMap } = require("rxjs/operators");

const obs$ = combineLatest([
    from([1000, 2000, 3000]).pipe(
      mergeMap(value => of(value).pipe(
        delay(value),
      )),
    ),
    from(["A", "B"]).pipe(
      mergeMap(value => of(value).pipe(
        delay(1500),
      )),
    ),
]);

obs$.subscribe(console.log);
