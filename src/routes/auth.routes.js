import { Router } from "express";
import { login, register, logout} from "../controllers/auth.controller.js";
import validationUser from "../validation/userValidation.js";

const router = Router();

router.post('/register', validationUser(), register);
router.post('/login', validationUser(), login);
router.post('/logout', logout);

export default router;