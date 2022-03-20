// Rest Routes
/*
 * Index - GET - /posts  - Presentational - respond with all posts
 * New - GET - /posts/new  - Presentational Form - a page with a form to create a new post
 * Show - GET - /posts/:id  - Presentational - respond with specific post by id
 * Create - Post - /posts  - Functional - recieve data from new route to create a post
 * Edit - GET - /posts/:id/edit  - Presentational Form - respond with a form prefilled with post data
 * Update - PUT - /posts/:id  - Functional - recieve data from edit to update a specific post
 * Delete - DELETE - /posts/:id  - Functional - Deletes post by id from request
 */

const db = require("../models");


const showOne = (req, res) => {
    db.Post.findById(
        req.params.id, 
        (err, foundPost) => {
        if(err) {
            return res.status(400).json({
                message: "Error 400",
                error: err,
            })
        }
        return res.status(200).json({
            message: "Found Post",
            data: foundPost,
        })
    })
}

const index = (req, res) => {
    let incomingReq = {
        User: req.userId,
    }
    db.Post.find(incomingReq, (err, foundPosts) => {
        if (err) {
            return res
                .status(400)
                .json({
                    message: "Error 400",
                    err: err,
                })
        }
        return res
            .status(200)
            .json({
                message: "Found posts",
                data: foundPosts
            })
    })
}


const create = (req, res) => {
    let incomingReq = {
        User: req.userId,
        content: req.body.content,
        User_Comment: req.body.User_Comment,
        Event: req.body.Event
    }

    db.Post.create(
        incomingReq, 
        (err, savedPost) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                message: "Error 400",
                error: err 
            })
        } else {
            console.log("savedPost: ",savedPost)
            db.User.findById(incomingReq.User)
            .exec(function (err, foundUser) {
                if (err) return res 
                    .status(400)
                    .json({
                        message: "Failed to find user to create post",
                        error: err
                    })
                else {
                    foundUser.Posts.push(savedPost);
                    foundUser.save();
                }
            });
            db.Event.findById(incomingReq.Event)
            .exec(function (err, foundEvent) {
                if (err) return res
                    .status(400)
                    .json({
                        message: "Failed to find event to create post",
                        error: err
                    })
                else{
                    console.log("foundEvent",foundEvent)
                    foundEvent.posts.push(savedPost);
                    foundEvent.save();
                }
            });  
            return res.status(201).json({
                message: "Created Post",
                data: savedPost
            })
        }
    })
}

const update = (req, res) => {
    console.log('before findbyid')
    console.log("req.params", req.params.id)
    console.log("req.body", req.body)
    db.Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}, (err, updatedPost) => {
            console.log("req.params", req.params.id)
            console.log("req.body", req.body)
            if(err) {
                return res.status(400).json({
                    message: "Error 400",
                    error: err,
                })
            }
            return res.status(200).json({
                message: "Updated Post",
                data: updatedPost
            })
        }
    )
}

const destroy = (req, res) => {
    db.Post.findOneAndDelete(
        req.params.id,
        (err, deletedPost) => {
            if(err) {
                return res.status(400).json({
                    message: "Error 400",
                    error: err
                })
            }
            return res.status(200).json({
                message: "Deleted Post",
                data: deletedPost
            })
        }
    )
}


module.exports = {
    showOne,
    create,
    update,
    destroy,
    index
}    