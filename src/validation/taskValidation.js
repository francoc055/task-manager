import { check, validationResult } from "express-validator";

const validationTask = () => {
    return [
        check('title').notEmpty().withMessage('El campo titulo es requerido'),

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

export default validationTask;