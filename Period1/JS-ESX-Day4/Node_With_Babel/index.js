//const fetch = require('node-fetch');
import fetch from "node-fetch"

function messageDelay(msg, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const upperCased = msg.toUpperCase();
            resolve(upperCased)
        }, delay)
    })
}

const promises = [
    messageDelay("Hi", 1300),
    messageDelay("Hi Class", 700),
    messageDelay("promises are cool", 500),
    messageDelay("hello world", 1700),
]

Promise.any(promises).then((upperCased) => console.log(upperCased));