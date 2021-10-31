const { interval } = require("rxjs");
const { timestamp, tap, pluck, map } = require("rxjs/operators");
const moment = require("moment");

const obs$ = interval(1000);
obs$.pipe(
  timestamp(),
  pluck("timestamp"),
  map(timestamp => moment(timestamp)),
  map(curMoment => curMoment.format("YYYY년 MM월 DD일 HH:mm:ss")),
).subscribe(console.log);
