const { of } = require("rxjs");

of(1, 2, "a", "b", 3, 4, ["array1", "array2"])
  .subscribe(
    value => console.log(`next: ${value}`),
    error => console.error(error.message),
    () => console.log("completed"),
  );
  