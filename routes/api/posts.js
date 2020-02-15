const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const auth = require('../../middleware/auth')
const Post = require('../../models/Posts')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route POST api/posts
// @description - create posts
// @access - Private
router.post('/', [auth,
    [
        check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
], async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id).select('-password')

        const newPost = new Post ({ 
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save()

        res.json(post)

    } catch(error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' })
    }
    
})

// @route GET api/posts
// @description - get all posts 
// @access - Private
router.get('/', auth, async (req,res) => {
    try {
        // most recent first
        const posts = await Post.find().sort({ date: -1})
        res.json(posts)

    } catch(error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' })
    }
    
})

// @route GET api/posts/:id
// @description - get posts by id
// @access - Private
router.get('/:id', auth, async (req,res) => {
    try {
        const posts = await Post.findById(req.params.id)

        if(!posts) {
            res.status(404).json({ msg: 'Post not found' })
        }
        res.json(posts)

    } catch(error) {
        console.log(error.message)
        if(error.kind === 'ObjectId') {
            res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send({ msg: 'Server Error' })
    }
    
})

// @route DELETE api/posts/:id
// @description - delete a post
// @access - Private
router.delete('/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post) {
            res.status(400).json({ msg: 'Post not found' })
        }
        // check if the user logged in is deleing his own post
        if(post.user.toString() !== req.user.id) {
            res.status(401).json({ msg: 'User not authorised' })
        }
        await post.remove()
        res.json({ msg: 'Post removed' })

    } catch(error) {
        console.log(error.message)
        if(error.kind === 'ObjectId') {
            res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send({ msg: 'Server Error' })
    } 
})

// @route PUT api/posts/like/:id
// @description - like a post
// @access - Private
router.put('/like/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(post.likes.filter( like => like.user.toString() === req.user.id).length > 0) {
            res.status(400).json({ msg: 'Post already liked' })
        }
        post.likes.unshift( { user: req.user.id })

        await post.save()
        
        res.json(post.likes)

    } catch(error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' })
    }  
})

// @route PUT api/posts/unlike/:id
// @description - unlike a post
// @access - Private
router.put('/unlike/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(post.likes.filter( like => like.user.toString() === req.user.id).length === 0) {
            res.status(400).json({ msg: 'Post has not yet been liked' })
        }
        // remove the index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        
        post.likes.splice(removeIndex, 1)

        await post.save()
        
        res.json(post.likes)

    } catch(error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' })
    }  
})

// @route Post api/posts/comment/:id
// @description - add comment
// @access - Private
router.post('/comment/:id', [auth,
    [
        check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
], async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)

        const newComment = { 
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        post.Comment.unshift(newComment)
        
        await post.save()

        res.json(post.Comment)

    } catch(error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' })
    }
    
})

// @route DELETE api/posts/comment/:id/:comment_id
// @description - delete a post
// @access - Private
router.delete('/comment/:id/:comment_id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)

        // Pull out comment
        const comment = post.Comment.find(comment => comment.id === req.params.comment_id)
        if(!comment) {
            res.status(400).json({ msg: 'Comment does not exist' })
        }
        // check if the user logged in is deleing his own post
        if(comment.user.toString() !== req.user.id) {
            res.status(401).json({ msg: 'User not authorised' })
        }
         // remove the index
         const removeIndex = post.Comment.map(comment => comment.user.toString()).indexOf(req.user.id)
        
         post.Comment.splice(removeIndex, 1)
        
        await post.save()

        res.json(post.Comment)

    } catch(error) {
        console.log(error.message)
        res.status(500).send({ msg: 'Server Error' })
    } 
})

module.exports = router
