const EventEmitter = require('events');
var url = 'http://mylogger.io/log';

// Naming classes: Uppercase
class Logger extends EventEmitter {

    // the variable and function is scoped to this module, if we dont import it from other files.
     log(message) { // this is a method. because when a function is inside a class, we say it's a method.
    // Send a HTTP request
    console.log(message);

    // Raise an event
    this.emit('messageLogged', { id: 1, url: 'http://' });
}
}

// adding a method called log to this export object
module.exports = Logger;
// kunne også have skrevet:
//module.exports = log; // så er det ikke længere et objekt, men en funktion som vi kan kalde direkte, i modulet vi importerer den i.

// module.exports.endPoint = url;