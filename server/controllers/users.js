// Rest Routes
const db = require('../models');
/*
 * Index - GET - /users  - Presentational - respond with all users
 * New - GET - /users/new  - Presentational Form - a page with a form to create a new user
 * Show - GET - /users/:id  - Presentational - respond with specific user by id
 * Create - Post - /users  - Functional - recieve data from new route to create a user
 * Edit - GET - /users/:id/edit  - Presentational Form - respond with a form prefilled with user data
 * Update - PUT - /users/:id  - Functional - recieve data from edit to update a specific user
 * Delete - DELETE - /users/:id  - Functional - Deletes user by id from request
 */


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

models.exports = {
    destroy,
}

