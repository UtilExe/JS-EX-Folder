// Promises, Task 3.
// npm install node-fetch and npm install @types/node-fetch --save-dev
//const fetch = require('node-fetch');
import fetch from 'node-fetch';

interface IChuckInfo {
    created_at: Date
    icon_url: string
    id: string
    updated_at: Date
    url: string
    value: string
}
function chuckNorrisFetcher(): Promise<IChuckInfo>{
    return fetch("https://api.chucknorris.io/jokes/random")
      .then(res => res.json())
      .then(data => data )
  }
  
  async function chuckNorrisTester() {
    let joke = await chuckNorrisFetcher()
    console.log(joke.value)
  }

chuckNorrisTester()