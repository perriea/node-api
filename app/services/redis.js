// Redis client
var redis = require('redis');
var colors = require('color');

var config_redis = {
    host: process.env.APP_REDIS_HOST || '127.0.0.1',
    port: process.env.APP_REDIS_PORT || 6379,
    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with a individual error
            return new Error('Redis: the server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands with a individual error
            return new Error('Redis: Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
};

// connexion database
var redis_client = redis.createClient(config_redis);

// Redis init client
redis_client.on('connect', function() {
    console.log(colors.info('\nRedis: connection has been established successfully.'));
});

module.exports = redis_client;