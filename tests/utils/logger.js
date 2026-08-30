const winston = require('winston');
const path = require('path');

const logDirectory = path.join(__dirname, '../logs');

const logger = winston.createLogger({
    level: 'info',

    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}] ${message}`;
        })
    ),

    transports: [
        // Console logs
        new winston.transports.Console(),

        // All logs
        new winston.transports.File({
            filename: path.join(logDirectory, 'test.log')
        }),

        // Error logs only
        new winston.transports.File({
            filename: path.join(logDirectory, 'error.log'),
            level: 'error'
        })
    ]
});

module.exports = logger;