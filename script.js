const clockEl = document.getElementById('clock');
const dateEl = document.getElementById('date');
const statusText = document.getElementById('statusText');
const targetTimeInput = document.getElementById('targetTime');
const speedRange = document.getElementById('speedRange');
const messageInput = document.getElementById('messageInput');
const targetOutput = document.getElementById('targetOutput');
const speedOutput = document.getElementById('speedOutput');
const messageOutput = document.getElementById('messageOutput');
const tickerTrack = document.getElementById('tickerTrack');
const tickerClock = document.getElementById('tickerClock');
const settingsForm = document.getElementById('settingsForm');
const resetBtn = document.getElementById('resetBtn');

function pad(value) {
  return String(value).padStart(2, '0');
}

function getStatusLabel(targetTime) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [targetHour, targetMinute] = targetTime.split(':').map(Number);
  const targetMinutes = targetHour * 60 + targetMinute;

  if (currentMinutes === targetMinutes) {
    return 'On Schedule';
  }

  return currentMinutes > targetMinutes ? 'Delayed' : 'Standby';
}

function updateRealTime() {
  const now = new Date();
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map(pad)
    .join(':');

  clockEl.textContent = time;
  dateEl.textContent = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const targetTime = targetTimeInput.value || '15:30';
  const status = getStatusLabel(targetTime);
  statusText.textContent = status;
  statusText.className = 'stat-value ' + (status === 'On Schedule' ? 'green' : 'cyan');
}

function updateTicker() {
  const targetTime = targetTimeInput.value || '15:30';
  const speed = Number(speedRange.value) || 18;
  const message = messageInput.value.trim() || 'System Online';

  targetOutput.textContent = targetTime;
  speedOutput.textContent = `${speed}s`;
  messageOutput.textContent = message;
  tickerClock.textContent = targetTime;

  const text = `${message} • ${targetTime}`;
  tickerTrack.innerHTML = `<span>${text}</span><span>${text}</span>`;
  tickerTrack.style.animationDuration = `${speed}s`;

  statusText.textContent = getStatusLabel(targetTime);
  statusText.className = 'stat-value ' + (statusText.textContent === 'On Schedule' ? 'green' : 'cyan');
}

settingsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  updateTicker();
  updateRealTime();
});

resetBtn.addEventListener('click', () => {
  targetTimeInput.value = '15:30';
  speedRange.value = '18';
  messageInput.value = 'Siaga 24 Jam • Sistem monitoring aktif';
  updateTicker();
  updateRealTime();
});

targetTimeInput.addEventListener('input', updateTicker);
speedRange.addEventListener('input', updateTicker);
messageInput.addEventListener('input', updateTicker);

updateTicker();
updateRealTime();
setInterval(() => {
  updateRealTime();
}, 1000);
