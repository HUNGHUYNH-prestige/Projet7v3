console.log('--> active file : auth.js with jsonwebtoken in the middleware');
console.log('--- --- --- --- ---');
// Import
const jwt = require('jsonwebtoken');

// Export
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;

        // IF the user id in the req body is not the user id
        if (req.body.userId && req.body.userId !== userId) {
            throw "USER ID IS NOT CORRECT !";
        }
        // Si l'ID utilisateur correspond
        else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('You cannot !')
        })
    }
}