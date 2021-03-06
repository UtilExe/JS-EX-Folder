/*
2
a) Implement a function: myFilter(array, callback)that takes an array as the first argument, and a callback as the second and returns a new (filtered) array according to the code provided in the callback (that is with the same behaviour as the original filter method).
Test the method with the same array and callback as in the example with the original filter method.
*/

let arrayData = [5, 10, 60, 20, 3, 2, 1, 0, 25];

function numbersAboveFive(numbers) {
    return numbers > 5;
}

// With the original js filter method
console.log("With filter:", arrayData.filter(number => number > 5));

// Without the smart js filter method from above. 
function myFilter(array, callback) {
    let arrayCopy = [];
    array.forEach(element => {
        if (callback(element)) {
            arrayCopy.push(element);
        }
    });
    return arrayCopy;
}

console.log("Without filter:", myFilter(arrayData, numbersAboveFive));

/*
b) Implement a function: myMap(array, callback)that, provided an array and a callback, provides the same functionality as calling the existing map method on an array.
Test the method with the same array and callback as in the example with the original map method.
*/
let newArrayData = [20, 60, 100];
console.log("B:")
// double the array values (*2), the smart map way
console.log("With map:", newArrayData.map(x => x * 2))

// Without the smart js map method from above.
function multiplyByTwo(numbers) {
    return (numbers * 2);
}

function myMap(array, callback) {
    let arrayCopy = [];
    array.forEach(element => {
        const newElement = callback(element)
            arrayCopy.push(newElement);
    });
    return arrayCopy;
}

console.log("Without map:", myMap(newArrayData, multiplyByTwo));