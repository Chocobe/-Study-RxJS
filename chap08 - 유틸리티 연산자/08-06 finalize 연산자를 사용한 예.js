const { range } = require("rxjs");
const { finalize } = require("rxjs/operators");

range(1, 3).pipe(
  finalize(() => console.log("FINALLY CALLBACK")),
).subscribe({
  next: result => console.log(`result: ${result}`),
  error: error => console.log(`error: ${error}`),
  complete: () => console.log(`COMPLETE SUBSCRIBE`),
});
