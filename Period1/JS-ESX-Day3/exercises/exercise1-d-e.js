const makeSecureRandoms = require('./exercise1.js')

/*d) Create a new file and test the module, like so:
First, using plain promises
*/

const randomStringsB = {
    title: "6 Secure Randoms",
    randoms: []
}

// duplicate from exercise1.js (commented out though). how can we prevent promise responses in separate variables? (ask Lars)
const p1 = makeSecureRandoms(sizeValue = 48)
const p2 = makeSecureRandoms(sizeValue = 40)
const p3 = makeSecureRandoms(sizeValue = 32)
const p4 = makeSecureRandoms(sizeValue = 24)
const p5 = makeSecureRandoms(sizeValue = 16)
const p6 = makeSecureRandoms(sizeValue = 8)
const promises = [p1, p2, p3, p4, p5, p6]

Promise.all(promises)
    //.then(d => console.log("Plain promise:", d))
    .catch(e => console.log("Error ", e))

// after that, using async/await
async function testerAwait() {
    try {
        // same duplicate issue, can it be prevented? any good ideas?
        const p1 = makeSecureRandoms(sizeValue = 48)
        const p2 = makeSecureRandoms(sizeValue = 40)
        const p3 = makeSecureRandoms(sizeValue = 32)
        const p4 = makeSecureRandoms(sizeValue = 24)
        const p5 = makeSecureRandoms(sizeValue = 16)
        const p6 = makeSecureRandoms(sizeValue = 8)
        // using await, parallel
        const result = await Promise.all([p1, p2, p3, p4, p5, p6]);
        randomStringsB.randoms.push(result)
        //console.log("Await response: ", result)
    } catch (err) {
        console.log(err)
    }
}
testerAwait()

/*
e)  Implement a simple REST-endpoint that returns a JSON-object as sketched above, given this URL: 	api/securerandoms
*/
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/api/securerandoms') {
      res.setHeader('Content-Type', 'application/json');
      //res.setHeader('Content-Type', 'text/html'); // now we can use p tag, h2.. etc.
   
                        // converting from object to JSON, and setting pretty printing
      var myJSON = JSON.stringify(randomStringsB, null, 2)
      res.write(`
      ${myJSON}
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