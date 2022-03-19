const db = require('../models')
const jwt = require('jsonwebtoken');
const { findById } = require('../models/user');

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


const index =  (req, res) => {
     db.Community.find({Facilitator: req.userId}, (err, foundCommunities) => {
        // console.log("community controller ",req.userId);
        // console.log ("foundCommunity",foundCommunities)
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
                message: "Found communities",
                data: foundCommunities
            })
    })
}

const createCommunity = async (req, res) => {
    let incomingReq = {
        Facilitator: req.userId,
        communityName: req.body.communityName,
        keyword: req.body.keyword
    }
    await db.Community.create(incomingReq, (err, createdCommunity) => {
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
                user: foundUser
            })
        })
    })
}

const joinCommunity =  (req, res) => {
    // const bearerHeader = req.headers.authorization;
    // const token = bearerHeader.split(' ')[1];
    // const payload = await jwt.verify(token, 'reaxion')
    // req.userId = payload._id;
    // console.log("Req: ", req.userId)
  
    let user = req.userId;
     db.Community.find({ keyword: req.params.id }, 
        (err, foundCommunity) => {
            if (err) {
                return res
                    .status(400)
                    .json({
                        message: "Failed to join community",
                        error: err,
                    })
            } else {
                console.log('joined',foundCommunity[0].Members)
            foundCommunity[0].Members.push(user);
            foundCommunity[0].save();
            return res
                .status(200)
                .json({
                    message: "Successfully joined community",
                    data: foundCommunity
                })
            }
        })
}

const getAll = (req, res) => {
    db.Community.findById(req.params.id, (err, foundCommunity) => { if (err) { 
        return res
            .status(400)
            .json({ error: err }) 
        } else { 
            return res
                .status(200)
                .json({ 
                    message: "Found Community",
                    data: foundCommunity,
                })}

    })
}


module.exports = {
    index, 
    createCommunity,
    joinCommunity,
    getAll
}