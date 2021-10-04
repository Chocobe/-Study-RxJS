const sourceArray = [1, 2, 3, 4, 5];

const func1 = value => value + 1;
const func2 = value => value * 2;

sourceArray.forEach(value => console.log(func2(func1(value))));