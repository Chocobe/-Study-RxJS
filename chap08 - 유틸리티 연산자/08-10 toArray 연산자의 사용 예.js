const { range } = require("rxjs");
const { filter, toArray } = require("rxjs/operators");

range(1, 30).pipe(
  filter(value => value % 2 === 0),
  toArray(),
).subscribe(arr => console.log(`배열여부: ${Array.isArray(arr)}, 값: ${arr}`));
