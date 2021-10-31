const { interval, timer, from } = require("rxjs");
const { takeUntil, pluck, tap, concatMap } = require("rxjs/operators");
const axios = require("axios");

// const timer$ = timer(5000);
// const obs$ = interval(500);

// obs$.pipe(
//   takeUntil(timer$),
// ).subscribe({
//   next: console.log,
//   complete: () => console.log("완료"),
// });

const url = "http://api.github.com/search/users?q=user:mojombo";

const obs2$ = interval(50);
obs2$.pipe(
  takeUntil(from(axios.get(url)).pipe(
    pluck("data", "items"),
    concatMap(item => item),
    pluck("html_url"),
    tap(response => console.log(`response: ${response}`)),
  )),
).subscribe(console.log);
