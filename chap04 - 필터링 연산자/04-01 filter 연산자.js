const { range } = require("rxjs");
const { filter } = require("rxjs/operators");

range(1, 5).pipe(
  filter(value => value % 2 === 0),
).subscribe(value => console.log(`result: ${value}`));