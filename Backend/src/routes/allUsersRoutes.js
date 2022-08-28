const express = require('express');
const router = express.Router();
const {
	allUsers,
	totalUsers,
	deleteUser,
	makeAdmin,
	deleteAdmin,
} = require('../controller/allUsersController');

router.get('/', allUsers);
router.get('/totalUsers', totalUsers);
router.post('/deleteUser', deleteUser);
router.post('/makeAdmin', makeAdmin);
router.post('/deleteAdmin', deleteAdmin);

module.exports = router;
