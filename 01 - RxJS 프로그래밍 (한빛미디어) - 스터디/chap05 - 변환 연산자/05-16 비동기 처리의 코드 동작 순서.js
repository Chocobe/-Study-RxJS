const { timer, range, interval } = require("rxjs");
const { concatMap, map, tap, skip, take, startWith } = require("rxjs/operators");

const FIRST_VALUE = -1;

const requests = [
  timer(2000).pipe(
    startWith(FIRST_VALUE),
    tap(value => value === FIRST_VALUE && console.log(`req 1 - subscribed`)),
    skip(1),
    map(() => "req 1"),
  ),

  timer(1000).pipe(
    startWith(FIRST_VALUE),
    tap(value => value === FIRST_VALUE && console.log(`req 2 - subscribed`)),
    skip(1),
    map(() => "req 2"),
  ),

  timer(1500).pipe(
    startWith(FIRST_VALUE),
    tap(value => value === FIRST_VALUE && console.log(`req 3 - subscribed`)),
    skip(1),
    map(() => "req 3"),
  ),
];

interval(1000).pipe(
  take(5),
).subscribe(sec => console.log(`${sec + 1} secs`));

range(0, requests.length).pipe(
  tap(i => console.log(`range next(${i})`)),
  concatMap(i => console.log(`begin concatMap project function ${i}`) || requests[i]),
).subscribe(req => console.log(`response from ${req}`));
