// Should be like this:
/* {
  "title": "6 Secure Randoms",
  "randoms": [
    {"length": 48,"random": "A string with 48 random hex-characters"},
    {"length": 40,"random": "A string with 40 random hex-characters"},
    {"length": 32,"random": "A string with 32 random hex-characters"},
    {"length": 24,"random": "A string with 24 random hex-characters"},
    {"length": 16,"random": "A string with 16 random hex-characters"},
    {"length": 8,"random":  "A string with 8 random hex-characters"}
  ]
}
*/
// a) First implement this functionality without promises, using just the method  randomBytes(..).

const crypto = require('crypto');
let size = 48;
let decreaseByEight = 8;
const randomString = {
    "title": "6 Secure Randoms",
    "randoms": []
}

crypto.randomBytes(size, function (err, buffer) {
    randomString.randoms.push({ length: size, random: buffer.toString('hex') })
    size -= decreaseByEight;
    crypto.randomBytes(size, (err, buffer) => {
        randomString.randoms.push({ length: size, random: buffer.toString('hex') })
        size -= decreaseByEight;
        crypto.randomBytes(size, (err, buffer) => {
            randomString.randoms.push({ length: size, random: buffer.toString('hex') })
            console.log(randomString)
            size -= decreaseByEight;
            crypto.randomBytes(size, (err, buffer) => {
                randomString.randoms.push({ length: size, random: buffer.toString('hex') })
                console.log(randomString)
                size -= decreaseByEight;
                crypto.randomBytes(size, (err, buffer) => {
                    randomString.randoms.push({ length: size, random: buffer.toString('hex') })
                    console.log(randomString)
                    size -= decreaseByEight;
                    crypto.randomBytes(size, (err, buffer) => {
                        randomString.randoms.push({ length: size, random: buffer.toString('hex') })
                        console.log(randomString)
                        size -= decreaseByEight;
                    })
                })
            })
        })
    })
})