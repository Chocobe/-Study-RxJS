const { interval, of } = require("rxjs");
const { take, mergeMap, tap, retryWhen, scan, catchError, } = require("rxjs/operators");

interval(100).pipe(
  take(20),
  mergeMap(value => {
    return of(value).pipe(
      tap(value => {
        if(Math.random() <= 0.3) {
          throw new TypeError(`RANDOM TypeError: ${value}`);
        }
      }),
      retryWhen(errors => {
        return errors.pipe(
          scan((acc, error) => 
            ({ count: acc.count + 1, error }),
            { count: 0 },
          ),
          tap(errorInfo => {
            console.log(`재시도 횟수: ${errorInfo.count}`);
            console.log(`에러 메시지: ${errorInfo.error.message}`);
          }),
        );
      }),
    );
  }),
  catchError(error => of(error.message)),
).subscribe({
  next: result => console.log(`result: ${result}`),
  error: error => console.log(`ERROR: ${error}`),
});
