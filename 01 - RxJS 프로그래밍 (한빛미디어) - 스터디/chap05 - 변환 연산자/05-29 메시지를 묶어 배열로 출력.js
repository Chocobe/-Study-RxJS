const { interval } = require("rxjs");
const { buffer, map, take } = require("rxjs/operators");

const message = "안녕하세요. RxJS 테스트 입니다";

interval(90).pipe(
  take(message.length),
  map(index => {
    const curChar = message.charAt(index);
    console.log(curChar);
    return curChar;
  }),
  buffer(interval(500)),
).subscribe(result => console.log(`buffer: [${result}]`));
