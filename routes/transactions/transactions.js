var express = require('express');
var router = express.Router();
const {Transaction} = require('../../models/transaction')
// router.use('/', routes);
router.get('/', function(req, res) {
    Transaction.findAll({
        attributes: ['Sendername', 'Senderaccount', 'Receivername', 'Receiveraccount','Amount']
      })
        .then(Transaction => {
          // console.log(customer)
          res.render('transactions',{
            Transaction
          });
        })
        .catch(err => console.log(err));
    });

module.exports = router;    