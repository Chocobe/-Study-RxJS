const { timer, interval, range } = require("rxjs");
const { concatMap, take, map } = require("rxjs/operators");

const requests = [
  timer(2000).pipe(map(() => "req 1")),
  timer(1000).pipe(map(() => "req 2")),
  timer(1500).pipe(map(() => "req 3")),
];

interval(1000).pipe(
  take(5),
).subscribe(sec => console.log(`${sec + 1} secs`));

range(0, requests.length).pipe(
  concatMap(i => requests[i]),
).subscribe(req => console.log(`response from ${req}`));
