const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const db = require ('../models');


const register = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({
            email: req.body.email
        })

        if(foundUser) {
            const salt = await bcrypt.genSalt(9)
            const hash = await bcrypt.hash(req.body.password, salt)

            const updatedUser = await db.User.findByIdAndUpdate(
                {
                    _id: foundUser._id
                },
                {
                    $set: { password: hash }
                },
                { new: true }
            )
            return res
                .status(201)
                .json({
                    status: 201,
                    message: "User successfully registered.",
                    updatedUser
                })
        }
        return res  
            .status(400)
            .json({
                status: 400,
                message: "Registration failed; please try again."
            })
    } catch (err) {
        return res
            .status(500)
            .json({
                status: 500,
                errorMsg: err,
                message: "Internal server error. Refresh your page and try again."
            })
    }
}