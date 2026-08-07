import { genToken } from "../config/token.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";


// Cookie settings for Render production
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};


// Cookie clear settings
const clearCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};


const stripPassword = (userDoc) => {
  const user = userDoc.toObject();
  delete user.password;
  return user;
};



// ================= REGISTER =================

export const createUser = async (req, res) => {

  const { name, email, password } = req.body;


  try {

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }


    const existingUser = await User.findOne({
      email: email.toLowerCase().trim()
    });


    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }



    const hashedPassword = await bcrypt.hash(password, 10);



    const newUser = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });



    const token = genToken(newUser._id);



    res.cookie(
      "token",
      token,
      cookieOptions
    );



    return res.status(201).json({
      message: "User created successfully",
      user: stripPassword(newUser)
    });



  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};






// ================= LOGIN =================

export const loginUser = async (req, res) => {

  const { email, password } = req.body;


  try {


    if (!email || !password) {

      return res.status(400).json({
        message: "Email and password are required"
      });

    }



    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });



    if (!user) {

      return res.status(401).json({
        message: "Invalid email or password"
      });

    }




    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );



    if (!isPasswordValid) {

      return res.status(401).json({
        message: "Invalid email or password"
      });

    }




    const token = genToken(user._id);



    res.cookie(
      "token",
      token,
      cookieOptions
    );



    return res.status(200).json({

      message: "Login successful",

      user: stripPassword(user)

    });



  } catch (error) {

    console.log(error);


    return res.status(500).json({

      message: "Internal server error"

    });

  }

};







// ================= CURRENT USER =================


export const currentUser = async (req, res) => {


  try {


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


    console.log(error);


    return res.status(500).json({

      message: "Internal server error"

    });

  }

};








// ================= LOGOUT =================


export const logoutUser = (req, res) => {


  try {


    res.clearCookie(

      "token",

      clearCookieOptions

    );



    return res.status(200).json({

      message: "Logout successful"

    });



  } catch (error) {


    console.log(error);



    return res.status(500).json({

      message: "Internal server error"

    });

  }

};
