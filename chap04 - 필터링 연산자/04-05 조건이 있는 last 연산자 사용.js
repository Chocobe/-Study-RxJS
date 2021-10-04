const { range } = require("rxjs");
const { last } = require("rxjs/operators");

range(1, 10).pipe(
  last(value => value <= 3),
).subscribe(value => console.log(`result: ${value}`));
