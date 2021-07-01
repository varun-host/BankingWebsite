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
// router.get('/', function(req, res, next) {
//   res.sendFile('/home/leo-007/Desktop/banking_system/public/customer.html')
//   // res.sendFile('../public/customer.html')
//   // res.render('customer', { title: 'Express' });
//   next();
// });

module.exports = router;
