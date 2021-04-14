import express from 'express';
import schema from './schema';
import { graphqlHTTP } from 'express-graphql';
import resolvers from './resolvers';

const app = express();

app.get('/', (req, res) => {
    res.send('GraphQL is amazing')
});

const root = resolvers;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // graphiql er et user interface.
}));

app.listen(8080, () => console.log("Running on server PORT localhost:8080/graphql"))