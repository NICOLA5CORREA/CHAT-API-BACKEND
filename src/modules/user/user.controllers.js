const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};
const registerUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    await User.create(newUser);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    // null || {}
    if (!user) {
      throw {
        status: 400,
        error: "User does not exist",
        message: "You need register before login",
      };
    }
    // contraseña en user.password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) { 
      throw {
        status: 400,
        error: "Incorrect password",
        message: "The password does not match with the user",
      };
    }

    if(!user.validEmail) {
      throw {
        status: 401,
        error: " Email verification needed",
        message: "Look at the email address for verification" 
      };
    }
    // generar token
    const copyUser = { ...user.dataValues };
    delete copyUser.password;
    const token = jwt.sign(copyUser, process.env.JWT_SECRET, {
      algorithm: "HS512",
      expiresIn: "1h",
    });
    copyUser.token = token;
    res.json(copyUser);
  } catch (error) {
    next(error);
  }
};

const validateUserEmail = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw {
        statusbar: 400,
        message: "Token is required",
      };
    }
    const { email } = jwt.verify(token, process.env.JWT_EMAIL_SECRET, {
      algorithms: "HS512",
    });
    const user = await User.findOne({ where: { email } }); // es una isntancia de ese usuario
    if (user.validEmail) {
      throw {
        status: 400,
        message: "Email is already verified",
      };
    }
    user.validEmail = true;
    user.save();
    res.json({
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

const newValidationEmail = async (req, res) => {
	
	try {
		const { email} = req.body
	sendWelcomeEmail(email)
	res.status(201).json({message: "se generó un nuevo token"})

	} catch (error) {
	res . status(400) .json(error)
	}
};


module.exports = {
  registerUser,
  loginUser,
  validateUserEmail,
  newValidationEmail,
  getAllUsers,
};