
// const jwt = require('jasonwebtoken');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'Muhammad ALi is a nice body'
// Middleware function
const fetchuser = (req, res, next) => {


    // getting from header
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please use a valid token" });
    }
    try {
        // to verify the token
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        // take next middleware    
        next();

    } catch (error) {
         console.error(error.message)
         res.status(401).send({ error: "Please use a valid token" });
    }
}
module.exports = fetchuser;