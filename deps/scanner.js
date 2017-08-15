'use strict';

const fs = require('fs');
const path = require('path');

exports = module.exports = (() => {
	let readlist = fs.readdirSync(path.join(__dirname + '/../plugins/middleware')),
		_str = [];
	readlist.forEach(s=>{
		if(s.match('.js'))
			_str.push(s);
	})
	return _str;
})();