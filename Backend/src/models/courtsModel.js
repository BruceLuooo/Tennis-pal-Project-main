const mongoose = require('mongoose');

const CourtsSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
			minlength: 3,
			trim: true,
		},
		address: {
			type: String,
			required: true,
		},
		amountOfCourts: {
			type: Number,
			required: true,
		},
	},
	{
		timeStamps: true,
	},
);

module.exports = mongoose.model('Courts', CourtsSchema);
