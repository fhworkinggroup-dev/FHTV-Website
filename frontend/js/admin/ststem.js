window.onload = async function() {
  const res = await fetch('http://localhost:3000/api/system/settings');
  const settings = await res.json();
  document.getElementById('liveSource').value = settings.find(s => s.key === 'live_source')?.value || '';
  const emailConfig = settings.find(s => s.key === 'email_config');
  if(emailConfig) {
    const cfg = JSON.parse(emailConfig.value);
    document.getElementById('smtpHost').value = cfg.host;
    document.getElementById('smtpPort').value = cfg.port;
    document.getElementById('smtpUser').value = cfg.auth.user;
    document.getElementById('smtpPass').value = cfg.auth.pass;
  }
};

document.getElementById('saveLiveSource').onclick = async function() {
  const value = document.getElementById('liveSource').value;
  const res = await fetch('http://localhost:3000/api/system/live-source', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({value})
  });
  const data = await res.json();
  alert(data.success ? '直播源已保存' : data.error);
};

document.getElementById('saveEmailConfig').onclick = async function() {
  const host = document.getElementById('smtpHost').value;
  const port = document.getElementById('smtpPort').value;
  const user = document.getElementById('smtpUser').value;
  const pass = document.getElementById('smtpPass').value;
  const res = await fetch('http://localhost:3000/api/system/email', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({host, port, user, pass})
  });
  const data = await res.json();
  alert(data.success ? '邮箱配置已保存' : data.error);
};