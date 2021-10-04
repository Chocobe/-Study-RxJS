const { throwError } = require("rxjs");

throwError(() => new Error("에러 메시지"))
  .subscribe({
    next: value => console.log(`throwError() next: ${value}`),
    error: error => console.log(`throwError() error: ${error.message}`),
    complete: () => console.log("throwError() complete"),
  });