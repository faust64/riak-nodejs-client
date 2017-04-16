'use strict';

var winston = require('winston');

function RiakLogger(winstonLogger) {
    var logTransports = [];
    if (winstonLogger !== undefined) {
	logTransports.push(winstonLogger);
    } else {
	logTransports.push(new (winston.transports.Console)());
    }
    this._logger = new (winston.Logger)({ transports: logTransports });

    return this._logger;
}

module.exports = RiakLogger;
