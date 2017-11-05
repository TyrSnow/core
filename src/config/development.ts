import dbConfig from './db';
import logConfig from './logger';

const config = {
    PORT: 8081,
    secretKey: 'OneWeekCan',
    db: dbConfig,
    log: logConfig
}

export default config