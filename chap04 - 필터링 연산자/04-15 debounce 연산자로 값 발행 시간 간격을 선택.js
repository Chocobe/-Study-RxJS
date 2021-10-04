const { interval } = require("rxjs");
const { debounce, take, tap } = require("rxjs/operators");

const SOURCE_INTERVAL_TIME = 400;

interval(SOURCE_INTERVAL_TIME).pipe(
  tap(value => console.log(`원본: ${value}`)),
  take(4),
  debounce(value => interval(
    value % 2 === 0 
      ? SOURCE_INTERVAL_TIME * 1.2
      : SOURCE_INTERVAL_TIME * 0.8
  ).pipe(
    tap(innerValue => console.log(`sourceInterval value : ${value}, innerValue: ${innerValue}`)),
  )),
).subscribe(value => console.log(`result: ${value}`));
