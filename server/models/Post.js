const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const User = require("../models/User");
const Comment = require("../models/Comment");

const postSchema = new Schema(
    {
        
        user: {type:mongoose.Schema.Types.ObjectId,
               ref:"user"},
        content: {type:String},
        user_comment:  {
            type: mongoose.Schema.Types.ObjectId,
            ref:"comment",
                 },
        comments:[{ type:mongoose.Schema.Types.ObjectId,
                    ref:"comment"
                 }],
        upVotes:{type:Number},
        community: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"community"
                },
        isAnonymous:{type:Boolean},
        
    }
   
)

module.exports = mongoose.model("Post", postSchema);