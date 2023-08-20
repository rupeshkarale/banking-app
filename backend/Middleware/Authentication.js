const jwt = require("jsonwebtoken")

const Authenticate = (req, res, next) => {

    const token = req.headers?.authorization?.split(" ")[1]
    if (token) {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        if (decoded) {
            const userId = decoded.userId
            req.body.user = userId;
            next()
        }
        else {
            res.status(400).send("Please login")
        }
    } else {
        res.status(400).send("please login")
    }





}
module.exports = Authenticate;