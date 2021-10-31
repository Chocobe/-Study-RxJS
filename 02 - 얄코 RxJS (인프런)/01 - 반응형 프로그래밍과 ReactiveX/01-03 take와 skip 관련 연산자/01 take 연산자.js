const { range } = require("rxjs");
const { filter, take } = require("rxjs/operators");

const obs$ = range(1, 50);
obs$.pipe(
  filter(value => value % 2 === 0),
  take(5),
).subscribe(console.log);
