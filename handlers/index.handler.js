"use strict";

/**
 * Module dependencies
 */
const home = (req, res) => {
	res.render('home');
	//res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
	//res.send({ response: "I am alive" }).status(200);
};

const about = (req, res) => {
	res.render('about', {});
};

const test = (req, res) => {
	let params = (Object.keys(req.body).length > 0) ? req.body : req.query;
	res.send(params);
};

const all = (req, res) => {
	res.render('index');
};

module.exports = {
	home,
	about,
	test,
	all
}