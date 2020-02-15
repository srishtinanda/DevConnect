const express = require('express')

const router = express.Router()
const auth = require('../../middleware/auth')
// import auth from middleware and add as second param to the route to make it protected
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

// @route GET api/auth
// @description - Authorization of user to get token
// @access - Public
router.get('/', auth, async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' })
    }
})
// extract the user data from the token... use asyn await

// import user model nad find the user with the id 
// we can exclude the password from the secure route by using select method and pasing -password
// send the response of user

// -------------------------------
// @route POST api/auth
// @description - LOGIN FOR USER
// @access - Public
router.post('/', [
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Password is required')
], async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }
        const isMAtch = await bcrypt.compare(password, user.password)
        if(!isMAtch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }
        // import json web token
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload,
            config.get('jwtToken'),
            {expiresIn: 360000},
            (err, token) => {
                if(err) throw err
                res.json({ token })
        })
    } catch(error) {
        console.log(error.message)
        return res.status(500).send({ msg: 'Server error' })
    }
})

// authenticate user with POST request /auth
// exactly same as user post data  but need to validate only email and password

// check user email and password 
// bcrypt compares the passwprds with paraams of given pass and encrypted password if match returns a promise
module.exports = router
