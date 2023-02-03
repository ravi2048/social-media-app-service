const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    REACT_APP_URL: process.env.REACT_APP_URL,
    BASE_URL: process.env.BASE_URL
}