const Sequelize = require('sequelize');
const db = require('../db/models')
const Transaction = db.define('Transaction',{
    Sendername: {
        type: Sequelize.STRING,
    },
    Senderaccount:{
        type: Sequelize.INTEGER,

    },
    Receivername:{
        type: Sequelize.STRING,
        
    },
    Receiveraccount:{
        type:  Sequelize.INTEGER,

    },
    Amount:{
        type: Sequelize.INTEGER,
        
    }
    
},
{
    timestamps: false
});
module.exports = {
    Transaction
}