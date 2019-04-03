import { Router } from 'express';
import dotenv from 'dotenv';
import GroupController from '../controllers/group';
import Auth from '../middleware/auth';

dotenv.config();

const router = Router();

router.post('/', Auth.verifyToken, GroupController.createAGroup);

router.get('/', Auth.verifyToken, GroupController.getAllGroups);

router.patch('/:id/name', Auth.verifyToken, GroupController.editGroupName);

router.delete('/:id', Auth.verifyToken, GroupController.deleteGroup);

router.post('/:id/users', Auth.verifyToken, GroupController.addUserToGroup);

router.delete('/:id/users/:memId', Auth.verifyToken, GroupController.deleteUserFromGroup);

router.post('/:id/messages', Auth.verifyToken, GroupController.sendEmailToGroup)

export default router;
