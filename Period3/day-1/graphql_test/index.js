import express from 'express';
import schema from './schema';
import { graphqlHTTP } from 'express-graphql';

const app = express();

app.get('/', (req, res) => {
    res.send('GraphQL is amazing')
});

const root = { friend: () => {
    return {
        "id": 535553,
        "firstName": "Manny",
        "lastName": "Henry",
        "gender": "Male",
        "emails": [
            { email: "me@me.com"},
            { email: "new@new.com"}
        ]
    }
}};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // graphiql er et user interface.
}));

app.listen(8080, () => console.log("Running on server PORT localhost:8080/graphql"))