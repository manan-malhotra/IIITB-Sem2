const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config('./.env')

// @desc    Register new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req,res)=>{
    console.log(req.body)
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }
    const userExist = await User.findOne({ email });
    if(userExist){
        res.status(400)
        console.log(400)
        throw new Error("User already exists")
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
    name,
    email,
    password:hashedPassword
    })

    if(user){
        console.log(user)
        res.status(201).json({
        _id : user.id,
        name : user.name,
        email : user.email,
        token : generateToken(user.id) 
    })
    }else{
        res.status(400)
        throw new Error("Invalid data")
    }

})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
        _id : user.id,
        name: user.name,
        email: user.email,
        token : generateToken(user.id) 
    })
    }else{
        res.status(400)
        throw new Error("Invalid email or password!")
    }

})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
// @via     AuthMiddleware

const getMe = asyncHandler(async (req,res)=>{
    const {id,name,email} = await User.findById(req.user._id)

    res.status(200).json({
        id,
        name,
        email
    })
})

const generateToken = (id)=>{
    return jwt.sign(
    {id},
    process.env.JWT_SECRET,
    {
        expiresIn:'30d'
    })
}

module.exports = {registerUser,loginUser,getMe}