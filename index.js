'use strict';

const Koa = require('koa');
//const send = require('koa-send');
const Router = require('koa-router');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const scanner = require('./deps/scanner');
const proxyPlugin = require('./plugins/httpProxy');
const socketProxy = require('./plugins/socketProxy');

global._path = __dirname;

const app = new Koa();
const router = new Router();
const options = {
    key: fs.readFileSync(path.join(__dirname+'/privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname+'/certificate.pem'))
};

for(let i = 0; i<scanner.length;i++){
	try {
		let middleWare = require(path.join(__dirname + '/plugins/middleware/' + scanner[i]));
		app.use(middleWare.middleware());
	} catch (e) {
		throw new Error(e);
	}
}
app.use(proxyPlugin.routes());


//http proxy
let httpServer = http.createServer(app.callback());
httpServer.on('connect',socketProxy);
httpServer.listen(8888,() => {
  	console.log('http server is running at 8888');
});
//https proxy
let httpsServer = https.createServer(options, app.callback());
httpsServer.on('connect',function(req,res){
	//TO DO :整合http和https
	console.log('httpsServer')
});
httpsServer.listen(8089, function () {
    console.log('Https server listening on port 8089');
});