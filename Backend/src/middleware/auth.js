const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		res.status(401).json({ Message: 'Authentication Invalid 1st one' });
	}

	try {
		const payload = jwt.verify(authHeader, process.env.JWT_SECRET);
		req.user = payload;
	} catch {
		res.status(401).json({ Message: 'Authentication Invalid' });
	}
	next();
};

module.exports = { auth };
