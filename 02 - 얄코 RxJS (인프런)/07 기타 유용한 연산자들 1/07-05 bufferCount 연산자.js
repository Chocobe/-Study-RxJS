const { interval } = require("rxjs");
const { take, bufferCount } = require("rxjs/operators");

const obs$ = interval(200).pipe(
  take(51),
  bufferCount(5),
);

obs$.subscribe(console.log);
