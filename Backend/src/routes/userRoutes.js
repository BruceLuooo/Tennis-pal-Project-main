const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	updateUser,
	checkEmail,
	getUserById,
	contactUser,
	getAllContactedUsers,
} = require('../controller/userController');
const { auth } = require('../middleware/auth');
const multer = require('multer');

router.post('/checkEmail', checkEmail);
router.post('/', registerUser);
router.post('/login', loginUser);
router.patch('/updateUser', auth, updateUser);
router.post('/getUserById', getUserById);
router.post('/contactUser', contactUser);
router.post('/getAllContactedUsers', getAllContactedUsers);

router.post('/getUserById', getUserById)

module.exports = router;
