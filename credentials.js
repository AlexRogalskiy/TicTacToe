'use strict';

module.exports = {
	cookieSecret: '',
	session: {
		key: 'sess',
		autoCommit: true,
		overwrite: true,
		httpOnly: true,
		signed: true,
		rolling: false,
		renew: false,
		maxAge: 900000
	}
};