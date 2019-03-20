import { Router } from 'express';
import dotenv from 'dotenv';
import UserController from '../controllers/user';
import Auth from '../middleware/auth';

const router = Router();

router.post('/signup', UserController.create);

router.post('/login', UserController.login);

export default router;
