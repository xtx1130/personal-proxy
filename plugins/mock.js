'use strict';

const config = require('../config/mock-config');

exports = module.exports = async (ctx,next) => {
	let flag = 0;
	for (let i = 0; i < config.length; i++) {
		if (ctx.req.url.match(config[i].url)) {
			flag = 1;
			if (ctx.query.callback) {
				ctx.set('Content-Type', 'text/javascript');
			} else {
				ctx.set('Content-Type', 'application/json');
			}
			ctx.body = jsonp(fs.readFileSync(path.join(__dirname+config[i].path)).toString(), ctx.query.callback);
		}
	}
	if(!flag)
		await next();
}