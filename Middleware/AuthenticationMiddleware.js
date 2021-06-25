// authentication middleware that check for authenticate user

const { UserVerify } = require("../Util/UserLoginJWT");

const AuthenticateUser = async(req, res, next) => {


    try {
        const userToken = await req.get('token');
        if (userToken) {

            const token = userToken.split(' ')[1];
            if(token){
                // decode the jwt token
                const decodeToken = await UserVerify(token);
                
                if(decodeToken?.email){
                    // decoding the user
                    req.body.email = decodeToken.email;
                    next();
                }
                else{
                    next('Unauthenticated User');
                }
            }
            else{
                next('Unauthenticated User');
            }

        }

    }
    catch (err) {
        
        next('Unauthenticated User');
    }



}

module.exports = AuthenticateUser;