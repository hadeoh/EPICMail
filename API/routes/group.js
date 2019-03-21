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

export default router;
