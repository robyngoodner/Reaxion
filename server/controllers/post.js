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
const jwt = require('jsonwebtoken');
const { findById } = require('../models/user');


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

const create = (req, res) => {
    db.Post. create(
        req.body, 
        (err, savedPost) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                message: "Error 400",
                error: err 
            })
        }
        return res.status(201).json({
            message: "Created Post",
            data: savedPost
        })
    })
}

const update = (req, res) => {
    db.Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}, (err, updatedPost) => {
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
    destroy
}    