const { defer } = require("rxjs");
const { timeout } = require("rxjs/operators");
const axios = require("axios");

defer(
  () => axios.get(`https://httpbin.org/delay/${Math.random() * 5}`)
    .then(response => response.data),
).pipe(
  timeout(2000),
).subscribe({
  next: result => console.log(`결과: ${JSON.stringify(result)}`),
  error: error => {
    console.log(`에러: ${error.message}`);
    process.exit(1);
  },
});
