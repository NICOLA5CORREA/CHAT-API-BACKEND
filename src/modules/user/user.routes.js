const { Router } = require("express");
const {
  registerUser,
  loginUser,
  validateUserEmail,
  newValidationEmail,
  getAllUsers,
} = require("./user.controllers");
const authenticate = require("../../middlewares/auth.middleware");
const { registerUserValidator, loginValidation } = require("./user.validators");
const router = Router();

router
  .route("/")
  .get(authenticate, getAllUsers)
  .post(registerUserValidator, registerUser)
  .get(authenticate, (req, res) => {
    res.json({ message: "aqui van tus mensajes" });
  });

router.post("/login", loginValidation, loginUser);

router.post("/validate", validateUserEmail)

module.exports = router;
