const { filterDirMyPromise } = require('./filterdir')
 
 
async function tester() {
  try {
    const files = await filterDirMyPromise("class/Folder1", ".js")
    console.log(files)
  } catch (err) {
    console.log(err)
  }
}
//tester()


async function testerSync() {
    try {
        const files1 = await filterDirMyPromise("class/Folder1", ".js")
        const files2 = await filterDirMyPromise("class/Folder2", ".js")
        const files3 = await filterDirMyPromise("class/Folder3", ".js")
        console.log(files1, files2, files3)
    } catch (err) {
        console.log(err)
    }
}
//testerSync()

async function testerParallel() {
    try {
        const promise1 = filterDirMyPromise("class/Folder1", ".js")
        const promise2 = filterDirMyPromise("class/Folder2", ".js")
        const promise3 = filterDirMyPromise("class/Folder3", ".js")
        // using await
       const result = await Promise.all([promise1, promise2, promise3]);
       console.log(result)
    } catch (err) {
        console.log(err)
    }
}
testerParallel()

// todo for mig selv: prøv evt. med promise funktion.