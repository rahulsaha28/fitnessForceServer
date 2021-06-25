const express = require('express');
const route = express.Router();

const { User } = require('../Model/DatabaseConnection');
const {PasswordBcrypt, PasswordValidationCheck} = require('../Util/PasswordBcrypt');
const {UserLoginCreateJwt} = require('../Util/UserLoginJWT');



// signup request
route.post('/signup', async (req, res) => {

    try {
        const { email, password, name } = req.body;
        if (email && password && name) {

            const getUser = await User.findOne({ email });
            if(!getUser){
                const newHashPassword = await PasswordBcrypt(password);
                const user = await new User({ name, email, password:newHashPassword });
                await user.save();
                
                res.status(200).json({message: "User Created Successfully."}); 
            }
            else{
                res.status(500).json({ err:"Fail to Signup" });
            }

        }
        else{
            res.status(500).json({err:"Fail to Signup"});
        }
    }
    catch (err) {
        res.status(500).json(err);
    }



});

// login request
route.post('/login', async(req, res)=>{

    try{
        const { email, password } = req.body;
        if(email && password){

            const validUser = await User.findOne({email});
            if(validUser){
                const checkPassword = await PasswordValidationCheck(password, validUser.password);
                if(checkPassword){
                    const userToken = await UserLoginCreateJwt({ email:validUser.email, name:validUser.name });
                    res.status(200).json({token:userToken});
                }
                else{
                    res.status(500).json({err:"Unauthorized user."});
                    
                }
            }
            else{
                res.status(500).json({err:"Unauthorized user."}); 
            }

        }
        else{
            res.status(500).json({err:"Unauthorized user."});
        }

    }
    catch(err){
        res.status(500).json(err);
    }

});











module.exports = route