const { interval, throwError, of } = require("rxjs");
const { retry, concatMap } = require("rxjs/operators");

const myError$ = throwError(() => new Error("테스트용 에러"));

const obs$ = interval(500).pipe(
  concatMap(value => {
    const ran = Math.floor(Math.random() * 10);

    if(ran < 1) return myError$;

    return of(value);
  }),

  retry(2),
);

obs$.subscribe({
  next: console.log,
  error: error => console.log(`에러발생: ${error.message}`),
});
