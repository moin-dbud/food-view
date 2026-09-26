// logic for the routes will be written here and then we will export it to the main file
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email: email });

    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: user._id,
    }, "bf08d24d17097fb99aaff01a13a3cdb3e8126b24")
    res.cookie('token', token)

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });

}

async function loginUser(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ 
            message: 'Invalid email or password' 
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ 
            message: 'Invalid credentials' 
        });
    }

    const token = jwt.sign({
        id: user._id,
    }, "bf08d24d17097fb99aaff01a13a3cdb3e8126b24")
    res.cookie('token', token)

    res.status(201).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });

}



module.exports = {
    registerUser,
    loginUser
};  