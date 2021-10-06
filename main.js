import { sumToString, getIncreasingArray, maxAndMin, countArray } from "./src/mild/mild_1.js"
import { identifyVariable, identifyArray, removeKey, removeKeyNonDestructive, removeKeys } from "./src/mild/mild_2.js"
import { getSum, getMedian, getStatistics } from "./src/medium/medium_1.js"

import { equal } from 'assert';

// Mild_1 Functions

// Sum to String
equal(sumToString(3, 4), "3 + 4 = 7");

// Increasing Array
let arr1 = getIncreasingArray(3, 7);
let arr2 = [3, 4, 5, 6, 7];

for (let i=0;i<arr2.length;i++) {
	equal(arr1[i], arr2[i]);
}

// Max and Min
let maxMin = maxAndMin([1, 2, 3, 4, 5]);
equal(maxMin.min, 1);
equal(maxMin.max, 5);


// Count Array
let counts = countArray(["hello","hello", 2, 2, 1, "bean"]);
equal(counts['2'], 2);
equal(counts.hello, 2);
equal(counts['1'], 1);
equal(counts.bean, 1);

// Mild_2 Functions

// Indentify Variable
let variable = 4;
let id = identifyVariable(variable);
equal(id.type, 'number');
equal(id.value, 4);


// Identify Array
let arr = [4, 'apple'];
let ids = identifyArray(arr);
equal(ids[0].type, 'number');
equal(ids[0].value, 4);
equal(ids[1].type, 'string');
equal(ids[1].value, 'apple');

// Remove Key
let obj = { name: 'beanman', age: 420 };
removeKey(obj, 'age');
equal(obj.name, 'beanman');
equal(obj.age, undefined);

// Remove Key Non Destructive
obj = { name: 'beanman', age: 420 };
let newObj = removeKeyNonDestructive(obj, 'age');
equal(obj.name, 'beanman');
equal(obj.age, 420);
equal(newObj.name, 'beanman');
equal(newObj.age, undefined);

// Remove Keys
obj = { name: 'beanman', age: 420, potato: 'cabbage' };
newObj = removeKeys(obj, ['age', 'name']);
equal(obj.name, 'beanman');
equal(obj.age, 420);
equal(obj.potato, 'cabbage');
equal(newObj.name, undefined);
equal(newObj.age, undefined);
equal(newObj.potato, 'cabbage');

// Medium 1 Tests

// Get Sum
equal(getSum([1, 2, 3]), 6);

// Get Median
equal(getMedian([3,2,5,6,2,7,4,2,7,5]), 4.5);

// Get Statistics
let stats = getStatistics([3,2,4,5,5,5,2,6,7]);
equal(stats.length, 9)
equal(stats.sum, 39)
equal(stats.mean, 4.333333333333333)
equal(stats.median, 5)
equal(stats.min, 2)
equal(stats.max, 7)
equal(stats.variance, 2.6666666666666665)
equal(stats.standard_deviation, 1.632993161855452)


console.log('\u001b[' + 32 + 'm' + "Passed all checks!" + '\u001b[0m');