const { interval } = require("rxjs");
const { window, take, map, concatMap, filter, scan, last } = require("rxjs/operators");

const message = "안녕하세요. RxJS 테스트 입니다";

interval(90).pipe(
  take(message.length),
  map(index => {
    const curChar = message.charAt(index);
    console.log(curChar);
    return curChar;
  }),
  window(interval(500)),
  concatMap(windowObservable => {
    console.log("windowObservable 넘어옴");

    return windowObservable.pipe(
      filter(curChar => curChar !== " "),
      take(3),
      scan((acc, curr) => acc.concat(curr), ""),
      last(),
    );
  }),
).subscribe(buffer => console.log(`결과: ${buffer}`));
