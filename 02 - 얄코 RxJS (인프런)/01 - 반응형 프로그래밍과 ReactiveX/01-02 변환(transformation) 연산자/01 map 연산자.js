const { of } = require("rxjs");
const { map } = require("rxjs/operators");

const obs$ = of(1, 2, 3, 4, 5)
obs$.pipe(
  map(value => Math.pow(value, 2)),
).subscribe(console.log);
