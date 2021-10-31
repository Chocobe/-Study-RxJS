const { interval } = require("rxjs");
const { take, tap, delay } = require("rxjs/operators");

const obs$ = interval(1000);
obs$.pipe(
  take(5),
  tap(value => console.log(`발행시작: ${value}`)),
  delay(5001),
).subscribe(result => console.log(`\t발행완료: ${result}`));
