const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const db = require ('../models');


const register = async (req, res) => {
    // console.log( req.body)
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
            // console.log("inside founduser if statement")
            return res
                .status
                .json({ message: "Email in use."})
        } else {
            // console.log("elseee")
            
            const salt = await bcrypt.genSalt(9)
            const hash = await bcrypt.hash(req.body.password, salt)

            const newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email:req.body.email,
                password:hash
            }

            
            //  console.log(newUser)

          const createdUser = db.User.create(newUser)
                .then((err, createdUser) => {
                //    console.log("new user created " + createdUser)
        
                })
      
                    return res
                   .status(201)
                   .json({status:201, message:"registered new user", createdUser})
            }
    } catch (err) {
        return res
            .status(500)
            .json({
                status: 500,
                errorMsg: err,
                message: "Internal Server Error."
            })
    }
}

const login = async(req,res)  => {
    // console.log('in login!!');
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
            // console.log('is a match')
            const token= jwt.sign({_id:foundUser._id}, "reaxion", {expiresIn: "48h"}
            )
            return res 
                .status(200)
                .json({
                    status: 200,
                    message: "Login successful", 
                    token
                })
        } else {
            // console.log('cant log in')
            return res
                .status(400)
                .json({
                    status: 400,
                    message: "Email or password is incorrect."
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