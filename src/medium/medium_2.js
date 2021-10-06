import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: mpg_data.reduce((prev, curr) => prev.city_mpg + curr.city_mpg + prev.highway_mpg + curr.highway_mpg) / mpg_data.length,
    allYearStats: getStatistics(mpg_data.map(data => data.year)),
    ratioHybrids: mpg_data.filter(data => data.hybrid).length / mpg_data.length,
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: makerHybrids(),
    avgMpgByYearAndHybrid: avgMpgByYearAndHybrid()
};

function makerHybrids() {
	let arr = {};
	let data = mpg_data.filter(data => data.hybrid);

	data.forEach((elem) => {
		if (elem.make in arr) {
			arr[elem.make].push(elem.id);
		} else {
			arr[elem.make] = [elem.id];
		}
	});

	let finalArr = [];

	for (const [key, value] of Object.entries(arr)) {
		finalArr.push( { make: key, hybrids: value } );
	}

	return finalArr;
}

function avgMpgByYearAndHybrid() {
	let arr = {};
	let counts = {};

	mpg_data.forEach((elem) => {
		if (elem.year in arr) {
			if (elem.hybrid) {
				arr[elem.year].hybrid[0] = ((arr[elem.year].hybrid[0] * counts[elem.year].hybrid) + elem.city_mpg) / (counts[elem.year].hybrid+1);
				arr[elem.year].hybrid[1] = ((arr[elem.year].hybrid[0] * counts[elem.year].hybrid) + elem.highway_mpg) / (counts[elem.year].hybrid+1);
				
				counts[elem.year].hybrid += 1;
			} else {
				arr[elem.year].notHybrid[0] = ((arr[elem.year].notHybrid[0] * counts[elem.year].notHybrid) + elem.city_mpg) / (counts[elem.year].notHybrid+1);
				arr[elem.year].notHybrid[1] = ((arr[elem.year].notHybrid[0] * counts[elem.year].notHybrid) + elem.highway_mpg) / (counts[elem.year].notHybrid+1);

				counts[elem.year].notHybrid += 1;
			}
		} else {
			arr[elem.year] = {};
			counts[elem.year] = {};
			
			if (elem.hybrid) {
				arr[elem.year].hybrid = [elem.city_mpg, elem.highway_mpg];
				arr[elem.year].notHybrid = [0, 0];

				counts[elem.year].hybrid = 1;
				counts[elem.year].notHybrid = 0;
			} else {
				arr[elem.year].hybrid = [0, 0];
				arr[elem.year].notHybrid = [elem.city_mpg, elem.highway_mpg];
				
				counts[elem.year].hybrid = 0;
				counts[elem.year].notHybrid = 1;
			}
			
		}
	});

	return arr;
}