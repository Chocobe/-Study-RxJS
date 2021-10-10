const { interval, lastValueFrom, firstValueFrom } = require("rxjs");
const { take, tap } = require("rxjs/operators");

lastValueFrom(
  interval(100).pipe(
    take(10),
    tap(value => console.log(`lastValueFrom - interval value: ${value < 3 ? value : value.test()}`)),
  ),
).then(
  result => console.log(`lastValueFrom - 프로미스 결과: ${result}`),
  error => console.log(`lastValueFrom - 프로미스 에러: ${error}`),
);

firstValueFrom(
  interval(100).pipe(
    take(10),
    tap(value => console.log(`firstValueFrom - 에러유발: ${value.test()}`)),
  ),
).then(
  result => console.log(`firstValueFrom - 프로미스 결과: ${result}`),
  error => console.log(`firstValueFrom - 에러: ${error}`),
);
