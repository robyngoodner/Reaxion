const mongoose = require("mongoose");
//const User = require('./User');
//const Events = require('./Event');
//const Post = require('./Post');
const communitySchema = new mongoose.Schema ({
    communityName: {
        type: String,
        require: true
    },
    Facilitator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    Members: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }],
    Events: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Event"
    }],
    keyword: {
        type: String,
        // required: true, 
        unique: true
    }
})

module.exports = mongoose.model("Community", communitySchema)