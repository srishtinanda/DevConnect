const express = require('express')

const router = express.Router()
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const config = require('config')

// @route POST api/users
// @description - Register users....
// @access - Public
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please include a valid email address').isEmail(),
    check('password',
    'please enter a password with 6 or more characters')
    .isLength({ min: 6 })
], async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        })
        // gravatar not adding to user
        user = new User({
            name,
            email,
            avatar,
            password
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        
        await user.save()

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

// Get users gravatar
// set options to s: '200', r: 'pg', d:'mm'

// create new user instance ... save it to trhe database after exncrypting password

// Encrypt password
// use bcrypt.genSalt(10)
// bcrypt.hash(password, salt)
// await user save

// Return jsonwebtoken

module.exports = router
