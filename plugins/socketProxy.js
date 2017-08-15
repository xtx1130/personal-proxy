'use strict';

const fs = require('fs');
const net = require('net');

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
exports = module.exports = socketProxy;