const express = require('express')
const User2 = require('../models/user2Model')
const jwt = require('jsonwebtoken')


const createToken = (_id) =>{
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}




const router = express.Router()

//login route
router.post('/login', async(req, res)=>{
    const {email, password} = req.body 
 try {
        const user = await User2.login(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
} catch (error) {
    res.status(400).json({error: error.message})
}
})


//sign up route
router.post('/signup', async(req, res)=>{
    const {email, password} = req.body
    try {
        const user = await User2.signup(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
} catch (error) {
    res.status(400).json({error: error.message})
}
})

module.exports = router