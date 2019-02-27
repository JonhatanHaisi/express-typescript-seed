module.exports = {
    development: {
        database: {
            username: "postgres",
            password: "passwd123",
            database: "database_development",
            host: "127.0.0.1",
            dialect: "postgres",
            operatorsAliases: false
        },
        server: {
            host: "127.0.0.1",
            port: 9000
        },
        cors: {
            origin: [ "*" ]
        },
        security: {
            jwt: {
                secret: "s3cr3t"
            }
        },
        logging: {
            console: {
                level: "debug"
            },
            file: {
                level: "info"
            }
        }
    },

    test: {
        database: {
            username: "postgres",
            password: "passwd123",
            database: "database_test",
            host: "0.0.0.0",
            dialect: "postgres",
            operatorsAliases: false,
            logging: false,
        },
        server: {
            host: "127.0.0.1",
            port: 9000
        },
        cors: {
            origin: [ "*" ]
        },
        security: {
            jwt: {
                secret: "s3cr3t"
            }
        },
        logging: {
            console: {
                level: "warn"
            },
            file: {
                level: "warn"
            }
        }
    },

    production: {
        database: {
            use_env_variable: "DB_CONNECTION",
            dialect: "postgres",
            operatorsAliases: false,
            logging: false
        },
        server: {
            host: "0.0.0.0",
            port: 9000
        },
        cors: {
            origin: [ "*" ]
        },
        security: {
            jwt: {
                env_secret: "JWT_SECRET"
            }
        },
        logging: {
            console: {
                level: undefined
            },
            file: {
                level: "warn"
            }
        }
    }
}
