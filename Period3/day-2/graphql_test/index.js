import express from 'express';
import { graphqlHTTP } from 'express-graphql';
require('dotenv').config({ path: __dirname + '/.env' })
console.log("CONNECTION-", process.env.CONNECTION)
import { schema } from './data/schema';
import cors from "cors";

const app = express();
app.use(cors())

app.get('/', (req, res) => {
    res.send('GraphQL is amazing')
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true, // graphiql er et user interface.
}));

app.listen(8080, () => console.log("Running on server PORT localhost:8080/graphql"))