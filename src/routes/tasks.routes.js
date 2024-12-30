import { Router } from "express";
import { getTasks, getTask, createTask, deleteTask, updateTask} from "../controllers/tasks.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import validationTask from "../validation/taskValidation.js";
const router = Router();

router.get('/tasks', authRequired , getTasks);
router.get('/tasks/:id', authRequired , getTask);
router.post('/tasks', validationTask(), authRequired , createTask);
router.delete('/tasks/:id', authRequired , deleteTask);
router.put('/tasks/:id', authRequired , updateTask);

export default router;