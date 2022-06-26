const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const asyncHandler = require('express-async-handler');

// @desc create User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    //Fields check
    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all the fields')
    }
    
    //Check user existence
    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    //hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    const user = await User.create({
        name,
        email,
        password: hashedPwd
    })
    
    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        throw new Error('Invalid user data');
    } 
})
 
// @desc login User
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    //Check for fields
    if(!email || !password) {
        res.status(400);
        throw new Error('Please add all the fields');
    }
    //Check for user
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid data');
    }
})

// @desc get Me
// @route /api/users
// @access Private
const getMe = asyncHandler(async (req, res) => {
    console.log(typeof (req.user));
    res.status(200).json(req.user);
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}