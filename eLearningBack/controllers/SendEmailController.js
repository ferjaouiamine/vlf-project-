const newsletterService = require("../services/SendEmailService");

exports.addSubscriber = async (req, res, next) => {
  try {
    const { email } = req.body;
    await newsletterService.addSubscriber(email);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
