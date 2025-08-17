// FHTV 首页推荐节目展示
window.onload = async function() {
  // 获取推荐节目（可根据实际业务调整为推荐接口）
  const res = await fetch('http://localhost:3000/api/program');
  const programs = await res.json();
  let html = '<h3>推荐节目</h3><div style="display:flex;flex-wrap:wrap;gap:20px;">';
  for(let i=0; i<Math.min(programs.length, 4); i++) {
    const p = programs[i];
    html += `<div style="width:220px;background:#fff;border-radius:8px;box-shadow:0 2px 8px #eee;padding:10px;">
      <img src="${p.cover}" alt="${p.name}" style="width:100%;height:120px;object-fit:cover;border-radius:6px;">
      <h4>${p.name}</h4>
      <p>${p.description}</p>
    </div>`;
  }
  html += '</div>';
  document.getElementById('recommend').innerHTML = html;
};
