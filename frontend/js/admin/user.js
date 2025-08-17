async function loadUsers() {
  const res = await fetch('http://localhost:3000/api/user');
  const users = await res.json();
  let html = '<table><tr><th>ID</th><th>邮箱</th><th>角色</th><th>状态</th><th>注册时间</th></tr>';
  for(const u of users) {
    html += `<tr><td>${u.id}</td><td>${u.email}</td><td>${u.role}</td><td>${u.status}</td><td>${u.created_at}</td></tr>`;
  }
  html += '</table>';
  document.getElementById('userList').innerHTML = html;
}
loadUsers();