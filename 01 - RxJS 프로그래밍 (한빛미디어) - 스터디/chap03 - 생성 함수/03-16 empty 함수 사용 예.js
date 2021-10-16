const { empty, EMPTY } = require("rxjs");

empty()
  .subscribe({
    next: value => console.log(`empty() next: ${value}`),
    error: error => console.log(`empty() error: ${error.message}`),
    complete: () => console.log("empty() complete"),
  });

EMPTY.subscribe({
  next: value => console.log(`EMPTY next: ${value}`),
  error: error => console.log(`EMPTY error: ${error.message}`),
  complete: () => console.log("EMPTY complete"),
});