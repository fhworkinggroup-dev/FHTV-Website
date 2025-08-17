document.getElementById('loginForm').onsubmit = async function(e) {
  e.preventDefault();
  const email = this.email.value;
  const password = this.password.value;
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, password})
  });
  const data = await res.json();
  if(data.success) {
    alert('登录成功');
    // 跳转到首页或后台
  } else {
    alert(data.error);
  }
};