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

const show = (req, res) => {
    db.Post.findById(req.params.id, (err, foundPost) => {
        if (err) {
            return res
                .status(400)
                .json({
                    message: "Bad Request; Cannot view event",
                    err: err,
                })
        }
        return res
            .status(200)
            .json({
                message: "Event Found",
                data: foundPost
            })
    })
}


module.exports = {
    show,

}