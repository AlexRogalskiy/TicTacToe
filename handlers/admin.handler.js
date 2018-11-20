"use strict";

/**
 * Module dependencies
 */
const home = (req, res) => {
	res.render('admin/home');
};

const unAuthorized = (req, res) => {
	res.status(403).render('admin/unAuthorized');
};

module.exports = {
	home,
	unAuthorized
}