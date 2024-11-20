const express = require('express');
const userRouter = express.Router(); // create a router 
const {registerUser,loginUser,logoutUser} = require('../controllers/user-controller.js');  // call the controller 
const {userAuthVerification} = require('../middleware/userAuthMiddleware.js')

userRouter.post('/register', registerUser); // on the /resgister path the registerUser will be invoked 
userRouter.post('/login',loginUser); // on the /login path the loginUser will be invoked 
userRouter.post('/auth',userAuthVerification); //  on the /auth path the userAuthVerification will be invoked 
userRouter.post('/logout',logoutUser);
module.exports = userRouter; 
