// TODO: get public key and secrete keys from flutter wave dashboard (DONE)
// TODO:  consider capturing the date on thr frontend when making payment
// MTN UGANDA MOBILE MONEY FLUTTER WAVE

const Flutterwave = require("flutterwave-node-v3");
const User = require("../models/user");
const Payment = require("../models/payment");

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const ugMobileMoneyOrAirtelMoney = async (req, res) => {
  try {
    console.log("Payment body data");
    console.log(req.body);
    console.log("Payment params data");
    console.log(req.params);
    const userId = req.params.userId;
    // const roomId = req.params.roomId
    const amount = req.body.amount;
    const network = req.body.network;
    const telPhoneNumber = req.body.telPhoneNumber;
    // const paymentDate = req.body.paymentDate;

    const user = await User.getUserById(userId);

    const payload = {
      tx_ref: this.generateTransactionReference(),
      amount: amount,
      email: user.rows[0].email,
      phone_number: telPhoneNumber,
      currency: "UGX",
      fullname: user.rows[0].user_name,
      network: network,
    };

    const response = await flw.MobileMoney.uganda(payload);
    console.log(response);

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log("error is :");
    console.log(error.message);
  }
};

// ug_mobile_money();
//Response
//   {
//     status: 'success',
//     message: 'Charge initiated',
//     meta: {
//       authorization: {
//         redirect: 'https://checkout.flutterwave.com/captcha/verify/1287327:4880b0705d15b949b84e056d7cf8b1dd',
//         mode: 'redirect'
//       }

module.exports = {
  ugMobileMoneyOrAirtelMoney,
};
