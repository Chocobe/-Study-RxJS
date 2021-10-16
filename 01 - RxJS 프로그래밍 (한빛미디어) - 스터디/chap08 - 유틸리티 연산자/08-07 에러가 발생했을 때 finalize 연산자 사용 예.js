const { range } = require("rxjs");
const { finalize, tap } = require("rxjs/operators");

range(1, 3).pipe(
  tap(value => value === 3 && value.test()),
  finalize(() => console.log("FINALLY CALLBACK")),
).subscribe({
  next: result => console.log(`result: ${result}`),
  error: error => console.log(`ERROR: ${error}`),
});
