const { interval, BehaviorSubject } = require("rxjs");
const { groupBy, take, mergeMap, map, tap, reduce } = require("rxjs/operators");

interval(500).pipe(
  take(10),
  groupBy(
    () => Math.random() < 0.7,
    value => `${value}-${value % 2 === 0 ? "짝수" : "홀수"}`,
    groupedObservable => groupedObservable.key === true
      ? interval(600).pipe(
        tap(value => console.log(`당첨 duration ${value}`)),
      )
      : interval(2000).pipe(
        tap(value => console.log(`꽝 duration ${value}`)),
      ),
    () => new BehaviorSubject("GROUP START"),
  ),
  mergeMap(groupedObservable => groupedObservable.key === true
    ? groupedObservable.pipe(
      map(value => `당첨!! ${value}`),
      reduce((acc, curr) => [...acc, curr], []),
    )
    : groupedObservable.pipe(
      map(value => `꽝?? ${value}`),
      reduce((acc, curr) => [...acc, curr], []),
    ),
  ),
).subscribe(result => console.log(result));
