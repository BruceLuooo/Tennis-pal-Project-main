const express = require('express');
const router = express.Router();
const {
	addMessage,
	getMessages,
} = require('../controller/allMessagesController');

router.post('/addMessage/', addMessage);
router.post('/getMessages/', getMessages);

module.exports = router;
