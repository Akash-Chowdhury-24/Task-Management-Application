require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/user.js')


const userAuthVerification = async (req, res, next) => {
  const token = await req.cookies.token; // getting the token

  if (!token) { // chechking if the token is still there
    return res.json({
      success: false,
      message: 'token is Unavailable or expired or invalid',
    });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);  // verifying the token 
      const userInfo = await User.findById(decoded.getId); // getting the user info with the id from the the token

      if (userInfo) {  // if the userifo is there send positive response
        return res.status(200).json({
          success: true,
          message: 'User is authenticated',
          userInfo,
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'User is not Authenticated',
      })
    }
  }
}

module.exports = {userAuthVerification};