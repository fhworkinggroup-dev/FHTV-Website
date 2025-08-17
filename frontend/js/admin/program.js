async function loadPrograms() {
  const res = await fetch('http://localhost:3000/api/program');
  const programs = await res.json();
  let html = '<table><tr><th>ID</th><th>名称</th><th>简介</th><th>封面</th></tr>';
  for(const p of programs) {
    html += `<tr><td>${p.id}</td><td>${p.name}</td><td>${p.description}</td><td><img src="${p.cover}" width="80"></td></tr>`;
  }
  html += '</table>';
  document.getElementById('programList').innerHTML = html;
}
loadPrograms();

document.getElementById('addProgramForm').onsubmit = async function(e) {
  e.preventDefault();
  const name = this.name.value;
  const description = this.description.value;
  const cover = this.cover.value;
  const res = await fetch('http://localhost:3000/api/program', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({name, description, cover})
  });
  const data = await res.json();
  alert(data.success ? '添加成功' : data.error);
  loadPrograms();
};