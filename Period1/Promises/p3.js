
var myPromise = (txt, delay) => new Promise(function (resolve, reject) {
  setTimeout(function () {
    const err = false;
    if (err) {
      return reject(new Error("UPPPPPPPPS"))
    }
    resolve('Hello ' + txt);
  }, delay);
});


const results = [];
myPromise("Number 1", 2000)
  .then(msg => {
    results.push(msg);
    return myPromise("Number 2", 2000)
  })
  .then(msg => {
    results.push(msg)
    return myPromise("Number 3", 2000)
  })
  .then(r => results.push(r))
  .catch(e => { console.log("In Catch", e) })
  .finally(() => console.log(results.join(", ")))
