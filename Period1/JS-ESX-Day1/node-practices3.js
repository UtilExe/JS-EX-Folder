// Giver information om Paths
const path = require('path');

var pathObj = path.parse(__filename);

console.log(pathObj)


// Giver information om Operativ Systemet
const os= require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();
/*
console.log('Total Memory: ' + totalMemory);*/

// Template string, kan simplificere ovenstående. Blev implementeret i ES6.

console.log(`Total Memory: ${totalMemory}`);
console.log(`Total Memory: ${freeMemory}`);

// Før Node kunne vi ikke få den form for information ved brug af Javascript, 
// fordi Javascript kun plejede at køre i en browser, og vi kunne dermed kun arbejde med window eller document objekter. Vi kunne ikke få information om Operativ Systemet. 
// Men når vi kører Node, er vores JavaScript kode kørt udenfor en browser. Dvs. på serveren. Vi kan arbejde med filer, vi kan arbejde med netværk..


// # File System //
const fs = require('fs');

const files = fs.readdirSync('./');
console.log(files)

// # Event // Forstår ikke lige, hvorfor den ikke printer L45. Virker i hans video, se min ca 1.05.
// Upper case indikerer, at det er en Class
const EventEmitter = require('events');

// Listener is called when the emitter (messageLogged) is signalled.

// Emit means: Making a noise, produce something. Signalling that an event has happened.

const Logger = require ('./node-practices2');
const logger = new Logger();

logger.on('messageLogged)', (arg) => {
    console.log('Listener called');
});

logger.log('message');

// # HTTP Module # /

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World')
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]))
        res.end();
    }
});

server.on('connection', (socket) => {
    console.log('New Connection');
})
server.listen(3000);

console.log('Listening on port 3000...')