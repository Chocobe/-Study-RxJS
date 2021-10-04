const { timer } = require("rxjs");
const { sampleTime, take } = require("rxjs/operators");

const SOURCE_POINT = 300;
const SOURCE_DELAY = 400;
const SAMPLE_COUNT = 2;
const SAMPLE_DELAY = SOURCE_DELAY * SAMPLE_COUNT;

timer(SOURCE_POINT, SOURCE_DELAY).pipe(
  sampleTime(SAMPLE_DELAY),
  take(3),
).subscribe(value => console.log(`result: ${value}`));
