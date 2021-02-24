// b) Use Promises to solve the problem from 1-a.

const crypto = require('crypto');
const randomString = {
    "title": "6 Secure Randoms",
    "randoms": []
}

const makeSecureRandom = (size) => new Promise(function (resolve, reject) {
    crypto.randomBytes(size, (err, buffer) => {
      //const err = false;
      if (err) {
        return reject(new Error("UPPPPPPPPS"))
      }
      var data = { length: size, random: buffer.toString('hex') }
      randomString.randoms.push(data)
      resolve(data);
  })
});

  function runner() {
  const p1 = makeSecureRandom(48)
  const p2 = makeSecureRandom(40)
  const p3 = makeSecureRandom(32)
  const p4 = makeSecureRandom(24)
  const p5 = makeSecureRandom(16)
  const p6 = makeSecureRandom(8)
  const promises = [p1, p2, p3, p4, p5, p6]
  Promise.all(promises) // Parallel solution
    .then(d => console.log(d))
    .catch(e => console.log("Error ",e))
    .finally(()=>console.log("DONE"))
    // .finally(()=>console.log(randomString)) // (if we wanted to retrieve the object instead of the promise result)
}

//runner()

module.exports = {
    makeSecureRandom,
    randomString,
    runner
}