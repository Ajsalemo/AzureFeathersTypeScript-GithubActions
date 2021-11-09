import logger from './logger';
import app from './app';

const port = process.env.PORT || 3033;
const server = app.listen(port);
const computer = process.env.COMPUTER_NAME || 'localhost';

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info(`Feathers application started on http://%s:%d - running on ${computer}`, app.get('host'), port)
);
