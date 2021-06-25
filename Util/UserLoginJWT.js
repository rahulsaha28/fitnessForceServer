const jsonWebToken = require('jsonwebtoken');

// create json web token for user
const UserLoginCreateJwt = async(UserInfo)=>{

    const userToken =   jsonWebToken.sign(UserInfo, process.env.SERVER_SIGN);

    return userToken;
   
}

const UserVerify = async(token)=>{
    const decode =  await jsonWebToken.verify(token, process.env.SERVER_SIGN);
    return decode;
} 

module.exports = {UserLoginCreateJwt, UserVerify};