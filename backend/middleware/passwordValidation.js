console.log('--> active file : passwordValidation.js with password-validator in the middleware');
console.log('--- --- --- --- ---');

// Import
var passwordValidator = require('password-validator');

// Password validation format
var passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)             // min length 8
.is().max(30)            // max length 30
.has().uppercase(1)      // min 1 uppercase
.has().lowercase(1)      // min 1 lowercase
.has().digits(1)         // min 1 digit
.has().symbols(1)        // min 1 symbol
.has().not().spaces()    // not space allowed

// Export
module.exports = (req, res, next) => {
    // IF the password validation format is not correct
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({message: "Password should have at least and/or be like : min length 8, 1 uppercase, 1 lowercase, 1 digit, 1 symbol and no space allowed !"});
        console.log(passwordSchema.validate(req.body.password, { list: true }));
    } 
    // ELSE : the password validation format is correct
    else {
        next()
    }
}