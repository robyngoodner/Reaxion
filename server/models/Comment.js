const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({

        comment: {
            type: String, 
            requied: true
        },
        Post: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],
        upvote: {
            type: Number
        },
        User: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        isAnonymous: {
            type: Boolean
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Comment', commentSchema);