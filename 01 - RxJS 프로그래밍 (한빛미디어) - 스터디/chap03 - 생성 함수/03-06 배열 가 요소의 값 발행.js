const { from } = require("rxjs");

from([1, 2, 3, 4])
  .subscribe({
    next: value => console.log(`next: ${value}`),
    error: error => console.log(`error: ${error}`),
    complete: () => console.log("completed"),
  });
