// Rest Routes
const db = require('../models');
const User = require('../models/user');
const Community = require('../models/Community');
/*
 * Index - GET - /users  - Presentational - respond with all users
 * New - GET - /users/new  - Presentational Form - a page with a form to create a new user
 * Show - GET - /users/:id  - Presentational - respond with specific user by id
 * Create - Post - /users  - Functional - recieve data from new route to create a user
 * Edit - GET - /users/:id/edit  - Presentational Form - respond with a form prefilled with user data
 * Update - PUT - /users/:id  - Functional - recieve data from edit to update a specific user
 * Delete - DELETE - /users/:id  - Functional - Deletes user by id from request
 */


const userProfile= (req,res) => {
    User.find({name: req.user.name},(err,foundUserProfile) => {
        if (err) {
            return res.status(400)
            .json({
                message: "Failed to find the user profile.",
                error: err,
            })
    }  
    Community.find({Members:foundUserProfile[0]._id},(err,foundMembership) => {
    if (err) {
        return res.status(400)
        .json({
            message: "Failed to find the user profile.",
            error: err,
        })
    }
    })
    })
}

const editProfile = (req, res) => {
    db.User.findById(req.params.id, (err,foundProfile) => {
        if (err) {
            return res.status(400)
            .json({
                message: "Failed to edit the profile.",
                error: err,
            })
    }
    })
}

const updateProfile= (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.id,
        {
         name: req.body.name,
         description: req.body.description,
         userIcon: req.body.userIcon   
        },
        {new: true, returnOriginal: false},
        (err,foundProfile) => {
        if (err) {
            return res.status(400)
            .json({
                message: "Failed to edit the profile.",
                error: err,
            })
        }
    })
}

module.exports = {
    userProfile,
    editProfile,
    updateProfile,
}