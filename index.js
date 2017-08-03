'use strict';

const Koa = require('koa');
const send = require('koa-send');
const Router = require('koa-router');
const jsonp = require('jsonp-body');
const httpProxy = require('http-proxy');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();
const proxyJs = new httpProxy.createProxyServer({});

//在这里修改mock路径，只支持jsonp接口，支持正则或者字符串匹配
let mock = [
	{
		url:new RegExp(/\apis\/msg\/list_messages\.action/),
		path:'/mock/list_messages.json'
	},
	{
		url:new RegExp(/\/apis\/msg\/list_comments\.action/),
		path:'/mock/list_comments.json'
	}
];
let options = {
    key: fs.readFileSync(path.join(__dirname+'/privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname+'/certificate.pem'))
};
app.use(async (ctx,next) => {
	let flag = 0;
	for (let i = 0; i < mock.length; i++) {
		if (ctx.req.url.match(mock[i].url)) {
			flag = 1;
			if (ctx.query.callback) {
				ctx.set('Content-Type', 'text/javascript');
			} else {
				ctx.set('Content-Type', 'application/json');
			}
			ctx.body = jsonp(fs.readFileSync(path.join(__dirname+mock[i].path)).toString(), ctx.query.callback);
		}
	}
	if(!flag)
		await next();
});
router.get('*', async ctx => {
    proxyJs.web(ctx.req, ctx.res,{target:'http://127.0.0.1:6666',toProxy:true,prependPath:false});
    ctx.body = ctx.res;
});
router.post('*', async ctx => {
    proxyJs.web(ctx.req, ctx.res,{target:'http://127.0.0.1:6666',toProxy:true,prependPath:false});
    ctx.body = ctx.res;
});
app.use(router.routes());

http.createServer(app.callback()).listen(8888,() => {
  	console.log('http server is running at 8888');
});
https.createServer(options, app.callback()).listen(8089, function () {
    console.log('Https server listening on port 8089');
});