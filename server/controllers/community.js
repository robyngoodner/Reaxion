const db=require('../models')

// Rest Routes
/*
 * Index - GET - /communities  - Presentational - respond with all community
 * New - GET - /communities/new  - Presentational Form - a page with a form to create a new community
 * Show - GET - /communities/:id  - Presentational - respond with specific community by id
 * Create - Post - /communities  - Functional - recieve data from new route to create a community
 * Edit - GET - /communities/:id/edit  - Presentational Form - respond with a form prefilled with community data
 * Update - PUT - /communities/:id  - Functional - recieve data from edit to update a specific community
 * Delete - DELETE - /communities/:id  - Functional - Deletes community by id from request
 */

const createCommunity = (req, res) => {
    db.Community.create(req.body, (err, createdCommunity) => {
        if (err) {
            return res.status(400).json({
                message: "Failed",
                error: err,
            })
        };
        db.User.findById(CreatedCommunity.User)
        .exec(function (err, foundUser) {
            if (err) {
                return res.status(400).json({
                    message: "Failed",
                    error: err,
                })
            };

            foundUser.Facilitator_Communities.push(createdCommunity);
            createdCommunity.save();
            foundUser.save();

            return res.status(200).json({
                message: "Success",
                data: createdCommunity,
            })
        })
    })

};


module.exports = {
    createCommunity
}