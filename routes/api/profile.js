const express = require('express')
const router = express.Router()
const request = require('request')
const config = require('config')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { check, validationResult} = require('express-validator')

// @route GET api/profile/me
// @description - get current users profile
// @access - Private
router.get('/me', auth, async (req,res) => {
    try {
const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
// get profile model find by the user id, (user object id from the model)
if(!profile) {
    return res.status(400).json({ msg: 'There is no profile for this user' })
}
return res.json(profile)
// name and avtars can be fetched from other models with method called populate
// res.400 for no profile... there is no profile for this user
// res.json send profile
    } catch(error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' })
    }
}
)

// @route GET api/profile/
// @description - create or update user's profile
// @access - Private

router.post('/', auth, [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty()
], async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        console.log('rdtfyguhijo;kp')
        return res.status(400).json({ errors: [errors.array()] })
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
      } = req.body

      // build profile object
      const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
    
    // build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram 

    try{
    let profile = await Profile.findOne({ user: req.user.id})
    
    if(profile) {
        // update
        profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
        )
        return res.json(profile)
    }

    // create
    profile = new Profile(profileFields)

    await profile.save()

    return res.json(profile)

    } catch(err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route GET api/profile
// @description - get all profiles
// @access - Public
router.get('/', async (req,res) => {
try {
    const profile = await Profile.find().populate('user', ['name', 'avatar'])

    return res.json(profile)
} catch(error) {
    console.log(error.message)
    res.status(500).send({ msg: 'Server Error' })
}
})

// @route GET api/user/:user_id
// @description - get profile by id
// @access - Private
router.get('/user/:user_id', auth, async (req,res) => {
try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])
    if(!profile) {
        return res.status(400).json({ msg: 'Profile not found' })
    }
    return res.json(profile)
} catch(error) {
    console.log(error.message)
    if(error.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Profile not found' })
    }
    res.status(500).send({ msg: 'Server Error' })
}
})

// @route DELETE api/profile
// @description - delete profile and user and comments by user
// @access - Private
router.delete('/', auth, async (req,res) => {
try {
    // todo delete comment 

    // remove profile
    await Profile.findOneAndRemove({user: req.user.id})

    // remove user
    await User.findOneAndRemove({ _id: req.user.id})

    return res.json({ msg: 'User deleted' })
} catch(error) {
    console.log(error.message)
    res.status(500).send({ msg: 'Server Error' })
}
})

// @route PUT api/profile/experience
// @description - add experience to user profile
// @access - Private
router.put('/experience', [ auth, [
    check('title', 'Title is required')
    .not()
    .isEmpty(),
    check('company', 'Company is required')
    .not()
    .isEmpty(),
    check('from', 'From date is required')
    .not()
    .isEmpty()
]
], async (req,res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }
        try {
        // remove profile
        const profile = await Profile.findOne({user: req.user.id})

        // unshift pushes to the beginning rather at the end
        profile.experience.unshift(newExp)
        await profile.save()
    
        return res.json({ msg: 'Profile saved' })
    } catch(error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' })
    }
})

// @route DELETE api/profile/experience
// @description - delete profile experience
// @access - Private
router.delete('/experience/:exp_id', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id})
    
        // remove user experience by id
        const removeIndex = profile.experience.map(
            item => item.id
        ).indexOf(req.params.exp_id)
            
        profile.experience.splice(removeIndex, 1)

        await profile.save()

        res.json(profile)
    } catch(error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' })
    }
})

// @route PUT api/profile/education
// @description - add education to user profile
// @access - Private
router.put('/education', [ auth, [
    check('school', 'school is required')
    .not()
    .isEmpty(),
    check('degree', 'Degree is required')
    .not()
    .isEmpty(),
    check('fieldofstudy', 'Fieldofstudy is required')
    .not()
    .isEmpty(),
    check('from', 'From date is required')
    .not()
    .isEmpty()
]
], async (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        }
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            description
        } = req.body

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            description
        }
        try {
        // remove profile
        const profile = await Profile.findOne({user: req.user.id})

        // unshift pushes to the beginning rather at the end
        profile.education.unshift(newEdu)
        await profile.save()
    
        return res.json({ msg: 'Education details added' })
    } catch(error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' })
    }
})

// @route DELETE api/profile/education
// @description - delete profile education
// @access - Private
router.delete('/education/:edu_id', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id})
    
        // remove user experience by id
        const removeIndex = profile.education.map(
            item => item.id
        ).indexOf(req.params.edu_id)
            
        profile.education.splice(removeIndex, 1)

        await profile.save()

        res.json(profile)
    } catch(error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' })
    }
})

// @route GET api/profile/github/:username
// @description - get github repos
// @access - Public
router.get('/github/:username', (req,res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
            sort=created:asc&client_id=${config.get('githubClientId')}&
            client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }
        request(options, (error, response, body) => {
            if(error) console.error(error)

            if(response.statusCode !== 200) {
                res.status(404).json({ msg: 'No github profile found' })
            }

            res.json(JSON.parse(body))
        }) 

    } catch(error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' })
    }
}
)

module.exports = router
