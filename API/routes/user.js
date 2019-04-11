import { Router } from 'express';
import dotenv from 'dotenv';
import UserController from '../controllers/user';

dotenv.config();

const router = Router();

router.post('/signup', UserController.create);

router.post('/login', UserController.login);

router.get('/users', UserController.getAllUsers);

router.get('/users/:id', UserController.getAUser);

export default router;
