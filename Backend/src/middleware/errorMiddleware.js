const handleError = (err, req, res, next) => {
	console.log(`handleError: ${err}`);
	const statusCode = res.statusCode ? res.statusCode : 500;

	res.status(statusCode).json({
		message: err,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

module.exports = { handleError };
