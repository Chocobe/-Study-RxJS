const { range } = require("rxjs");

range(1, 5)
  .subscribe({
    next: value => console.log(`range(1, 5) next: ${value}`),
    error: error => console.log(`range(1, 5) error: ${error.message}`),
    complete: () => console.log("range(1, 5) complete"),
  });

range(2, 5)
  .subscribe({
    next: value => console.log(`range(2, 5) next: ${value}`),
    error: error => console.log(`range(2, 5) error: ${error.message}`),
    complete: () => console.log("range(2, 5) complete"),
  });