const { interval } = require("rxjs");

interval(1000)
  .subscribe(value => console.log(value));