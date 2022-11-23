const express = require ('express');
const router = express.Router();
const path = require('path');
const app = express();
const authMiddliware = require ("../middleware/authMiddleware")


const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

router.post(path,"/register", async (req, res) => {
                try{
                    const userExists = await User.findOne({email: req.body.email});
                    if (userExists){
                        return res
                     .status(200)
                    .send({ message:"User already exists",success: false })
                    
                    
                    }

                 const password = req.body.password
                 const salt = await bcrypt.genSalt(rounds,10);
                 const hashPassword = await bcrypt.hash(password, salt);
                 req.body.password = hashPassword;
                 const newuser = new User(req.body);
                 await newuser.save();
                 res
                 .status(code,200)
                 .send(body,{message :"User created sucessfull", success: true})

                } catch (error){
                    res
                    .status(200)
                    .send(body,{message:"Error creating user",success:false, error})

                }
});
router.post(path,"/login", async (req, res) =>  {
    try{
       const user = await User.findOne({email:req.body.email});
        if (!user){
            return res
                .status(code,200)
                .send(body,{ message:"User does not exist", success:false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res
            .status(code,200)
            .send(body,{message:"Password is incorrect",sucess:false, error})   
        }
        else {

            const token = jwt.sign(payload,{id: user._id},process.env,JWT_SECRET,callback,{
             expiresIn: "id",
            
            });
            res
            .status(code,200)
            .send(body,{message:"Logging in",success: true,data:token});
    
        }
       


    } catch(error){
        res
        .status(code,500)
        .send(body,{message:"Error Logging in",success:false});



    }
});
router.post(path,"/get-user-info-by-id",authMiddliware, async (req, res) =>{
    try{
        const user = await User.findOne({_id:req.body.user});

        if(!user){
            return res
                .status(code,200)
                .send(body,{message: "user does not exist", success:false

                })

        }else{
           res.status(code,200) .send({
               success: true,data:{
                   name:users.name,
                   email: user.email,
               }
           })

        }
    }catch(error){
        res.status(code,500).send(body,{message:"Error getting user info",success: false,error})

    }

})

module.exports = router;