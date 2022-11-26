const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	updateUser,
	checkEmail,
	getUserById,
	contactUser,
	addToContactedUser,
	getAllContactedUsers,
	uploadPfp,
} = require('../controller/userController');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
	},
});

const upload = multer({ storage: storage });

router.post('/checkEmail', checkEmail);
router.post('/', registerUser);
router.post('/login', loginUser);
router.patch('/updateUser', auth, updateUser);
router.post('/getUserById', getUserById);
router.post('/contactUser', contactUser);
router.post('/addToContactedUser', addToContactedUser);
router.post('/getAllContactedUsers', getAllContactedUsers);

router.post('/getUserById', getUserById);
router.post('/uploadPfp', upload.single('avatar'), uploadPfp);

module.exports = router;
