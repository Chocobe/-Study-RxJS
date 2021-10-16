const { interval, of } = require("rxjs");
const { take, mergeMap, tap, retryWhen, scan, catchError } = require("rxjs/operators");

interval(100).pipe(
  take(30),
  mergeMap(value => {
    return of(value).pipe(
      tap(value => {
        if(Math.random() <= 0.5) {
          throw new Error(`RANDOM ERROR: ${value}`);
        }
      }),
      retryWhen(errorObservable => {
        return errorObservable.pipe(
          take(2),
          scan((acc, error) => {
            return {
              count: acc.count + 1,
              error,
            };
          }, { count: 0 }),
          tap(errorInfo => console.log(
            `retryCount: ${errorInfo.count}
            error message: ${errorInfo.error.message}`
          )),
        );
      }),
      catchError(error => of(error.message)),
    );
  }),
).subscribe({
  next: result => console.log(`result: ${result}`),
  error: error => console.log(`ERROR: ${error.message}`),
});
