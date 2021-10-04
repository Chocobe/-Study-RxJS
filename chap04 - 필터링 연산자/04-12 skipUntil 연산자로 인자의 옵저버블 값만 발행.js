const { interval } = require("rxjs");
const { skipUntil, take } = require("rxjs/operators");

const SOURCE_INTERVAL_TIME = 300;

interval(SOURCE_INTERVAL_TIME).pipe(
  skipUntil(interval(SOURCE_INTERVAL_TIME * 5)),
  take(3),
).subscribe(value => console.log(`result: ${value}`));
