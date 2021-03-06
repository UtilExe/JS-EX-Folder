// 2 Chaining promises (fetch requests)
const fetch = require('node-fetch');
const url = 'https://swapi.dev/api/people/';

function getPlanetforFirstSpeciesInFirstMovieForPerson(id) {
    fetch(url + id)
        .then(res => res.json())
        .then(data => {
            console.log(data.name)
            fetch(data.films[0])
                .then(res => res.json())
                .then(data1 => {
                    console.log(data1.title)
                    fetch(data1.species[0])
                        .then(res => res.json())
                        .then(data2 => {
                            console.log(data2.name)
                            fetch(data2.homeworld)
                                .then(res => res.json())
                                .then(data3 => {
                                    console.log(data3.name)
                                })
                        })
                })
        })
}

getPlanetforFirstSpeciesInFirstMovieForPerson(1)