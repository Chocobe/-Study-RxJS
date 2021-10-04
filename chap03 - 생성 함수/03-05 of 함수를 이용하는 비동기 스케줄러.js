const { of, asapScheduler } = require("rxjs");

console.log("BEFORE call subscribe()");

of(1, 2, "a", "b", 3, 4, ["array1", "array2"], asapScheduler)
  .subscribe(
    value => console.log(`next: ${value}`),
    error => console.log(`error: ${error.message}`),
    () => console.log("completed"),
  );

console.log("AFTER call subscribe()");