import { Router } from 'express';

import UserController from '../controllers/user';

const router = Router();

router.post('/signup', UserController.createAUser);

router.post('/login', UserController.loginAUser);

export default router;
