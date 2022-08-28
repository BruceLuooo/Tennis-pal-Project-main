const express = require('express');
const router = express.Router();
const {
	allCourts,
	allCourtsList,
	addNewCourt,
	deleteCourt,
} = require('../controller/allCourtsController');

router.get('/', allCourts);

router.get('/list', allCourtsList);

router.post('/addNewCourt', addNewCourt);

router.post('/deleteCourt', deleteCourt);

module.exports = router;
