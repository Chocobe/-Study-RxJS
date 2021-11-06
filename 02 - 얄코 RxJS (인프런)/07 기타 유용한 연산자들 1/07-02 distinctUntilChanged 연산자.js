const { from } = require("rxjs");
const { distinctUntilChanged } = require("rxjs/operators");

const data = [
  { name: "Kim", sex: "male" },
  { name: "Park", sex: "female" },
  { name: "Lee", sex: "female" },
  { name: "Bob", sex: "male" },
  { name: "John", sex: "male" },
];

const obs$ = from(data).pipe(
  distinctUntilChanged((lhs, rhs) => lhs.sex === rhs.sex),
);

obs$.subscribe(console.log);
