const { range } = require("rxjs");
const { first } = require("rxjs/operators");

range(1, 10).pipe(
  first(value => value >= 3),
).subscribe(value => console.log(`result: ${value}`));
