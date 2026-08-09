import { genToken } from "../config/token.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";


// ================= REGISTER USER =================

export const createUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }


        // Check if user already exists
        const existingUser = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create user
        const newUser = await User.create({
            name,
            email: email.toLowerCase().trim(),
            password: hashedPassword
        });


        // Generate token
        const token = genToken(newUser._id);


        // Cookie options
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        // Get user without password
        const user = await User.findById(newUser._id)
            .select("-password");


        return res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {

        console.log("Register error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};



// ================= LOGIN USER =================

export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }


        // Find user
        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });


        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Check password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );


        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Generate token
        const token = genToken(user._id);


        // Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        // Get user without password
        const userData = await User.findById(user._id)
            .select("-password");


        return res.status(200).json({
            message: "Login successful",
            user: userData
        });

    } catch (error) {

        console.log("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};



// ================= CURRENT USER =================

export const currentUser = async (req, res) => {

    try {

        // req.userId comes from authentication middleware
        const user = await User.findById(req.userId)
            .select("-password")
            .populate({
                path: "posts",
                populate: {
                    path: "authorId",
                    select: "name email"
                }
            });


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        return res.status(200).json({
            user
        });

    } catch (error) {

        console.log("Current user error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};



// ================= LOGOUT USER =================

export const logoutUser = (req, res) => {

    try {

        // Clear token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });


        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {

        console.log("Logout error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
