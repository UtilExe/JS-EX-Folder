// 3 Async functions in serial and in parallel
const fetch = require('node-fetch');
const URL = "https://swapi.dev/api/people/";

// Use npm to install performance-now, and calculate the time spent in your sequential implementation using this example.
var now = require("performance-now")


// Use fetch and async/await to complete fetchPerson(..)below. When implemented, each line in printNames() must be executed “sequentially”. Verify this with the debugger.
// Sequentially:
async function fetchPerson(url) {
    try {
        const response = await fetch(url).then(res => res.json())
        return response;
    } catch (err) {
        console.log(err)
    }
}
async function printNames() {
    var start = now()
    console.log("Sequential: Before");
    const person1 = await fetchPerson(URL + '1');
    const person2 = await fetchPerson(URL + '2');
    console.log(person1.name);
    console.log(person2.name)
    console.log("Sequential: After all");
    var end = now()
    console.log(start.toFixed(2));
    console.log("Sequential: Time taken (in ms):", (end-start).toFixed(2))
}

//printNames()


// Execution in parallel
// Fix the problem above, so that HTTP-requests are made in parallel.
async function printNamesParallel() {
    var start = now()
    console.log("Parallel: Before");
    const person1 = fetchPerson(URL + '1');
    const person2 = fetchPerson(URL + '2');
    const result = await Promise.all([person1, person2]);
    console.log("Result:", result[0].name);
    console.log("Result:", result[1].name);
    console.log("Parllalel: After all");
    var end = now()
    console.log(start.toFixed(2));
    console.log("Parallel: Time taken (in ms):", (end-start).toFixed(2))
}

printNamesParallel()