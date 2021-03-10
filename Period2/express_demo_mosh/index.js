const Joi = require('joi') // A class
const express = require('express');
const app = express();

// related to request body
app.use(express.json())

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}
]
// http verbs, as we know it.
// second parameter: callback (also called route handler in this case)
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);
    if (result.error) {
        // 400 Bad Request
        return res.status(400).send(result.error.details[0].message)
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // 404
       return res.status(404).send('The course with the given ID, was not found.')
    res.send(course);
    
})

app.put('/api/courses/:id', (req, res) => {
    // Find
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // 404
       return res.status(404).send('The course with the given ID, was not found.')

    // Validate, todo with Joi

    // Update course
    course.name = req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)  // 404
       return res.status(404).send('The course with the given ID, was not found.')
    
    // Validate, todo with Joi
    
    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

// PORT
// Checker om vi har en miljøvariabel kaldet PORT på production level specificeret. Hvis ikke, så bliver default porten 3000 blot brugt.
// Kan sætte environment variable på Windows via: set PORT=3000 (virker dog ikke når jeg tester) or export PORT=3000 på Mac.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

