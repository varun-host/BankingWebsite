// const { lib } = require('sequelize');
require('dotenv').config();
let Username = process.env.Username
let Password = process.env.Password

const sequelize = require('sequelize')

module.exports = new sequelize('bankingsite',Username, Password, {
    dialect: 'mysql',
    host: 'localhost',
    
})

