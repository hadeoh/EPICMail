import { Router } from 'express';

import UserController from '../controllers/user';

const router = Router();

router.post('/signup', UserController.createAUser);

export default router;
