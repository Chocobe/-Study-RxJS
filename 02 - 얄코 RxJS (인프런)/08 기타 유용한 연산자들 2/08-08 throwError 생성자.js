const { throwError } = require("rxjs");

const obs$ = throwError(() => new Error("테스트용 에러 발생"));

obs$.subscribe({
  next: console.log,
  error: error => console.log(`ERROR] ${error.message}`),
  complete: console.log,
});
