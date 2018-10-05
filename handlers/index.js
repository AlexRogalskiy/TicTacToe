"use strict";

/**
 * Module dependencies
 */
const home = (req, res) => {
	res.render('home');
	//res.send({ response: "I am alive" }).status(200);
};

const about = (req, res) => {
	res.render('about', {});
};

module.exports = {
	home,
	about
}