const { of } = require("rxjs");
const { timeout, delay } = require("rxjs/operators");

const obs$ = of(1, 2, 3, 4, 5);
obs$.pipe(
  delay(3000),
  timeout(2000),
).subscribe({
  next: console.log,
  error: console.log,
  complete: () => console.log("완료"),
});
