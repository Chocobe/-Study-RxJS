const { concat, range } = require("rxjs");
const { tap } = require("rxjs/operators");

const observer1 = {
  next: value => console.log(`tap next: ${value} STREAM-1`),
  error: error => console.log(`tap ERROR: ${error} STREAM-1`),
  complete: () => console.log(`complete STREAM-1`),
};

const observer2 = {
  next: value => console.log(`\ttap next: ${value} STREAM-2`),
  error: error => console.log(`\ttap ERROR: ${error} STREAM-2`),
  complete: () => console.log(`\tcomplete STREAM-2`),
};

concat(
  range(1, 4).pipe(
    tap(observer1),
  ),

  range(5, 3).pipe(
    tap(observer2),
  ),
).subscribe({
  next: result => console.log(`\t\tresult: ${result}`),
  error: error => console.log(`\t\tsubscribe ERROR: ${error}`),
  complete: () => console.log(`\t\tcomplete subscribe`),
});
