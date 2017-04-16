'use strict';

var winston = require('winston');

function RiakLogger(winstonLogger) {
    var logTransports = [];
    if (winstonLogger !== undefined) {
	logTransports.push(winstonLogger);
    } else {
	logTransports.push(new (winston.transports.Console)());
    }
    var logger = new (winston.Logger)({ transports: logTransports });

    return logger;
}

module.exports = RiakLogger;
