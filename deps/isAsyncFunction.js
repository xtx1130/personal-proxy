'use strict';
exports = module.exports = func => {
	return func.constructor.name === 'AsyncFunction';
}