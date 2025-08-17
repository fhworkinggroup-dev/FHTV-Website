window.onload = async function() {
  const res = await fetch('http://localhost:3000/api/system/settings');
  const settings = await res.json();
  const liveSource = settings.find(s => s.key === 'live_source');
  document.getElementById('liveFrame').src = liveSource ? liveSource.value : '';
};