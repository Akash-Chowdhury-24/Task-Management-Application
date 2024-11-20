// user registration 
require('dotenv').config();//load environment 
const Joi = require('joi'); // for validation 
const User = require('../models/user.js'); // the model
const bcrypt = require('bcryptjs'); // for password hashing 
const jwt = require('jsonwebtoken'); // for token generation 

// function for validation criterion for register user
const registerSchema = Joi.object({
  name : Joi.string().required(),
  email : Joi.string().email().required(),
  password : Joi.string().min(6).required(),
});

// function for validation criterion for login user
const loginSchema = Joi.object({
  email : Joi.string().email().required(),
  password : Joi.string().min(6).required(),
});

// function to generate the token 
const generateToken = (getId) =>{
  return jwt.sign({getId}, process.env.TOKEN_SECRET_KEY,{
    expiresIn : process.env.TOKEN_EXPIRE,
  });
};

// the registration user controller

const registerUser = async (req,res,next) =>{

  const {name,email,password} = await req.body;

  // validation
  const {error} = registerSchema.validate({
    name,
    email,
    password,
  });

  // if validation fails
  if(error){
    return res.status(400).json({
      success : false,
      message : error.details[0].message,
    });
  }

  // if validation pass
  try {
    // checking if the email already exits
    const isUserEmailAlreadyExits = await User.findOne({
      email,
    });

    // if email already exits
    if(isUserEmailAlreadyExits){
      return res.status(400).json({
        success : false,
        message : 'Email already exits, enter different email',
      });
    }else{ // if it doesnot exist 
      const hashPassword = await bcrypt.hash(password,12);  // hashing the password

      const newlyCreatedUser = await User.create({ // creating the new user 
        name,
        email,
        password : hashPassword,
      });

      if (newlyCreatedUser) {
        const token = generateToken(newlyCreatedUser?._id); // generating the token 
        res.cookie('token',token,{ // save the token in a cookie and also create the cookie and send it 
          httpOnly : true,
          withCredentials : false,
        });
        
        return res.status(201).json({ // since all goo therefore send the responce 
          success : true,
          message : 'User created successfully',
          userdata : {
            name : newlyCreatedUser?.name,
            email : newlyCreatedUser?.email,
            _id : newlyCreatedUser?._id,
          },
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message,
    });
  }
}

// controller for logging in the user 

const loginUser = async (req,res,next)=>{

  const {email,password} = await req.body;

  // validation
  const {error} = loginSchema.validate({
    email,
    password,
  });

  // if validation fails
  if(error){
    return res.status(400).json({
      success : false,
      message : error.details[0].message,
    });
  }

  // if validation pass
  try {
    
    const getUser = await User.findOne({email}); // get the user with the email by use the User model

    //check is email existes
    if(!getUser){
      return res.status(400).json({
        success : false,
        message : 'Invalid email',
      });
    }

    // check if password is correct
    const checkPassword = await bcrypt.compare(password,getUser.password);
    if(!checkPassword){
      return res.status(400).json({
        success : false,
        message : 'Invalid password',
      });
    }

    // generate the token and cookie
    const token = generateToken(getUser._id);
    res.cookie("token",token,{
      httpOnly : true,
      withCredentials : false,
    });

    // send positive respose 
    return res.status(201).json({
      success : true,
      message : 'User login successfully',
    });

  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message,
    });
  }
}

// controller for logging out the user 
const logoutUser = async (req,res,next) => {
  res.clearCookie('token'); // more efficent to remove the cookie only 

  // res.cookie('token','',{ // less effeicient to set the cookie value to null
  //   httpOnly : false,
  //   withCredentials : true,
  // })
  return res.status(200).json({
    success : true,
    message : 'User logged out successfully',
  });
}

module.exports = {registerUser,loginUser,logoutUser};

