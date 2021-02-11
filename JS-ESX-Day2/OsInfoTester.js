const OsInfo = require('./OsInfo')
const osInfo = require ('./OsInfo')

const publisher = new OsInfo();
publisher.trigger();
// another way to retrieve the object data
console.log(publisher)