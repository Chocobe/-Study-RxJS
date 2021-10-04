const { interval } = require("rxjs");
const { debounceTime, take } = require("rxjs/operators");

interval(400).pipe(
  take(4),
  debounceTime(300),
).subscribe(value => console.log(`- result: ${value}`));

interval(400).pipe(
  take(4),
  debounceTime(500),
).subscribe(value => console.log(`-- result: ${value}`));
