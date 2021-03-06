const DosDetector = require('./dosDetector')

const tester = new DosDetector(2000);

// Register a listener. on is alias for addListener()
tester.on('DoS', (arg) => {
    console.log('DoS attack detected', arg);
});

tester.addUrl('https://google.com')

setTimeout(() => {
    tester.addUrl("https://google.com");
}, 1000)
setTimeout(() => {
    tester.addUrl("https://google.com");
}, 2000)