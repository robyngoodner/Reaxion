const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({

        _id: {type: mongoose.Schema.Types.ObjectId},
        comment: {type: String, requied: true},
        Post: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],
        upvote: {type: Number},
        User: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        isAnonymous: {type: Boolean}
    },
    {
        timeStamp: true,
    }
)

module.exports = mongoose.model('Comment',commentSchema);