const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			validate: {
				validator: validator.isEmail,
				message: 'Please provide a valid emaill',
			},
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: 6,
		},
		level: {
			type: Number,
			required: [true, 'Please add a level'],
		},
		locations: {
			type: Array,
			required: true,
		},
		avatar: {
			type: String,
			default: 'https://cdn.discordapp.com/attachments/1007742096104497163/1013499279681277952/unknown.png',
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		usersContacted: {
			type: Array,
		},
	},
	{
		timeStamps: true,
	},
);

module.exports = mongoose.model('User', userSchema);
