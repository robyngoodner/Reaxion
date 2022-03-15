const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const db = require ('../models');


const register = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({
            email: req.body.email
        })

        if(foundUser) {
           
            // const updatedUser = await db.User.findByIdAndUpdate(
            //     {
            //         _id: foundUser._id
            //     },
            //     {
            //         $set: { password: hash }
            //     },
            //     { new: true }
            //)
            console.log(foundUser)
            return res
                .status
                .json({ message: "Email in use."})
        } else {

            const salt = await bcrypt.genSalt(9)
            const hash = await bcrypt.hash(req.body.password, salt)

            const newUser = await db.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email:req.body.email,
                password:hash
            })

            newUser.save();
           const savedUser = newUser.save();

                    return res
                   .status(201)
                   .json({status:201, message:"registered new user", savedUser})

        }
       
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

const login = async(req,res)  => {
    try{
        const foundUser = await db.User.findOne({email: req.body.email}) 
        .select("+password") 
        if (!foundUser) {
            return res 
                .status(400)
                .json({
                    status: 400,
                    message: "Incorrect email or password"
            })
        }
        const isMatch= await bcrypt.compare(req.body.password, foundUser.password)

        if(isMatch){
            const token= jwt.sign({_id:foundUser._id}, "reaxion", {expiresIn: "1h"})
            return res 
                .status(200)
                .json({
                    status: 200,
                    message: "Login successful", 
                    token
                })
        } else {
            return res
                .status(400)
                .json({
                    status: 400,
                    message: "Email or password is incorrect"
                }) 
        }
    } catch(err) {
        return res.status(500)
        .json({
            status: 500,
            errorMsg: err, 
            message: "Internal server error. Refresh your page and try again."
        })
    }
}
module.exports = {
    register,
    login
}