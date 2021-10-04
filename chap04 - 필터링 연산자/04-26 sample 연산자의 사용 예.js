const { interval, timer } = require("rxjs");
const { sample, take } = require("rxjs/operators");

const SOURCE_INTERVAL = 200;
const SAMPLE_SIZE = 3;
const SAMPLE_DELAY = 100;

interval(SOURCE_INTERVAL).pipe(
  sample(timer(
    SOURCE_INTERVAL + SAMPLE_DELAY,
    SOURCE_INTERVAL * SAMPLE_SIZE,
  )),
  take(4),
).subscribe(value => console.log(`result: ${value}`));
