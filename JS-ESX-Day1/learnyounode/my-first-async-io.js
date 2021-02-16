// perform filesystem operations:
const fs = require('fs')
var fileName = process.argv[2];

fs.readFile(fileName, (err, data) => {
    if(err){
        return console.log(err)
    }
    let noOfLines = data.toString().split('\n').length - 1;
    console.log(noOfLines);
})