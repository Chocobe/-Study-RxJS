const { interval } = require("rxjs");
const { skipWhile, take } = require("rxjs/operators");

interval(300).pipe(
  skipWhile(value => value < 4),
  take(3),
).subscribe(value => console.log(`result: ${value}`));
