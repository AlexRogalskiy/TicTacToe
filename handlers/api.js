"use strict";

/**
 * Module dependencies
 */
const getAttractions = (req, content, callback) => {
	res.render('api/home');
};

const unAuthorized = (req, content, callback) => {
	res.render('api/unAuthorized');
};

module.exports = {
	getAttractions,
	unAuthorized
}