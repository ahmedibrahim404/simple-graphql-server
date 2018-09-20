'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PostSchema = new Schema({
    id:{ type:Number },
    username: { type:String, required:true },
    title:{ type:String, required:true },
    text:{ type:String, required:true },
})

var PostModel = mongoose.model('Post',PostSchema);

// Auto Increment to User Id 
PostSchema.pre('save', function(next) {
    var id = 1;
    PostModel.findOne({}).sort('-id').exec(async (err, item) => {
        if(item){
            id = await item.id + 1;     
            this.id = id;
            console.log(id)                
            next();        
        } else {
            this.id = 1;
            next();
        }
    });
});

module.exports = PostModel