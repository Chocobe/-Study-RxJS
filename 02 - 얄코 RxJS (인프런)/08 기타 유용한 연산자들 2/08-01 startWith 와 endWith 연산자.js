const { from } = require("rxjs");
const { startWith, endWith } = require("rxjs/operators");

const obs$ = from([1, 2, 3]).pipe(
  startWith(-2, -1, 0),
  endWith(4, 5, 6),
);

obs$.subscribe(console.log);
