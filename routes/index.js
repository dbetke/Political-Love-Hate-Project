var redis = require('redis');
var cf = require('../cloudfoundry');

var redis_host =  cf.redis?cf.redis.credentials.host:'localhost';
var redis_port = cf.redis?cf.redis.credentials.port:6379;
var redis_password = cf.redis?cf.redis.credentials.password:undefined;

var client = redis.createClient(redis_port, redis_host);
if(cf.runningInTheCloud) {
    client.auth(redis_password);
}

/*
 * GET home page.
 */

exports.index = function(req, res){
    //res.render('index', { title: 'Express' })
    client.keys('*', function(err, keys) {
	var response = '';
	response += 'keys:<br/>';
	keys.forEach(function(key) {
	    response += key + '<br/>';
	});
	res.send('Hello World!<br/>'+response);
    });
};