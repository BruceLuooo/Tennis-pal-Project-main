const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const User = require('../models/userModel');

const allUsers = asyncHandler(async (req, res) => {
	let { level, locations } = req.query;

	try {
		const queryObject = {};

		// find all users with a level
		if (level && locations) {
			(queryObject.level = level), (queryObject.locations = { $in: locations });
		} else if (!locations && level) {
			queryObject.level = level;
		} else if (!level && locations) {
			queryObject.locations = { $in: locations };
		}

		let results = User.find(queryObject);

		const page = Number(req.query.page) || 1;
		const limit = 8;
		const skip = (page - 1) * limit;

		results = results.skip(skip).limit(limit);

		const allUsers = await results;

		const totalUsers = await User.countDocuments(queryObject);
		const numOfPages = Math.ceil(totalUsers / limit);

		res.status(200).json({ allUsers, numOfPages });
	} catch (error) {
		res.status(200).json({ Message: error });
	}
});

const totalUsers = asyncHandler(async (req, res) => {
	try {
		const allUsers = await User.find()
			.sort({ name: 1 })
			.collation({ locale: 'en', caseLevel: true });
		if (allUsers) {
			res.status(200).json(allUsers);
		}
	} catch (error) {
		res.status(400).json({ Message: error });
	}
});

const deleteUser = asyncHandler(async (req, res) => {
	const { _id } = req.body;

	try {
		const findUser = await User.deleteOne({ _id });
		if (findUser) {
			const allUsers = await User.find();
			res.status(200).json(allUsers);
		}
	} catch (error) {
		res.status(400).json({ Message: error });
	}
});

const makeAdmin = asyncHandler(async (req, res) => {
	const { _id } = req.body;

	try {
		const user = await User.findOne({ _id });

		if (user) {
			user.isAdmin = true;
			await user.save();
			res.status(201).json(user.isAdmin);
		}
	} catch (error) {
		res.status(400).json({ Message: 'Could not add Admin' });
	}
});

const deleteAdmin = asyncHandler(async (req, res) => {
	const { _id } = req.body;

	try {
		const user = await User.findOne({ _id });

		if (user) {
			user.isAdmin = false;
			await user.save();
			res.status(201).json(user);
		}
	} catch (error) {
		res.status(400).json({ Message: 'Could not remove admin' });
	}
});

module.exports = { allUsers, totalUsers, deleteUser, makeAdmin, deleteAdmin };
