const { from, of } = require("rxjs");
const { concatMap, tap, catchError } = require("rxjs/operators");

const integers = ["1", "2", "3", "r", "5", "6", "u", "8"];

from(integers).pipe(
  concatMap(value => {
    return of(value).pipe(
      tap(value => {
        if(!Number.isInteger(parseInt(value))) {
          throw new TypeError(`${value} 은(는) 숫자가 아닙니다.`);
        }
      }),
      catchError(error => of(error.message)),
    );
  }),
).subscribe({
  next: result => console.log(`result: ${result}`),
  error: error => console.log(`ERROR: ${error}`),
});
