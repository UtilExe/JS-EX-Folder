const OsInfo = require('./OsInfo')
const DosDetector = require('./dosDetector')
const tester = new DosDetector(2000);
const http = require('http');

tester.on('DoS', (arg) => {
  console.log('DoS attack detected', arg)
})

const server = http.createServer((req, res) => {
  if (req.url === '/api/os-info') {
    //res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Type', 'text/html'); // now we can use p tag, h2.. etc.
    tester.addUrl('/api/os-info')
    //Return a response with OS-info, using the code implemented in part-a
    const publisher = new OsInfo();
    
    res.write(`
    <h2>OS-Info</h2>
    <p> Total memory: ${publisher.totalMemory} </p>
    <p> Free memory: ${publisher.freeMemory} </p>
    <p> Platform: ${publisher.platform} </p>
    `);
    return res.end();
  }
  
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    tester.addUrl('/')
    res.write(`<h2>Simple node HTTP server demo</h2>
      <p>Exposes this endpoint <code>/api/os-info</code></p>
    `);
    return res.end();
  }
});
server.on('connection', (sock) => {
  // You can get the client-IP in here, using sock.remoteAddress)
});
server.listen(3000);
console.log('listening on 3000');
//Register for the "DosDetected" event and console.log the url and time info.

