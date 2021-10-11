const { interval, of, throwError } = require("rxjs");
const { take, mergeMap, tap, retryWhen, scan, catchError } = require("rxjs/operators");

const RETRY_LIMIT = 2;

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
          scan((acc, error) => {
            return {
              count: acc.count + 1,
              error,
            };
          }, { count: 0 }),
          mergeMap(errorInfo => {
            if(errorInfo.count === RETRY_LIMIT + 1) {
              return throwError(() => errorInfo.error);
            }

            return of(errorInfo);
          }),
          tap(errorInfo => console.log(
            `retryCount: ${errorInfo.count}
            error message: ${errorInfo.error.message}`
          )),
        );
      }),
      catchError(error => of(error)),
    );
  }),
).subscribe({
  next: result => console.log(`result: ${result}`),
  error: error => console.log(`ERROR: ${error.message}`),
});
