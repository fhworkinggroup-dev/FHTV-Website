window.onload = async function() {
  const res = await fetch('http://localhost:3000/api/schedule');
  const schedules = await res.json();
  let html = '<table><tr><th>节目</th><th>开始时间</th><th>结束时间</th></tr>';
  for(const s of schedules) {
    html += `<tr><td>${s.program_id}</td><td>${s.start_time}</td><td>${s.end_time}</td></tr>`;
  }
  html += '</table>';
  document.getElementById('scheduleList').innerHTML = html;
};