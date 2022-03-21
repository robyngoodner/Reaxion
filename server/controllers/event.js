// Rest Routes
const db = require('../models');
/*
 * Index - GET - /events  - Presentational - respond with all event
 * New - GET - /events/new  - Presentational Form - a page with a form to create a new event
 * Show - GET - /events/:id  - Presentational - respond with specific event by id
 * Create - Post - /events  - Functional - recieve data from new route to create a event
 * Edit - GET - /events/:id/edit  - Presentational Form - respond with a form prefilled with event data
 * Update - PUT - /events/:id  - Functional - recieve data from edit to update a specific event
 * Delete - DELETE - /events/:id  - Functional - Deletes event by id from request
 */

const index = (req, res) => {
    db.Community.find({Members: req.userId})
        .populate({
            path: 'Events',
            populate : {
                path: 'posts'
            }
        })
        .exec((err, foundCommunity) => {
            if(err) {
                return res  
                    .status(400)
                    .json({
                        message: "Bad request; cannot load communities",
                        err: err
                    })
            }
            return res  
                // .populate({
                //     path: 'Events'
                // })
                .status(200)
                .json({
                    message: "Community and events found",
                    data: foundCommunity
                })
        })
}

const show = (req, res) => {
    // console.log("event show req.params.id",req.params.id)
    // console.log("req.body: ",req.body)
    db.Event.findById(req.params.id)
        //   .populate post reference
        //   .populate({
        //     path : 'Posts',
        //     populate : {
        //       path : 'Comments'
        //     }
        //   })
        .populate("posts")
        .exec((err, foundEvent)=>{
            // console.log("found event", foundEvent);
            if (err){
                return res
                    .status(400)
                    .json({
                        message: "Bad Request; Cannot view event",
                        err: err,
                    })
            } else {
                // console.log("found event", foundEvent)
                return res        
                .status(200)
                .json({
                    message: "Event Found",
                    data: foundEvent
                })
            }
        })
};

const create = (req, res) => {
    let incomingReq={
        facilitator: req.userId,
        title: req.body.title,
        description: req.body.description,
        community: req.body.community
    }
    // console.log("incomingReq: ",incomingReq)
    db.Event.create(incomingReq, (err, savedEvent) => {
        if(err) {
            return res  
                .status(400)
                .json({
                    message: "Failed to create event.",
                    error: err
                })
        } else {
            db.Community.findById(req.body.community, (err, foundCommunity) => {
                if (err) {
                    return res
                        .status(400)
                        .json({
                            message: "Failed to find community",
                            error: err
                        })
                } else {
                //    console.log("found this community to push to: ",foundCommunity)
                //    console.log("is the event saved yet? ", savedEvent._id)
                    foundCommunity.Events.push(savedEvent._id) ;
                    foundCommunity.save();
                    // console.log("Event hopefully: ",foundCommunity.Events)
                }
            })
            return res  
                .status(201)
                .json({
                    message: "Successfully created event.",
                    data: savedEvent
                })
        }
    })
};

module.exports = {
    index,
    show,
    create
}