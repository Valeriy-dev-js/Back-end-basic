import { Router } from "express";
import { getTasks } from '../controllers/getTask.js'
const router = Router();

router.get('/tasks', getTasks);

export default router;