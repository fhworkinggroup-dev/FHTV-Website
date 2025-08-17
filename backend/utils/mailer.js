const nodemailer = require('nodemailer');
let transporter = null;

exports.setConfig = function(config) {
  transporter = nodemailer.createTransport(config);
};

exports.sendMail = function(to, subject, text, callback) {
  if(!transporter) return callback(new Error('未配置邮箱'));
  transporter.sendMail({
    from: transporter.options.auth.user,
    to, subject, text
  }, callback);
};