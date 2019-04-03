import { Router } from 'express';
import dotenv from 'dotenv';
import MessageController from '../controllers/message';
import Auth from '../middleware/auth';


dotenv.config();

const router = Router();

router.get('/', Auth.verifyToken, MessageController.getAllReceivedMessages);

router.get('/unread', Auth.verifyToken, MessageController.getAllUnreadMessages);

router.get('/sent', Auth.verifyToken, MessageController.getAllSentMessages);

router.get('/:id', Auth.verifyToken, MessageController.getAMessage);

router.post('/', Auth.verifyToken, MessageController.createAMessage);

router.delete('/:id', Auth.verifyToken, MessageController.deleteAMessage);

export default router;
