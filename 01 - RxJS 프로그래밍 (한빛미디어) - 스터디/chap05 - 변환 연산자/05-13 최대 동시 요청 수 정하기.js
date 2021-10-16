// const { range } = require("rxjs");
// const { mergeMap } = require("rxjs/operators");
// const fetch = require("node-fetch");

const { range } = require("rxjs");
const { mergeMap } = require("rxjs/operators");
const axios = require("axios");

const colors = [
  "blue", "red", "black", "yellow", "green",
  "brown", "gray", "purple", "gold", "white",
];

const concurrent = 5;
const maxDelayInSecs = 6;

console.time("request_color");

range(0, colors.length).pipe(
  mergeMap(i => {
    const currentDelay = Math.random() * maxDelayInSecs;
    console.log(`[Request Color]: ${colors[i]}, currentDelay: ${currentDelay}`);

    return axios.get(`https://httpbin.org/delay/${currentDelay}?color_name=${colors[i]}`)
      .then(res => res.data);
  }, concurrent),
).subscribe({
  next: data => console.log(`\t<Response> args: ${JSON.stringify(data.args)}, url: ${data.url}`),
  error: error => console.log(error.message),
  complete: () => {
    console.log("complete");
    console.timeEnd("request_color");
  },
});
