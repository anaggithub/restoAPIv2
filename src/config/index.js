const config = {
    SERVER_PORT: 3000,
    DDBB: {
        NAME: 'restoapi',
        USER: 'root',
        PASS: 'tifina',
        PORT: '3306',
        HOST: 'localhost'
    },
    JWT: {
        PRIVATE_KEY: 'secret',
        EXPIRES_TIME: 10
    }
}

export default config