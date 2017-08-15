'use strict';

const Koa = require('koa');
const send = require('koa-send');
const Router = require('koa-router');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const net = require('net');
const proxyPlugin = require('./plugins/proxy');
const mockPlugin = require('./plugins/mock');

const app = new Koa();
const router = new Router();

let options = {
    key: fs.readFileSync(path.join(__dirname+'/privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname+'/certificate.pem'))
};
app.use(mockPlugin.middleware());
app.use(proxyPlugin.routes());

//socket proxy
let socketProxy = (req,socket,head) => {
	let uri = {
		host: req.url.split(':')[0],
		port: req.url.split(':')[1] || 5390
	},
	headers = {
        'Connection': 'keep-alive',
        'Proxy-Agent': 'Qiyi Proxy'
	},
	socketConnect = net.createConnection(uri,() => {
		let cb = err => {
			if(err){
				console.log('request error:'+err.message);
				socketConnect.end();
				socket.end();
				throw new Error(err);
			}else{
				socketConnect.pipe(socket);
                socket.pipe(socketConnect);
			}
		};
		try{
			let status = 'HTTP/1.1 200 Connection established\r\n',
				headerLines = '';
			for(let key in headers)
				headerLines += key + ': ' + headers[key] + '\r\n';
			 socket.write(status + headerLines + '\r\n', 'UTF-8', cb);
		}catch(e){
			console.log('socketConnect error:',+ e.message);
		}
	});
	socketConnect.setNoDelay(true);
	socketConnect.on('error', e => {
		console.log(e)
	});
}
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