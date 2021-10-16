const { from, of } = require("rxjs");
const { map, tap, pluck, catchError } = require("rxjs/operators");

const integers = ["1", "2", "3", "r", "5"];

from(integers).pipe(
  map((value, index) => ({ value, index })),
  tap(({ value, index }) => {
    if(!Number.isInteger(parseInt(value))) {
      const typeError = new TypeError(`${value} 은(는) 숫자가 아닙니다.`);
      typeError.index = index;
      typeError.checkTypeError = true;

      throw typeError;
    }
  }),
  pluck("value"),
  catchError(({ name, message, index, checkTypeError }) => {
    if(name === "TypeError" && checkTypeError) {
      const catchArray = [message];
      const restArray = integers
        .slice(index, integers.length)
        .map(value => `에러 후, 남은 값: ${value}`);

      return from(catchArray.concat(restArray));
    }

    return of(message);
  }),
).subscribe({
  next: result => console.log(`result: ${result}`),
  error: error => console.log(`ERROR: ${error}`),
});
