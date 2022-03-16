const db = require('../models')

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

const createCommunity = async (req, res) => {


//     const newCommunity = req.body;
    

//     const createdCommunity = db.Community.create(newCommunity)
//     .then((err, createdCommunity) => {
//         console.log("createdCommunity" + createdCommunity)

//     })

    // await db.Community.create(req.body, (err, createdCommunity) => {
    //     if (err) {
    //         return res.status(400).json({
    //             message: "Failed",
    //             error: err,
    //        })
      //  };
       // db.User.findByIdAndUpdate(createdCommunity.Facilitator)

    console.log("is console.log working")
    console.log("req.body", req.body);
    await db.Community.create(req.body, (err, createdCommunity) => {
        if (err) {
            return res.status(400).json({
                message: "Failed community creation",
                error: err,
            })
        };
       db.User.findById(createdCommunity.Facilitator)
        .exec(function (err, foundUser) {
            if (err) {
                return res.status(400).json({
                    message: "Failed to find user",
                    error: err,
                })
            };

           

            return res.status(200).json({
                message: "Success",
                data: createdCommunity,
            })
        })
    };

const joinCommunity = (req, res) => {
    db.Community.find({ keyword: req.body.keyword })
        .exec((err, foundCommunity) => {
            if (err) {
                return res
                    .status(400)
                    .json({
                        message: "Failed to join community",
                        error: err,
                    })
            } else {
            foundCommunity.Members.push(req.body.user);
            foundCommunity.save();
            return res
                .status(200)
                .json({
                    message: "Successfully joined community",
                    data: foundCommunity
                })
            }
        })
}


module.exports = {
    createCommunity,
    joinCommunity
}