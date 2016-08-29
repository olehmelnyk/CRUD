'use strict';

/**
 * Read console args params
 */

exports.args = process.argv.slice(2);

/**
 * Get port and host from console args
 */
if(this.args.length){
    if(this.args.length > 2){
        console.error(`Too many params passed: ${this.args}, expected first parameter to be port and second parameter to be host`);
        process.exit(1);
    }

    var argPort = this.args[0];

    if(this.args.length > 1){
        var argHost = this.args[1];
    }
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