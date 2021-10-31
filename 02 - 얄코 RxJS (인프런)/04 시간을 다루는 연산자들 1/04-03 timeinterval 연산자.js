const { interval } = require("rxjs");
const { timeInterval, pluck, map } = require("rxjs/operators");

const obs$ = interval(1500);
obs$.pipe(
  timeInterval(),
  pluck("interval"),
  map(milliseconds => milliseconds / 1000),
).subscribe(seconds => console.log(`경과시간: ${seconds}초`));
