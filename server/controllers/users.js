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

//Show user profile
const show= (req,res) => {
    // let incomingReq = {
    //     User: req.userId,
    //     Communities: req.body.Communities,
    //     Facilitator_Communities: req.body.Facilitator_Communities,
    //     Posts: req.body.Posts,
    //     Comments: req.body.Comments,
    //     firstName: User.firstName,
    // }
    db.User.findById(req.userId, (err,foundUserProfile) => {
        if (err) {
            return res.status(400)
            .json({
                message: "Failed to find the user profile.",
                error: err,
            })
    }  
    })
    
}

//Update profile 
const updateProfile= (req, res) => {
    console.log("req.body: ", req.body)
    console.log("userId: ", req.userId)
    db.User.findByIdAndUpdate(
        {_id: req.userId },
        {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                description: req.body.description,
                userIcon: req.body.userIcon  
            }
        }, 
        {new: true},
        (err,foundProfile) => {
            console.log("found profile line 55: ",foundProfile)
        if (err) {
            return res.status(400)
            .json({
                message: "Failed to edit the profile.",
                error: err,
            })
        } 
        //else {
        //     console.log(foundProfile);
        //     foundProfile[0].push(req.userId.firstName)
        //     foundProfile[0].save();
        // }
         else {
            console.log("found profile line 69: "+foundProfile)
            return res.status(200).json({
                message: "Updated User Profile",
                data: foundProfile,
                id: req.userId
        })
    }
    })
}

//delete profile

const destroy = (req, res) => {
    console.log("backend");
    db.User.findByIdAndDelete(req.userId, (err, deleteUser)=>{
        if (err) {
        return res
        .status(400)
        .json({
            message: "Bad Request; Profile could not be deleted",
            error: err,
        })
    }else{
    return res
        .status(200)
        .json({
            message: "Profile Deleted",
            data: deleteUser
        })
    }
    })
}

module.exports = {
    show,
    updateProfile,
    destroy,
}

