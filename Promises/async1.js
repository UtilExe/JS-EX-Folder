const myPromise = require("./myPromise")

async function getDataSequental() {
  const r1 = await myPromise("Number 1", 2000);
  const r2 = await myPromise("Number 2", 1000);
  const r3 = await myPromise("Number 3", 700);
  const r4 = await myPromise("Number 4", 500);
  return `${r1}, ${r2}, ${r3}, ${r4}`
}

async function getDataParallel() {
  const p1 = myPromise("Number 1", 2000);
  const p2 = myPromise("Number 2", 1000);
  const p3 = myPromise("Number 3", 700);
  const p4 = myPromise("Number 4", 500);
  const allResults = await Promise.all([p1, p2, p3, p4])
  return allResults.join(", ")
}


async function test() {  
  try {
    const data = await getDataSequental();
    console.log(data)
  } catch (e) {
    console.log(e)
  } finally {
    console.log("Done")
  }
}
test();
