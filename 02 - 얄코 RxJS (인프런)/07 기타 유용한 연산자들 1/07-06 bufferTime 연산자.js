const { interval } = require("rxjs");
const { take, bufferTime } = require("rxjs/operators");

const obs$ = interval(200).pipe(
  take(50),
  bufferTime(1000),
);

obs$.subscribe(console.log);
