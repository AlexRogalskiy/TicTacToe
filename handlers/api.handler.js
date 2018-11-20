"use strict";

/**
 * Module dependencies
 */
const getAttractions = (req, content, callback) => {
	res.render('api/home');
};

const unAuthorized = (req, content, callback) => {
	res.status(403).render('api/unauthorized');
};

const getStatus = (req, content, callback) => {
	const status = Number(req.params.status);
	res.status(status).render(`api/${status}`);
};

module.exports = {
	getAttractions,
	unAuthorized,
	getStatus
}