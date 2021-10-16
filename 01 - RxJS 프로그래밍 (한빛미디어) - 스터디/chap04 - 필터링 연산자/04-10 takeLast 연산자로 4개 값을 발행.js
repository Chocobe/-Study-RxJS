const { interval } = require("rxjs");
const { filter, takeWhile, takeLast } = require("rxjs/operators");

interval(300).pipe(
  filter(value => value >= 7 || value % 2 === 0),
  takeWhile(value => value <= 10),
  takeLast(5),
).subscribe(value => console.log(`result: ${value}`));
