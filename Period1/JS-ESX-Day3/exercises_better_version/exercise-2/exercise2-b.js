// b) with async/await
const fetch = require('node-fetch');
const url = 'https://swapi.dev/api/people/';

async function getPlanetforFirstSpeciesInFirstMovieForPersonAsync(id) {
    try {
        const p1 = await fetch(url + id).then(res => res.json())
        const p2 = await fetch(p1.films[0]).then(res => res.json())
        const p3 = await fetch(p2.species[0]).then(res => res.json())
        const p4 = await fetch(p3.homeworld).then(res => res.json())
        const result = await Promise.all([p1.name, p2.title, p3.name, p4.name]);
        return result
    } catch (err) {
        console.log(err)
    }
}

getPlanetforFirstSpeciesInFirstMovieForPersonAsync(1)
.then((res) => {
    console.log(res)
})