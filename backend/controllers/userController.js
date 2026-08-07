import { genToken } from "../config/token.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const cookieOptions = {
    httpOnly: true,
    secure: true,          // production (Render) ke liye
    sameSite: "none",      // frontend aur backend alag domain par hain
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

const stripPassword = (userDoc) => {
    const user = userDoc.toObject();
    delete user.password;
    return user;
};


// Register User
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }


        const existingUser = await User.findOne({
            email: email.toLowerCase().trim(),
        });


        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }


        const hashPassword = await bcrypt.hash(password, 10);


        const newUser = await User.create({
            name,
            email: email.toLowerCase().trim(),
            password: hashPassword,
        });


        const token = genToken(newUser._id);


        res.cookie("token", token, cookieOptions);


        const user = stripPassword(newUser);


        return res.status(201).json({
            message: "User created successfully",
            user,
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};



// Login User
export const loginUser = async (req, res) => {

    const { email, password } = req.body;


    try {

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }


        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });


        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }


        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );


        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }


        const token = genToken(user._id);


        res.cookie("token", token, cookieOptions);


        return res.status(200).json({
            message: "Login successful",
            user: stripPassword(user),
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};



// Current User
export const currentUser = async (req, res) => {

    try {

        const user = await User.findById(req.userId)
            .select("-password")
            .populate({
                path:"posts",
                populate:{
                    path:"authorId",
                    select:"name email",
                },
            });



        if (!user) {
            return res.status(404).json({
                message:"User not found",
            });
        }


        return res.status(200).json({
            user,
        });


    } catch(error){

        console.log(error);

        return res.status(500).json({
            message:"Internal server error",
        });
    }
};



// Logout User
export const logoutUser = (req,res)=>{

    try{

        res.clearCookie("token", {
            httpOnly:true,
            secure:true,
            sameSite:"none",
        });


        return res.status(200).json({
            message:"Logout successful",
        });


    }catch(error){

        console.log(error);

        return res.status(500).json({
            message:"Internal server error",
        });
    }
};
