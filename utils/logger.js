const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Discord-Music-Bot' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      format: combine(format.colorize(), myFormat),
    }),
    new transports.File({
      filename: 'logs/combined.log',
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

module.exports = logger;