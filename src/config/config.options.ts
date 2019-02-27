export interface IConfigOptions {
    database: {
        username: string,
        password: string,
        database: string,
        host: string,
        port: number,
        dialect: string,
        operatorsAliases: boolean,
        logging: boolean,

        use_env_variable: string,
    };

    server: {
        host: string,
        port: number,
    };

    cors: {
        origin: string[],
    };

    security: {
        jwt: {
            env_secret: string,
            secret: string,
        },
    };

    logging: {
        console: {
            level: string,
        },
        file: {
            level: string,
        },
    };
}
