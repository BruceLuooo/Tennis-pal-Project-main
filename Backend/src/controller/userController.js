const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cloudinary = require('cloudinary').v2;
const User = require('../models/userModel');

const checkEmail = asyncHandler(async (req, res) => {
	const { email } = req.body;

	const userExist = await User.findOne({ email });
	if (userExist) {
		return res.status(400).json({ Message: 'Email already exists' });
	} else {
		return res.status(200).json({ Message: 'New email used' });
	}
});

const registerUser = asyncHandler(async (req, res, next) => {
	const { name, email, password, level, locations } = req.body;

	//hash password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);

	//create user
	const user = await User.create({
		name,
		email,
		password: hashPassword,
		level,
		locations,
	});

	if (user) {
		res.status(201).json({
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				level: user.level,
				password: user.password,
				locations: user.locations,
				isAdmin: false,
				avatar:
					'https://cdn.discordapp.com/attachments/1007742096104497163/1013499279681277952/unknown.png',
			},
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new error({ message: 'Invalid User Data' });
	}
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ Message: 'Please fill in all fields' });
	}

	const user = await User.findOne({ email });

	//check if user and password match
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				level: user.level,
				password: user.password,
				location: user.locations,
				isAdmin: user.isAdmin,
				avatar: user.avatar,
			},
			token: generateToken(user._id),
		});
	} else {
		res.status(401).json({ Message: 'Invalid Email or Password' });
	}
});

const updateUser = asyncHandler(async (req, res) => {
	try {
		const { email, name, password, level, locations } = req.body;

		if (await User.findOne({ email })) {
			res.status(401).json({ Message: 'Email already exists' });
		}

		const user = await User.findOne({ _id: req.user.id });
		if (password && user) {
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, salt);
			user.password = hashPassword || user.password;
		}
		if (user) {
			user.email = email || user.email;
			user.name = name || user.name;
			user.level = level || user.level;
			user.locations = locations || user.locations;
			await user.save();
			const token = generateToken(user._id);
			res.status(201).json({ user, token });
		}
	} catch (error) {
		res.status(400).json({ Message: 'something went wrong' });
	}
});

const contactUser = async (req, res) => {
	try {
		const { searchedUserId, currentUserId } = req.body;
		const searchedUser = await User.findById(searchedUserId);
		const currentUser = await User.findById(currentUserId);

		const contactedUser = await currentUser.usersContacted.map(user => {
			return user.email;
		});

		const isAlreadyContacted = contactedUser.find(
			user => user == searchedUser.email,
		);

		if (isAlreadyContacted) {
			res.status(200).json({ Message: 'User already contacted' });
		} else {
			currentUser.usersContacted.unshift({
				_id: searchedUser._id,
				name: searchedUser.name,
				avatar: searchedUser.avatar,
				email: searchedUser.email,
			});
			currentUser.save();
			res.status(200).json({ Message: 'Successfully added contact' });
		}
	} catch (error) {
		res.status(400).json({ Message: 'There is an error' });
	}
};
const addToContactedUser = async (req, res) => {
	try {
		const { searchedUserId, currentUserId } = req.body;
		const searchedUser = await User.findById(searchedUserId);
		const currentUser = await User.findById(currentUserId);

		const contactedUser = await searchedUser.usersContacted.map(user => {
			return user.email;
		});

		const isAlreadyContacted = contactedUser.find(
			user => user == currentUser.email,
		);

		if (isAlreadyContacted) {
			res.status(200).json({ Message: 'User already contacted' });
		} else {
			searchedUser.usersContacted.unshift({
				_id: currentUser._id,
				name: currentUser.name,
				avatar: currentUser.avatar,
				email: currentUser.email,
			});
			searchedUser.save();
			res.status(200).json({ Message: 'Successfully added contact' });
		}
	} catch (error) {
		res.status(400).json({ Message: 'There is an error' });
	}
};

const getAllContactedUsers = async (req, res) => {
	const { user } = req.body;

	const currentUser = await User.findById(user);

	res.json(currentUser);
};

const generateToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const getUserById = async (req, res) => {
	let { id } = req.body;
	let user = await User.findOne({ _id: id });
	res.json(user);
};

const uploadPfp = async (req, res) => {
	cloudinary.config({
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_SECRET,
	});

	try {
		const id = req.headers.authorization;
		let { path } = req.file;
		const result = await cloudinary.uploader.upload(path);
		await User.findByIdAndUpdate(id, { avatar: result.url });
		return res.json({ url: result.url });
	} catch (error) {
		console.error(error);
		return res.json({ url: 'err' });
	}
};

module.exports = {
	registerUser,
	loginUser,
	updateUser,
	checkEmail,
	getUserById,
	contactUser,
	addToContactedUser,
	getAllContactedUsers,
	uploadPfp,
};
