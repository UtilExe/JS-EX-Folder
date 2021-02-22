const fs = require('fs')
const util = require("util")

const readdir = util.promisify(fs.readdir);

// a
function filterDir(path, ext, cb) {
    fs.readdir(path, (err, b) => {
        if (err) {
            cb(err)
        }
        const filtered = b.filter(f => f.endsWith(ext))
        cb(null, filtered);
    })
}

function filterDirP(path, ext) {
    return readdir(path)
        .then(files => {
            const filtered = files.filter(f => f.endsWith(ext))
            return filtered;
        })
}

function filterDirMyPromise(path, ext) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                return reject(new Error("Error happened"))
            }
            const filtered = files.filter(f => f.endsWith(ext))
            resolve(filtered)
        })
    })
}


module.exports.filterDir = filterDir;
module.exports.filterDirP = filterDirP;
module.exports.filterDirMyPromise = filterDirMyPromise;

