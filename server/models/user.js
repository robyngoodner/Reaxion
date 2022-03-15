const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    password: {
        type: String, 
        required: true,
        select: false,
    },
    email: String,
    userName: String,
    description: String,
    userIcon: String,
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