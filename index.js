const app = require('express')();
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/graphqlP');

const schema = require('./schema');
app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true
}));

app.listen(9090, () => console.log('Server is running over port 9090'));