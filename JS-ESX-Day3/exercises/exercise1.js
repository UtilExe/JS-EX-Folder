// Exercise 1.A : Wrap a callback implementation in a promise based implementation
const crypto = require('crypto');

// a) First implement this functionality without promises, using just the method  randomBytes(..).
const randomStrings = {
    title: "6 Secure Randoms",
    randoms: []
}

var size = 48;
// Every callback has an if statement (well, arrow but same thing here). Example of the "pyramid of doom" problem. Imagine if we were asked to produce 100 randoms... would have been a lot of if statements.
crypto.randomBytes(size, (err, buffer) => {
    randomStrings.randoms.push({ "length:": size, "random:": buffer.toString('hex') })
    size -= 8;
    crypto.randomBytes(size, (err, buffer) => {
        randomStrings.randoms.push({ "length:": size, "random:": buffer.toString('hex') })
        size -= 8;
        crypto.randomBytes(size, (err, buffer) => {
            randomStrings.randoms.push({ "length:": size, "random:": buffer.toString('hex') })
            size -= 8;
            crypto.randomBytes(size, (err, buffer) => {
                randomStrings.randoms.push({ "length:": size, "random:": buffer.toString('hex') })
                size -= 8;
                crypto.randomBytes(size, (err, buffer) => {
                    randomStrings.randoms.push({ "length:": size, "random:": buffer.toString('hex') })
                    size -= 8;
                    crypto.randomBytes(size, (err, buffer) => {
                        randomStrings.randoms.push({ "length:": size, "random:": buffer.toString('hex') })
                        //console.log(randomStrings)
                    })
                })
            })
        })
    })
})

/* B) Use Promises to solve the problem.
Hints: 
Create a function makeSecureRandom(size) that returns a promise, using the callback based design,provided by the randomBytes(..) method.
Hint: Use the demo code here as a guideline for how to do this (it's that simple)
Since the result from one calculation does not influence the next (only order matters), use Promise.all(..) to execute the operations in parallel.
*/

const randomStringsB = {
    title: "6 Secure Randoms",
    randoms: []
}

var myPromise = (sizeValue) =>
    new Promise(function (resolve, reject) {
        crypto.randomBytes(sizeValue, (err, buffer) => {
        var value = { "length:": sizeValue, "random:": buffer.toString('hex') }
            if (err) {
                return reject(new Error("UPPPPPPPPS"))
            }
            resolve(value);
        });
    })

// To prevent this many duplicates below, could probably make a forEach loop that instanties. Or what would the best way to do it be? (Ask Lars perhaps.)
const p1 = myPromise(sizeValue = 48)
const p2 = myPromise(sizeValue = 40)
const p3 = myPromise(sizeValue = 32)
const p4 = myPromise(sizeValue = 24)
const p5 = myPromise(sizeValue = 16)
const p6 = myPromise(sizeValue = 8)
const promises = [p1, p2, p3, p4, p5, p6]

/*var test
var i = 0;
for (i = 48; i >= 8; i -= 8) {
    test = myPromise(sizeValue = i) // takes only the last, due to lack of +=, but if I use += it won't retrieve the data properly.
    promises = [test]
}*/

Promise.all(promises)
    .then(d => console.log(d))
    .catch(e => console.log("Error ", e))