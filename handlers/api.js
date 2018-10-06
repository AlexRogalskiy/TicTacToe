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

module.exports = {
	getAttractions,
	unAuthorized
}