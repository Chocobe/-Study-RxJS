const { interval } = require("rxjs");
const { distinct, map, take } = require("rxjs/operators");

interval(200).pipe(
  take(25),
  map(value => ({ original: value, value: value % 5 })),
  distinct(
    obj => obj.value,
    interval(2199),
  ),
).subscribe(obj => console.log(`result: ${JSON.stringify(obj)}`));
