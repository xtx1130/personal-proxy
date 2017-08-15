'use strict';

const config = require('../config/mock-config');
const isAsync = require('../deps/isAsyncFunction');
const jsonp = require('jsonp-body');

class mock {
	constructor() {

	}
	async asyncNext(next){
		return await next();
	}
	middleware() {
		let dispatch = async (ctx, next) => {
			next = next || function(){};
			try{
				let flag = 0;
				for (let i = 0; i < config.length; i++) {
					if (ctx.req.url.match(config[i].url)) {
						flag = 1;
						if (ctx.query.callback) {
							ctx.set('Content-Type', 'text/javascript');
						} else {
							ctx.set('Content-Type', 'application/json');
						}
						ctx.body = jsonp(fs.readFileSync(path.join(__dirname + config[i].path)).toString(), ctx.query.callback);
					}
				}
				if (!flag)
					!isAsync(next)?this.asyncNext(next):await next();
			}catch(e){
				throw new Error(e);
			}
		}
		return dispatch;
	}
}
exports = module.exports = new mock();