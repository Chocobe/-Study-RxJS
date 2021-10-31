const { range } = require("rxjs");
const { filter, toArray } = require("rxjs/operators");

const obs$ = range(1, 50);
obs$.pipe(
  filter(value => value % 3 === 0),
  filter(value => value % 2 === 1),
  toArray(),
).subscribe(console.log);
