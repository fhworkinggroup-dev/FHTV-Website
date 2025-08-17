// 邮箱验证码注册页面逻辑

document.getElementById('verifyForm').onsubmit = async function(e) {
  e.preventDefault();
  const email = this.email.value;
  const code = this.code.value;
  // 实际注册流程建议在register页面完成，这里仅做验证码校验演示
  const res = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, password: '', code}) // 密码可在register页面补充
  });
  const data = await res.json();
  if(data.success) {
    alert('验证成功，请继续设置密码完成注册');
    // 可跳转到设置密码页面
  } else {
    alert(data.error);
  }
};
