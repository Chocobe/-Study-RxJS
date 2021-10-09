const { interval } = require("rxjs");
const { groupBy, take, mergeMap, map } = require("rxjs/operators");

interval(500).pipe(
  take(10),
  groupBy(
    () => Math.random() < 0.7,
    value => `${value}-${value % 2 === 0 ? "짝수" : "홀수" }`,
  ),
  mergeMap(groupedObservable => groupedObservable.key === true
    ? groupedObservable.pipe(map(value => `당첨: ${value}`))
    : groupedObservable.pipe(map(value => `꽝.... ${value}`)),
  ),
).subscribe(result => console.log(`결과: ${result}`));
