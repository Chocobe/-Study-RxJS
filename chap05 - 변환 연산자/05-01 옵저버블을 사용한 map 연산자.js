const { from } = require("rxjs");
const { map } = require("rxjs/operators");

const source$ = from([1, 2, 3, 4, 5]);
const resultSource$ = source$.pipe(
  map(value => value + 1),
  map(value => value * 2),
);

resultSource$.subscribe(value => console.log(`result: ${value}`));
