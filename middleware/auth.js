const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token')
    if(!token) {
        res.status(401).json({ msg: 'No Token, authorization denied' })
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtToken'))
        // Because we attached user with id in the attached payload while creating token
        req.user = decoded.user
        next()
    } catch(err) {
        res.status(500).json({ msg: 'Token is not valid' })
    }
}
