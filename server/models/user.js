const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    email: String,
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

const User = mongoose.model('User', userSchema);

module.exports = User;