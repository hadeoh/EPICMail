import { Router } from 'express';

import MessageController from '../controllers/message';

const router = Router();

router.get('/', MessageController.fetchAllMessages);

router.get('/unread', MessageController.fetchUnreadMessages);

export default router;