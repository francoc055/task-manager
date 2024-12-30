import { check, validationResult } from "express-validator";

const validationUser = () => {
    return [
        check('email').notEmpty().withMessage('El campo email es requerido'),
        check('password').notEmpty().withMessage('El campo password es requerido'),

        (req, res, next) => {
            const errors = validationResult(req);
            
            if(!errors.isEmpty()){
                const checkError = errors.array().map(error => error.msg);
                return res.status(400).json({message: checkError});
            }

            next();

        }
    ]
}

export default validationUser;