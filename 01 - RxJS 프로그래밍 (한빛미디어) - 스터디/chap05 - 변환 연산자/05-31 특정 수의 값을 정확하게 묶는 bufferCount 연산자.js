const { interval } = require("rxjs");
const { bufferCount, take, map } = require("rxjs/operators");

const message = "안녕하세요. RxJS 테스트 입니다";

interval(90).pipe(
  take(message.length),
  map(index => {
    const curChar = message.charAt(index);
    console.log(curChar);
    return curChar;
  }),
  bufferCount(5),
).subscribe(buffer => console.log(`buffer: [${buffer}]`));
