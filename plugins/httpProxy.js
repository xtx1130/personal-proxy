'use strict';

const Router = require('koa-router');
const httpProxy = require('http-proxy');

const router = new Router();
const proxyJs = new httpProxy.createProxyServer({});

router.get('*', async ctx => {
    proxyJs.web(ctx.req, ctx.res,{target:'http://proxy.iqiyi.com',toProxy:true,prependPath:false});
    ctx.body = ctx.res;
});
router.post('*', async ctx => {
    proxyJs.web(ctx.req, ctx.res,{target:'http://proxy.iqiyi.com',toProxy:true,prependPath:false});
    ctx.body = ctx.res;
});

exports = module.exports = router;