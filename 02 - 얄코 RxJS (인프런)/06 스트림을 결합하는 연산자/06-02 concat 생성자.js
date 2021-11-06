const { interval, concat } = require("rxjs");
const { take, map } = require("rxjs/operators");

const obs1$ = interval(1000).pipe(
  take(5),
  map(() => "interval 1"),
);

const obs2$ = interval(1000).pipe(
  take(5),
  map(() => "interval 2"),
);

concat(obs1$, obs2$).subscribe(console.log);
