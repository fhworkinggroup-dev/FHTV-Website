// 简单验证码生成
exports.generateCode = function() {
  return Math.floor(100000 + Math.random() * 900000).toString();
};