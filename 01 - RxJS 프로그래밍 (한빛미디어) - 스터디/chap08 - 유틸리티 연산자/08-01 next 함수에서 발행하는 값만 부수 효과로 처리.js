const { range } = require("rxjs");
const { tap, filter, map } = require("rxjs/operators");

range(1, 10).pipe(
  tap(value => console.log(`Stream 1 (range 1, 10): ${value}`)),
  filter(value => value % 2 === 0),
  tap(value => console.log(`\tStream 2 (filter value % 2 === 0): ${value}`)),
  map(value => ++value),
  tap(value => console.log(`\t\tStream 3 (map value + 1 ): ${value}`)),
).subscribe(result => console.log(`result: ${result}\n`));
