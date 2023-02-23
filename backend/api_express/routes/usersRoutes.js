import express from "express";
import * as usersController from '../controllers/usersController.js';

const router = express.Router();

router.get('/users', usersController.showUsers)
router.get('/users/search/:query', usersController.searchUsers)
router.get('/users/:idUser', usersController.showUser)
router.get('/users/user/:username', usersController.showUserByUsername)
router.put('/users', usersController.updateUser)
router.post('/users', usersController.registerUser)
router.post('/login', usersController.loginUser)
export default router;