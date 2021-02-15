const EventEmitter = require("events") // En del af Node's API

class DOS_Detector extends EventEmitter {
    constructor(timeValue){
      super();  //Figure out what it is you have to extend (use moshes video).
      this.urls = new Map();
      this.TIME_BETWEEN_CALLS = timeValue;
    }
    addUrl = (url) =>{
      const time = new Date().getTime();
      if(this.urls.has(url)){
        const deltaTime = time - this.urls.get(url)
        if(deltaTime < this.TIME_BETWEEN_CALLS){
        //  console.log("TODO: Fire the 'DosDetected' event")

        // Raise an event. - signalling an event has happened. Also, need to register a listener, that is interested in this event. A listener is a function that will be called when the event is raised.
          this.emit('DoS', {url : url, timeBetweenCals : deltaTime});
          //Add this info to the event {url:url,timeBetweenCalls:deltaTime}
        }
      }
      this.urls.set(url,time);
    }
 }
 // Export the class using nodes CommonJS module system (require/exports)
module.exports = DOS_Detector