const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },
    description: {
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