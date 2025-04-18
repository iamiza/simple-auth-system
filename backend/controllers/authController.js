const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models");

const register = async (req, res) => {
    try {
        const{username, email , password} = req.body;

        //Checking if the user exists 
        const existingUser = await User.findOne({where: {email}});
        if (existingUser) return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,

        });
        res.status(201).json({message: "User registered successfully", user:{ id: user.id, email: user.email }});
    }
    catch(error){
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

const login = async (req,res) => {
    try{
        const{email, password} = req.body;

        const user = await User.findOne({where: {email}});
        if(!user) return res.status(404).json({message : "User not found"});

        const valid = await bcrypt.compare(password, user.password);
        if(!user) return res.status(404).json({message: "Incorrect password"});

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.cookie("token",token,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.status(200).json({message:"Login Successful",token});
    }
    catch (error){
        res.status(500).json({message:"Server error", error: error.message});

    }
}

module.exports = {register, login};