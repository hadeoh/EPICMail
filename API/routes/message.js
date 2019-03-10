import { Router } from 'express';

import MessageController from '../controllers/message';

const router = Router();

router.get('/', MessageController.fetchAllMessages);

export default router;