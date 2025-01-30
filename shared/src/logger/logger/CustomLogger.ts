import winston from 'winston'
import chalk from 'chalk'

const customFormat = winston.format.printf((data) => {
  const { level, message, timestamp, service } = data
  return `${timestamp} ${chalk.cyan(`[${level}]`)} on ${chalk.yellow(
    `[${service}]`
  )}: ${chalk.white.bold(message)}`
})

export const Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  defaultMeta: { service: 'service' },
  transports: [new winston.transports.Console()],
})
