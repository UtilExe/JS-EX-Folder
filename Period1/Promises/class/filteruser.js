const { filterDir,filterDirP, filterDirMyPromise } = require('./filterdir') // vi ved vi får et objekt ud, og så bruger vi destructuring. 
 
// filterDir(__dirname, ".js", (err, files) => {
//   if (err) {
//     return console.log(err)
//   }
// })
 
// filterDirP(__dirname,".js")
// .then(files=>console.log(files))
// .catch(e=>console.error(e))
 /*
async function tester() {
  const files = await filterDirP(__dirname, ".js")
  console.log(files)
}
tester()

*/

filterDirMyPromise(__dirname, "js")
.then(files=>console.log(files))
.catch(e=>console.log(e))