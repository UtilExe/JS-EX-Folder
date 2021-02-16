// perform filesystem operations:
const fs = require('fs')

let fileName = process.argv[2];
let file = fs.readFileSync(fileName, 'utf8');
let noOfNewLines = file.split('\n').length -1;

console.log(noOfNewLines);