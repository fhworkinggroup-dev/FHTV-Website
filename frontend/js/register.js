document.getElementById('sendCode').onclick = async function() {
  const email = document.querySelector('input[name="email"]').value;
  if(!email) return alert('请输入邮箱');
  const res = await fetch('http://localhost:3000/api/auth/send-code', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, type: 'register'})
  });
  const data = await res.json();
  alert(data.success ? '验证码已发送' : data.error);
};

document.getElementById('registerForm').onsubmit = async function(e) {
  e.preventDefault();
  const email = this.email.value;
  const password = this.password.value;
  const code = this.code.value;
  const res = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, password, code})
  });
  const data = await res.json();
  alert(data.success ? '注册成功' : data.error);
};