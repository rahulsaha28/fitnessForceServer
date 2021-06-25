const bcrypt = require('bcrypt');


// password bcrypt system
const PasswordBcrypt = async(password)=>{
    const newHashPassword = await bcrypt.hash(password, 10);
    return newHashPassword;
}


// password Check
const PasswordValidationCheck = async(password, hashPassword)=>{
    const checker = await bcrypt.compare(password, hashPassword);
    return checker;
}


module.exports = { PasswordBcrypt, PasswordValidationCheck};
