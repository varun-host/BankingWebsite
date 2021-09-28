const { response } = require("express");
var express = require("express");
var router = express.Router();
const { customer } = require("../../models/customer");
const { Transaction } = require("../../models/transaction");

var senderaccount;
var receiveraccount;
var amount;

/* GET home page. =================================================== */
router.get("/", function (req, res, next) {
  res.render("transfer");
});

/*Receiving Transfering data  ======================================= */

router.post("/", async function (req, res) {
  try {
    if (!req.body.sender && !req.body.receiver && !req.body.amount)
      return res.render("transfer", { error: "Fill the details correctly" });
    senderaccount = req.body.sender;
    receiveraccount = req.body.receiver;
    amount = req.body.amount;

    console.log(senderaccount);
    console.log(receiveraccount);
    console.log(amount);
    /**
     * Retreaving balance of Sender and Receiver before updating==============
     */
    const sender = await customer.findOne({
      where: { accountno: senderaccount },
    });
    const receiver = await customer.findOne({
      where: { accountno: receiveraccount },
    });

    if (!sender)
      return res.render("transfer", { error: "Enter valid account no." });
    if (!receiver)
      return res.render("transfer", { error: "Enter valid account no." });
    if (!req.body.amount)
      return res.render("transfer", { error: "Enter the amount correctly" });
    if (sender.balance <= 0)
      return res.render("transfer", { error: "Insufficient balance to send" });
    if(sender.balance-req.body.amount <=0)
      return res.render("transfer", { error: "Insufficient balance to send" });
    const updateReceiverBalance = parseInt(receiver.balance) + parseInt(amount);
    const updateSenderBalance = parseInt(sender.balance) - parseInt(amount);
    console.log(updateReceiverBalance);
    console.log(updateSenderBalance);
    /**
     * Updating Balance of Sender and Receiver==================================
     */
    customer.update(
      { balance: updateReceiverBalance },
      { where: { accountno: receiveraccount } }
    );
    customer
      .update(
        { balance: updateSenderBalance },
        { where: { accountno: senderaccount } }
      )
      .then(
        () => {
          res.render("transfer", { success: "Transfer Successful!!" });
        },
        /**================================================= */
        Transaction.create({
          Sendername: sender.name,
          Senderaccount: senderaccount,
          Receivername: receiver.name,
          Receiveraccount: receiveraccount,
          Amount: amount,
        })
      );
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
