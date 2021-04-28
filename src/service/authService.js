const db = require('../../config/db');
let User = require('../models/user')(db.sequelize, db.Sequelize);


async function login(req, res, next) {
	try {
		let data = await User.findOne()
		return res.status(200).send(data);
	} catch (err) {
		return res.status(500).send(err);
	}
}

module.exports = login;
