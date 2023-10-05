const { check, validationResult }  = require('express-validator');
const validateResult = require("../../middlewares/validator.middleware");

const registerUserValidator= [      //=> arreglo con todos los middlewares a usar.
    check('firstname', 'Error con firstname')
    .exists()
    .withMessage('No se incluye la propiedad firstname')
    .notEmpty()
    .withMessage('El firstname no debe estar vacio')
    .isString()
    .withMessage('El firstname debe ser tipo string')
    .isLength({min: 2, max: 50})
    .withMessage('El valor debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-Z\s]/) //=> regular expressions , para validar que solo envie esos caracteres
    .withMessage("El lastname solo acepta letras"),
check('email', 'Error con el campo Email')
    .exists()
    .notEmpty()
    .isString()
    .isEmail()
    .isLength({min: 7, max: 50}),
check('password', 'Error con el campo Password')
    .exists()
    .notEmpty()
    .isString()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%-^&*]{8,}$/),
    
    validateResult,
];  

const loginValidation = [
    check('email', 'error con la propiedad email')
    .exists()
    .withMessage('No se incluye con la propiedad email')
    .notEmpty()
    .withMessage('La propiedad email no debe ir vacio')
    .isString()
    .withMessage('El email debe ser un string')
    .isEmail(),
    check('password')
    .exists()
    .notEmpty()
    .isString(),
    validateResult,
];

module.exports = {
    registerUserValidator,
    loginValidation,
}