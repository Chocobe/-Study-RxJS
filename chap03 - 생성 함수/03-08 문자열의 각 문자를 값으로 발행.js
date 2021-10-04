const { from } = require("rxjs");

from("Hello")
  .subscribe({
    next: curChar => console.log(`next: ${curChar}`),
    error: error => console.log(`error: ${error.message}`),
    complete: () => console.log("completed"),
  });
