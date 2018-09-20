const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');

const User = require('./Types/User');
const Post = require('./Types/Post');


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        ...User.queries,
        ...Post.queries
    }
})


const mutations = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        ...User.mutations,
        ...Post.mutations
    }
})


module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:mutations
})