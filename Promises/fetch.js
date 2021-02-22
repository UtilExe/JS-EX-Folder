const fetch = require("node-fetch")

fetch("http://api.icndb.com/jokes/random")
  .then((res) => res.json())
  .then(data => console.log(data))
  .catch(err => console.log("Error: ", err))
  .finally(() => console.log("Finally Done"))