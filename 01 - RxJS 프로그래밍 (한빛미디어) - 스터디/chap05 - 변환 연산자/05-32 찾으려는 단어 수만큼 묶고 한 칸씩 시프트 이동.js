const { from } = require("rxjs");
const { bufferCount, take, map, filter } = require("rxjs/operators");

const message = "간장공장공장장은강공장장이고공공장공장장은장공장장이다";
const targetWord = "공장장";

from(message).pipe(
  bufferCount(targetWord.length, 1),
  filter(buffer => buffer.length === targetWord.length),
  map(buffer => {
    const bufferWord = buffer.join("");
    console.log(`buffer: ${bufferWord}`);
    return bufferWord;
  }),
  filter(word => word === targetWord),
).subscribe(word => console.log(`${word} 발견!!`));
