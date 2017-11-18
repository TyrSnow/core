const logConfig = {
    appenders: {
        out: {
            type: 'console'
        },
        app: {
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 1024,
            backups: 4
        },
        error: {
            type: 'file',
            filename: 'logs/error.log',
            maxLogSize: 1024,
            backups: 4
        }
    },
    categories: {
        default: {
            appenders: ['out', 'app'],
            level: 'debug'
        },
        error: {
            appenders: ['out', 'error'],
            level: 'debug'
        }
    },
    replaceConsole: true
}

export default logConfig