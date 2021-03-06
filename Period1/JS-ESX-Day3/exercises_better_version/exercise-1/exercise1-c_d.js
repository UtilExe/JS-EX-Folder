// d) Create a new file and test the module, like so:
// First, using plain promises:

const exercise1b = require("./exercise1-b")

function plainPromise() {
    const p1 = exercise1b.makeSecureRandom(48)
    const p2 = exercise1b.makeSecureRandom(40)
    const p3 = exercise1b.makeSecureRandom(32)
    const p4 = exercise1b.makeSecureRandom(24)
    const p5 = exercise1b.makeSecureRandom(16)
    const p6 = exercise1b.makeSecureRandom(8)
    const promises = [p1, p2, p3, p4, p5, p6]

    Promise.all(promises) // Parallel solution
        .then(d => console.log(d))
        .catch(e => console.log("Error ", e))
        .finally(() => console.log("DONE"))
}
//plainPromise() #remove the comment to run the method, and get output.

// after that, using async/await
async function asyncTester() {
    try {
        const p1 = exercise1b.makeSecureRandom(48)
        const p2 = exercise1b.makeSecureRandom(40)
        const p3 = exercise1b.makeSecureRandom(32)
        const p4 = exercise1b.makeSecureRandom(24)
        const p5 = exercise1b.makeSecureRandom(16)
        const p6 = exercise1b.makeSecureRandom(8)
        const result = await Promise.all([p1, p2, p3, p4, p5, p6])
        randomString.randoms.push(result)
        console.log(result)
    } catch(err) {
        console.log(err)
    }
}

// asyncTester() #remove the comment to run the method, and get output.