const { interval } = require("rxjs");
const { filter, takeWhile } = require("rxjs/operators");

interval(300).pipe(
  filter(value => value >= 7 || value % 2 === 0),
  takeWhile(value => value <= 10),
).subscribe(value => console.log(`result: ${value}`));
