const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => { // simple routing
  res.send('Hello World!')
})

app.get('/test', (req, res) => { // simple routing
    res.send('Hello tester!')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// app.use(express.static('public'))
