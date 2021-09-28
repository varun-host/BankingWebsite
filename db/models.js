// const { lib } = require('sequelize');
require('dotenv').config();
let Username = process.env.Username
let Password = process.env.Password

const sequelize = require('sequelize')

module.exports = new sequelize('btbf7qgd80ncwnnfgdcj',Username, Password, {
    dialect: 'mysql',
    host: 'btbf7qgd80ncwnnfgdcj-mysql.services.clever-cloud.com',
    
})

