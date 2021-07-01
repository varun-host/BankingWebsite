const Sequelize = require('sequelize');
const db = require('../db/models')
const customer = db.define('customer',{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    age:{
        type: Sequelize.INTEGER,
        allowNull: false

    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    balance:{
        type:  Sequelize.INTEGER,
        allowNull: false,

    },
    accountno:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
    }
    
},
{
    timestamps: false
});
module.exports = {
    customer
}