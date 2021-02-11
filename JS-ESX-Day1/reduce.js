/* the reduce-method
a) Use join to create a single string from all, with names: comma-, space. and  # - separated. */
var all = ["Lars", "Peter", "Jan", "Bo"];

console.log("Using join, task A:", all.join(', '));

/* 
Now let’s create our own reducer functions.
Task B)
Given this array: var numbers = [2, 3, 67, 33]; 
Create a reducer function that will return the sum (105) of all values in numbers
*/
var numbers = [2, 3, 67, 33]; 

function sum(sumedValuePrNumber, currentValue) {
    return sumedValuePrNumber + currentValue;
}
// Note: Above, could also have been written like this:
const sumedValue = (sumedValuePrNumber, currentValue) => sumedValuePrNumber + currentValue;

console.log("Task b, reducer function:", numbers.reduce(sum));

/*
Task C)
Create a reducer function that will return the average age of all members.
*/
let members = [
 {name : "Peter", age: 18},
 {name : "Jan", age: 35},
 {name : "Janne", age: 25},
 {name : "Martin", age: 22},
]

console.log("Task c, average age:", members.reduce((accumulator,member) => member.age + accumulator, 0) / members.length)
// Tried to make a function for it with the parameters from the docs, but had some issues regarding NAN values and object object returning. this works too though.

/*
Task D)
Imagine you were to create a system that could count votes for the presidential election in USA 
*/
var votes = [ "Clinton","Trump","Clinton","Clinton","Trump","Trump","Trump","None"];

// Transforming an array of strings into a single object.
const voteCounter = votes.reduce(function(ourObject, vote) {
    if (!ourObject[vote]) {
        // If the vote (eg. trump) doesn't exist in our object yet, add it and set the count of that vote to 1.
        ourObject[vote] = 1;
    } else {
        // the vote (eg. trump) already exists, so increment the existing vote to our objec (ourObject) instead.
        ourObject[vote]++;
    }

    return ourObject;
}, {}); // Initiliaze the accumator as an empty object. This is needed to display all the votes, and not only eg. Clinton as vote in the object. Passing an empty object as initialValue.
// Thanks to https://www.freecodecamp.org/news/the-ultimate-guide-to-javascript-array-methods-reduce/ for inspiration..

console.log("Task D, with help from google:", voteCounter);