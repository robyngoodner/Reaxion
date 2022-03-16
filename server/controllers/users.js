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


const show= (req,res) => {
    db.User.find({name: req.user.name},(err,foundUserProfile) => {
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
         firstName: req.body.firstName,
         lastName: req.body.lastName,
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

//delete profile

const destroy = (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (err, deleteUser)=>{
        if (err) {
        return res
        .status(400)
        .json({
            message: "Bad Request; Profile could not be deleted",
            error: err,
        })
    }
    return res
        .status(200)
        .json({
            message: "Profile Deleted",
            data: deleteUser
        })
    })
}

module.exports = {
    show,
    editProfile,
    updateProfile,
    destroy,
}

