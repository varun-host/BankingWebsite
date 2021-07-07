var express = require('express');
const sequelize = require('sequelize');
var router = express.Router();
const {customer}  = require('../../models/customer')

/* GET home page. ================================================ */

router.get('/', function(req, res, next) {
  customer.findAll({
    attributes: ['name', 'age', 'email', 'balance','accountno']
  })
    .then(customer => {
      // console.log(customer)
      res.render('customer',{
        customer
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
