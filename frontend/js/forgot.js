document.getElementById('sendCode').onclick = async function() {
  const email = document.querySelector('input[name="email"]').value;
  if(!email) return alert('请输入邮箱');
  const res = await fetch('http://localhost:3000/api/auth/send-code', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, type: 'forgot'})
  });
  const data = await res.json();
  alert(data.success ? '验证码已发送' : data.error);
};

document.getElementById('forgotForm').onsubmit = async function(e) {
  e.preventDefault();
  const email = this.email.value;
  const code = this.code.value;
  const newPassword = this.newPassword.value;
  const res = await fetch('http://localhost:3000/api/auth/forgot', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, code, newPassword})
  });
  const data = await res.json();
  alert(data.success ? '密码已重置' : data.error);
};