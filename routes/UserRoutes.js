import express from 'express';
import { AddUser, getUsers, getUsersById, updateUser, deleteUser } from '../controllers/UserController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/user/:id', getUsersById);
router.post('/adduser', AddUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

export default router;
