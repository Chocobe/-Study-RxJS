const { interval, lastValueFrom, firstValueFrom } = require("rxjs");
const { tap, take } = require("rxjs/operators");

lastValueFrom(
  interval(100).pipe(
    take(10),
    tap(value => console.log(`lastValueFrom interval value: ${value}`)),
  ),
).then(
  value => console.log(`프로미스 결과: ${value}`),
  error => console.log(`프로미스 에러: ${error}`),
);

firstValueFrom(
  interval(100).pipe(
    take(10),
    tap(value => console.log(`\tfirstValueFrom interval value: ${value}`)),
  ),
).then(
  response => console.log(`\tfirst 프로미스 결과: ${response}`),
  error => console.log(`first 프로미스 에러: ${error}`),
);
