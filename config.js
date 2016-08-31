'use strict';

/**
 * Project root folder path
 * @type {String}
 */
exports.ROOT_FOLDER = __dirname;

/**
 * Read console args params
 */

exports.args = process.argv.slice(2);

/**
 * Get port and host from console args
 */

let argPort, argHost;
if(this.args.length){
    if(this.args.length > 2){
        console.error(`Too many params passed: ${this.args}, expected first parameter to be port and second parameter to be host`);
        process.exit(1);
    }

    argPort = this.args[0];
    argHost = this.args[1];
}

/**
 * Get host from console args, local env or use localhost as default
 */

exports.host = filterHosts([argHost, process.env.HOST, 'localhost']);

function filterHosts(hosts){
    for(let i = 0; i < hosts.length; i++){
        if(hosts[i]) return hosts[i];
    }
}

/**
 * Get port from environment and store in Express.
 */

exports.port = normalizePort(argPort || process.env.PORT || 3000);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val){
    let port = parseInt(val, 10);

    if(isNaN(port)){
        // named pipe
        return val;
    }

    if(port >= 0){
        // port number
        return port;
    }

    return false;
}

/**
 * Choose which DB to use: JSON File or MongoDB
 * @type {string}
 */
exports.DB_TYPE = process.env.DB_TYPE || 'MONGODB';

exports.JSON_DB_FILE = './data.json';

/**
 * MongoDB connection params
 * @type {Object}
 */

exports.MONGO = {
    DB_HOST: process.env.MONGO_DB_HOST || 'localhost',
    DB_PORT: process.env.MONGO_DB_PORT || 27017,
    DB_NAME: process.env.MONGO_DB_NAME || 'crud',
    DB_USER: process.env.MONGO_DB_USER || 'root',
    DB_PASS: process.env.MONGO_DB_PASS || '',
    DB_OPTIONS: process.env.MONGO_DB_OPTIONS || ''
};