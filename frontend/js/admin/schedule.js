async function loadSchedules() {
  const res = await fetch('http://localhost:3000/api/schedule');
  const schedules = await res.json();
  let html = '<table><tr><th>ID</th><th>节目ID</th><th>开始时间</th><th>结束时间</th></tr>';
  for(const s of schedules) {
    html += `<tr><td>${s.id}</td><td>${s.program_id}</td><td>${s.start_time}</td><td>${s.end_time}</td></tr>`;
  }
  html += '</table>';
  document.getElementById('scheduleList').innerHTML = html;
}
loadSchedules();

document.getElementById('addScheduleForm').onsubmit = async function(e) {
  e.preventDefault();
  const program_id = this.program_id.value;
  const start_time = this.start_time.value;
  const end_time = this.end_time.value;
  const res = await fetch('http://localhost:3000/api/schedule', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({program_id, start_time, end_time})
  });
  const data = await res.json();
  alert(data.success ? '添加成功' : data.error);
  loadSchedules();
};