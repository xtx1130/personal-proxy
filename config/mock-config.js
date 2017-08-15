'use strict';

exports = module.exports = [
	{
		url:new RegExp(/\apiss\/msg\/list_messages\.action/),
		path:'/mock/list_messages.json'
	},
	{
		url:new RegExp(/\/apiss\/msg\/list_comments\.action/),
		path:'/mock/list_comments.json'
	}
];