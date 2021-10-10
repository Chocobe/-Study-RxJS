const { interval, of } = require("rxjs");
const { take, mergeMap, tap, retry, catchError } = require("rxjs/operators");

interval(100).pipe(
  take(30),
  mergeMap(value => {
    return of(value).pipe(
      tap(value => {
        if(Math.random() <= 0.3) {
          throw new Error(`RANDOM ERROR ${value}`);
        }
      }),
      retry(1),
      catchError(error => of(error.message)),
    );
  }),
).subscribe({
  next: result => console.log(`result: ${result}`),
  error: error => console.log(`ERROR: ${error}`),
});
