const { range } = require("rxjs");
const { takeLast } = require("rxjs/operators");

const obs$ = range(1, 20);
obs$.pipe(
  takeLast(5),
).subscribe(console.log);
