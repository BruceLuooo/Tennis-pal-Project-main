const asyncHandler = require('express-async-handler');

const User = require('../models/courtsModel');

const allCourts = asyncHandler(async (req, res) => {
	let { search } = req.query;

	const queryObject = {};

	if (search) {
		queryObject.name = { $regex: '^' + search, $options: 'i' };
	}

	let results = User.find(queryObject)
		.sort({ name: 1 })
		.collation({ locale: 'en', caseLevel: true });

	const page = Number(req.query.page) || 1;
	const limit = 5;
	const skip = (page - 1) * limit;

	results = results.skip(skip).limit(limit);

	const courts = await results;

	const totalCourts = await User.countDocuments(queryObject);
	const numOfPages = Math.ceil(totalCourts / limit);

	res.status(200).json({ courts, numOfPages });
});

const allCourtsList = asyncHandler(async (req, res) => {
	try {
		const list = await User.find()
			.sort({ name: 1 })
			.collation({ locale: 'en', caseLevel: true });
		res.status(200).json(list);
	} catch (error) {
		res.status(400).json({ Message: error });
	}
});

const addNewCourt = asyncHandler(async (req, res) => {
	try {
		const { name, address, amountOfCourts } = req.body;

		const newCourt = await User.create({
			name,
			address,
			amountOfCourts,
		});

		if (newCourt) {
			res.status(201).json({
				newCourt: {
					name: newCourt.name,
					address: newCourt.address,
					amountOfCourts: newCourt.amountOfCourts,
				},
			});
		}
	} catch (error) {
		res.status(400).json({ Message: error });
	}
});

const deleteCourt = asyncHandler(async (req, res) => {
	try {
		const { name } = req.body;

		const test = await User.deleteOne({ name });

		if (test) {
			const allCourts = await User.find();
			res.status(200).json(allCourts);
		}
	} catch (error) {
		res.status(400).json({ Message: error });
	}
});

module.exports = {
	allCourts,
	allCourtsList,
	addNewCourt,
	deleteCourt,
};
