// perform filesystem operations:
const fs = require('fs')
const path = require('path')

var directPath = process.argv[2];
var extension = process.argv[3];

fs.readdir(directPath, (err, files) => {
    if (err) {
        return console.log(err)
    }
    
    files.forEach((file) => {
        if (path.extname(file) === "." + extension) {
            console.log(file);
        }
    });
})