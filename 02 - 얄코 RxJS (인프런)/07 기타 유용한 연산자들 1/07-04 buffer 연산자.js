const { interval } = require("rxjs");
const { take, buffer } = require("rxjs/operators");

const obs$ = interval(1000).pipe(
  take(5),
  buffer(interval(3000)),
);

obs$.subscribe(console.log);
