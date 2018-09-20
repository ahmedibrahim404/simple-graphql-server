const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLID } = require('graphql');

var PostModel = require('../../Schemas/post');

const PostType = new GraphQLObjectType({
    name:'Post',
    fields:{
        id: { type:GraphQLID },
        username: { type:GraphQLString },
        title: { type:GraphQLString },
        text: { type:GraphQLString }
    }
})

module.exports.type = PostType;

module.exports.queries = {
    post:{
        type:PostType,
        args:{
            id:{type:GraphQLString},
        },
        async resolve(parentValue, args){
            let postToRes = PostModel.findOne({id:args.id}, async (err,post) => {
                return await post;
            })
            return await postToRes; 
        }
    },
    posts: {
        type:new GraphQLList(PostType),
        async resolve(parentValue, args){
            var postsToRes = PostModel.find({}, async function(err,posts){
                return await posts;
            });
            return await postsToRes;
        }
    }
}



module.exports.mutations = {
    addPost:{
        type:PostType,
        args:{
            username: { type:GraphQLString },
            title:{ type: GraphQLString },
            text:{ type: GraphQLString },
        },
        resolve(parentValue, args){
            var NewPost = new PostModel({
                username: args.username,
                title: args.title,
                text: args.text
            }).save().then((post) => {
                return post;
            });
            return NewPost;
        }
    }
}