const db = require("../models");

// Rest Routes
/*
 * Index - GET - /comments  - Presentational - respond with all comment
 * New - GET - /comments/new  - Presentational Form - a page with a form to create a new comment
 * Show - GET - /comments/:id  - Presentational - respond with specific comment by id
 * Create - Post - /comments  - Functional - recieve data from new route to create a comment
 * Edit - GET - /comments/:id/edit  - Presentational Form - respond with a form prefilled with comment data
 * Update - PUT - /comments/:id  - Functional - recieve data from edit to update a specific comment
 * Delete - DELETE - /comments/:id  - Functional - Deletes comment by id from request
 */


const show = (req, res) => {
    db.Comment.findById(req.params.id)
          //.populate post reference
          .populate({
            path : '/comment',
            populate : {
              path : 'comments'
            }
          })
        .exec((err, createdComment)=>{
            if (err){
                return res
                    .status(400)
                    .json({
                        message: "Bad Request; Cannot view comment",
                        err: err,
                    })
            }
            return res        
            .populate({
            path: 'posts',
        })
                .status(200)
                .json({
                    message: "Comment Found",
                    data: createdComment
                })
        })
};




const create = (req, res) => {
    db.Comment.create(req.body, (err, createdComment) => {
        console.log(createdComment)
        if(err) {
            return res  
                .status(400)
                .json({
                    message: "Failed to create a comment.",
                    error: err
                })
        }
        return res  
            .status(201)
            .json({
                message: "Successfully created a comment.",
                data: createdComment
            })
    })
};



const update = (req, res) => {
    db.Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}, (err, updatedComment) => {
            if(err) {
                return res.status(400).json({
                    message: "Error 400",
                    error: err,
                })
            }
            return res.status(200).json({
                message: "Updated Comment",
                data: updatedComment
            })
        }
    )
}

const destroy = (req, res) => {
    db.Comment.findOneAndDelete(
        req.params.id,
        (err, deletedComment) => {
            if(err) {
                return res.status(400).json({
                    message: "Error 400",
                    error: err
                })
            }
            return res.status(200).json({
                message: "Deleted Comment",
                data: deletedComment
            })
        }
    )
}


module.exports = {
    create,
    show,
    update,
    destroy
}