const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const postSchema = new Schema(
  {
        User: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        //Content is the reaction
        content: {
            type: String
        },
        User_Comment:  {
            type: String
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "Comment",
                 },
        Comments: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
                 }],
        upVotes: {
            type:Number
        },
        Event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
                },
        isAnonymous: {
            type: Boolean
        }
    },
        {
            timestamps: true,
        }
        
   
)

module.exports = mongoose.model("Post", postSchema);