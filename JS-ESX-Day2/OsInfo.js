const os = require('os');

class OsInfo {
    totalMemory = os.totalmem();
    freeMemory = os.freemem();
    type = os.type();
    platform = os.platform();
    eol = os.EOL;
    
    // could also just retrieve the object directly in the tester class.
    trigger = () => {
        console.log(`Platform: ${this.platform}`);
        console.log(`osType: ${this.type}`);
        console.log(`Free Memory: ${this.freeMemory}`);
        console.log(`Total Memory: ${this.totalMemory}`);
        console.log(`Eol: ${this.eol}`);

    }

}

module.exports = OsInfo