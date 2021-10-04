const sourceArray = [1, 2, 3, 4, 5];
const resultArray = sourceArray.map(value => value + 1).map(value => value * 2);

resultArray.forEach(value => console.log(`result: ${value}`));
