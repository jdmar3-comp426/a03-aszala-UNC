import { sumToString, getIncreasingArray, maxAndMin, countArray } from "./src/mild/mild_1.js"
import { equal } from 'assert';

equal(sumToString(3, 4), "3 + 4 = 7");

let arr1 = getIncreasingArray(3, 7);
let arr2 = [3, 4, 5, 6, 7];

for (let i=0;i<arr2.length;i++) {
	equal(arr1[i], arr2[i]);
}

let maxMin = maxAndMin([1, 2, 3, 4, 5]);
equal(maxMin.min, 1);
equal(maxMin.max, 5);


let counts = countArray(["hello","hello", 2, 2, 1, "bean"]);
equal(counts['2'], 2);
equal(counts.hello, 2);
equal(counts['1'], 1);
equal(counts.bean, 1);







console.log('\u001b[' + 32 + 'm' + "Passed all checks!" + '\u001b[0m');