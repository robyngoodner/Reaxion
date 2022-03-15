const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: true
    },
    descripion: {
        type: String,
    },  
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],    
    facilitator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isActive: {
        type: Boolean,
    },
    isPublic: {
        type: Boolean
    },
},
    {
        timeStamp: true,
    }
)

module.exports = mongoose.model("Event", eventSchema);