import { Router } from 'express';
import dotenv from 'dotenv';
import GroupController from '../controllers/group';
import Auth from '../middleware/auth';

dotenv.config();

const router = Router();

router.post('/', Auth.verifyToken, GroupController.createAGroup);

router.post('/:id/messages', Auth.verifyToken, GroupController.sendEmailToGroup);

router.post('/:id/users', Auth.verifyToken, GroupController.addUserToGroup);

router.patch('/:id/name', Auth.verifyToken, GroupController.editGroupName);

router.delete('/:id', Auth.verifyToken, GroupController.deleteAGroup);

router.delete('/:id/users/:userId', Auth.verifyToken, GroupController.deleteUserFromGroup);

router.delete('/:id/messages/:msgId', Auth.verifyToken, GroupController.deleteAGroupEmail);

router.get('/', Auth.verifyToken, GroupController.getAllGroups);

router.get('/:id/users', Auth.verifyToken, GroupController.getAllGroupUsers);

router.get('/:id/users/:userId', Auth.verifyToken, GroupController.getAGroupUser);

router.get('/:id/messages', Auth.verifyToken, GroupController.getAllReceivedGroupEmail);

router.get('/:id/messages/sent', Auth.verifyToken, GroupController.getSentGroupEmail);

router.get('/:id/messages/unread', Auth.verifyToken, GroupController.getUnreadGroupEmail);

router.get('/:id/messages/:msgId', Auth.verifyToken, GroupController.getAGroupEmail);

export default router;
