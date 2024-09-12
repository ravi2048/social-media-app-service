const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    MAX_CONNECTIONS: process.env.MAX_CONNECTIONS,
    REACT_APP_URL: process.env.REACT_APP_URL,
    REACT_APP_URL_LOCAL: process.env.REACT_APP_URL_LOCAL,
    BASE_URL: process.env.BASE_URL,
    REACT_APP_GOOGLE_CLOUD_STORAGE_BASE_URL: process.env.REACT_APP_GOOGLE_CLOUD_STORAGE_BASE_URL
}