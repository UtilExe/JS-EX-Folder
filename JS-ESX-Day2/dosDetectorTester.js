const DosDetector = require('./dosDetector')

const tester = new DosDetector();
//tester.urls = 'https://emucoach.com'
tester.urls.set('https://emucoach.com', 10)
tester.TIME_BETWEEN_CALLS = 1;
tester.addUrl('https://emucoach.com')