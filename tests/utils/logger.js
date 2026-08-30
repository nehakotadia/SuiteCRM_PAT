const winston = require('winston');
const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, '../logs');
fs.mkdirSync(logDirectory, { recursive: true });

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
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(logDirectory, 'test.log')
        }),
        new winston.transports.File({
            filename: path.join(logDirectory, 'error.log'),
            level: 'error'
        })
    ]
});

module.exports = logger;