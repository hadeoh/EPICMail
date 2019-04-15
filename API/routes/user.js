import { Router } from 'express';
import dotenv from 'dotenv';
import UserController from '../controllers/user';
import Auth from '../middleware/auth';

dotenv.config();

const router = Router();

router.post('/signup', UserController.create);

router.post('/login', UserController.login);

router.get('/users', Auth.verifyToken, UserController.getAllUsers);

router.get('/users/:id', Auth.verifyToken, UserController.getAUser);

export default router;
