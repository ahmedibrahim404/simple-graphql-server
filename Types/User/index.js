const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLID } = require('graphql');

var UserModel = require('../../Schemas/user');
var PostType = require('../Post').type
var PostModel = require('../../Schemas/post');

const UserType = new GraphQLObjectType({
    name:'User',
    fields: {
        id: { type:GraphQLID },
        username: { type:GraphQLString },
        email: { type:GraphQLString },
        password: { type:GraphQLString },
        posts: {
            type:new GraphQLList(PostType),
            async resolve(parentValue, args){
                let postsToRes = PostModel.find({username:parentValue.username}, async (err,posts) => {
                    return await posts;
                })
                return await postsToRes; 
            }
        }
    }
})

module.exports.type = UserType;

module.exports.queries = {
    user:{
        type:UserType,
        args:{
            id:{type:GraphQLString},
        },
        async resolve(parentValue, args){
            let userToRes = UserModel.findOne({id:args.id}, async (err,user) => {
                return await user;
            })
            return await userToRes; 
        }
    },
    users:{
        type:new GraphQLList(UserType),
        async resolve(parentValue, args){
            var usersToRes = UserModel.find({}, async function(err,users){
                return await users;
            });
            return await usersToRes;
        }
    }
}


module.exports.mutations = {
    addUser:{
        type:UserType,
        args:{
            username:{ type: GraphQLString },
            email:{ type: GraphQLString },
            password:{ type: GraphQLString },
        },
        resolve(parentValue, args){
            var NewUser = new UserModel({
                username: args.username,
                email: args.email,
                password: args.password
            }).save().then((user) => {
                return user;
            });
            return NewUser;
        }
    }
}