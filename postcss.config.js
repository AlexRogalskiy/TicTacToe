"use strict";

module.exports = (ctx) => ({
	parser: ctx.parser ? 'sugarss' : false,
	map: ctx.env === 'development' ? ctx.map : false,
	plugins: [
		require("autoprefixer")({ browsers: ['last 4 versions', 'Firefox ESR', 'not ie < 9'] })
	]
});