const { interval } = require("rxjs");
const { switchMap, map, take } = require("rxjs/operators");

interval(600).pipe(
  take(5),
  switchMap(x => interval(250).pipe(
    take(3),
    map(y => ({ x, y })),
  )),
).subscribe(result => console.log(`next x: ${result.x}, y: ${result.y}`));
