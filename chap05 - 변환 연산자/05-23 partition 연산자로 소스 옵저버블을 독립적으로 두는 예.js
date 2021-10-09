const { partition, interval } = require("rxjs");
const { map, take } = require("rxjs/operators");

const interval$ = interval(500);

const [ win$, lose$ ] = partition(
  interval$,
  () => Math.random() < 0.7,
);

win$.pipe(
  take(10),
  map(value => `당첨: ${value}`),
).subscribe(result => console.log(`*** ${result}`));

lose$.pipe(
  take(10),
  map(value => `꽝..: ${value}`),
).subscribe(result => console.log(`___ ${result}`));
