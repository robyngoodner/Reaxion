const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    password: {
        type: String, 
        // required: true,
        select: false,
    },
    firstName:String,
    lastName:String,
    email: String,
    description: String,
    userIcon: {type: String, default:"/images/Happy.png"},
    Communities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    }],
    facilitator: {
        type: Boolean
    },
    Facilitator_Communities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    }],
    Posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    Comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

module.exports = mongoose.model('User', userSchema);