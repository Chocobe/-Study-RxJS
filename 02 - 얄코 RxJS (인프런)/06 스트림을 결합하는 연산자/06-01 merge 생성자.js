const { interval, merge } = require("rxjs");
const { map, take } = require("rxjs/operators");

const interval1$ = interval(1000).pipe(
  take(5),
  map(() => "* interval 1")
);
const interval2$ = interval(1000).pipe(
  take(5),
  map(() => "** interval 2")
);

const interval3$ = interval(1000).pipe(
  take(5),
  map(() => "*** interval 3"),
);

const interval4$ = interval(1000).pipe(
  take(5),
  map(() => "**** interval 4"),
);

const interval5$ = interval(1000).pipe(
  take(5),
  map(() => "***** interval 5"),
);

merge(
  interval1$, 
  interval2$,
  interval3$,
  interval4$,
  interval5$,
  3
).subscribe(result => console.log(`${result}`));
