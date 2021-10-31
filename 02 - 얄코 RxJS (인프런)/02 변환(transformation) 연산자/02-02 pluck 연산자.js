const { from } = require("rxjs");
const { pluck, concatMap, map } = require("rxjs/operators");
const axios = require("axios");

const obs$ = from([
  { name: "apple", price: 1200, info: { category: "fruit" } },
  { name: "carrot", price: 800, info: { category: "vegetable" } },
  { name: "pork", price: 5000, info: { category: "meet" } },
  { name: "milk", price: 2400, info: { category: "drink" } },
]);

// obs$.pipe(
//   pluck("price"),
// ).subscribe(console.log);

// obs$.pipe(
//   pluck("info", "category"),
// ).subscribe(console.log);

// from(axios.get("http://api.github.com/search/users?q=user:mojombo")).pipe(
//   pluck("data", "items"),
//   map(items => from(items)),
//   concatMap(item => item),
//   pluck("html_url"),
// ).subscribe(console.log);

from(axios.get("http://api.github.com/search/users?q=user:mojombo")).pipe(
  pluck("data", "items"),
  concatMap(items => from(items).pipe(
    pluck("html_url"),
  )),
).subscribe(console.log);
