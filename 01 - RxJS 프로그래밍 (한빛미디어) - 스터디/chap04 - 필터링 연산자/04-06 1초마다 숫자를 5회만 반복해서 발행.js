const { interval } = require("rxjs");
const { take } = require("rxjs/operators");

interval(1000).pipe(
  take(5),
).subscribe(value => console.log(`result: ${value}`));
