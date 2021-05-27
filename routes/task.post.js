import { Router } from "express";
import { postTask } from '../controllers/postTask.js'

const router = Router();

router.post('/task', postTask);

export default router;