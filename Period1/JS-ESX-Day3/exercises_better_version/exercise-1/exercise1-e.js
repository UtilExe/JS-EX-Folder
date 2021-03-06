const exercise1b = require("./exercise1-b")
const http = require('http');

const randomString = {
    title: "6 Secure Randoms",
    randoms: []
}

// would have been better to use the already existing function from exercise1-c_d.js.
const testerAwait = async() => {
    try {
        const p1 = exercise1b.makeSecureRandom(48)
        const p2 = exercise1b.makeSecureRandom(40)
        const p3 = exercise1b.makeSecureRandom(32)
        const p4 = exercise1b.makeSecureRandom(24)
        const p5 = exercise1b.makeSecureRandom(16)
        const p6 = exercise1b.makeSecureRandom(8)
        // using await, parallel
        const result = await Promise.all([p1, p2, p3, p4, p5, p6]);
        randomString.randoms.push(result)
        //console.log("Await response: ", result)
    } catch (err) {
        console.log(err)
    }
}
testerAwait()
const server = http.createServer((req, res) => {
    if (req.url === '/api/securerandoms') {
      res.setHeader('Content-Type', 'application/json');
     // res.setHeader('Content-Type', 'text/html'); // now we can use p tag, h2.. etc.

      res.write(`
      ${JSON.stringify(randomString, null, 2)}
      `);
      return res.end();
    }
    
    if (req.url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.write(`<h2>Simple node HTTP server demo</h2>
        <p>Exposes this endpoint <code>/api/securerandoms</code></p>
      `);
      return res.end();
    }
  });
  server.on('connection', (sock) => {
    // You can get the client-IP in here, using sock.remoteAddress)
  });
  server.listen(3000);
  console.log('listening on 3000');

  module.exports = {
   randomString   
  }