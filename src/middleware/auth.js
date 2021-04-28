
async function auth(req, res, next) {
	try {
		next();
	} catch (err) {
		return res.status(401).send( "Access denied");
	}
}

module.exports = auth;
