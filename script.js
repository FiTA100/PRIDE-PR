// Падающий снег
function createSnow() {
  const snowContainer = document.getElementById('snow');
  if (!snowContainer) return;

  const snowflakes = 80;

  for (let i = 0; i < snowflakes; i++) {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄';
    snowflake.style.position = 'absolute';
    snowflake.style.top = '-20px';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.fontSize = (Math.random() * 16 + 12) + 'px';
    snowflake.style.opacity = Math.random();
    snowflake.style.color = 'white';
    snowflake.style.pointerEvents = 'none';
    snowflake.style.zIndex = '-1';
    snowflake.style.animation = `fall ${Math.random() * 5 + 5}s linear infinite`;
    snowflake.style.animationDelay = Math.random() * 5 + 's';
    snowContainer.appendChild(snowflake);
  }

  // Добавляем CSS-анимацию для снега
  if (!document.getElementById('snow-animation-style')) {
    const style = document.createElement('style');
    style.id = 'snow-animation-style';
    style.innerHTML = `
      @keyframes fall {
        to {
          transform: translateY(105vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Таймер до Нового года
function updateCountdown() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const newYear = new Date(`January 01, ${nextYear} 00:00:00`);
  const diff = newYear - now;

  if (diff <= 0) {
    if (document.getElementById('countdown')) {
      document.getElementById('countdown').innerText = 'С Новым годом! 🎄';
    }
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (document.getElementById('countdown')) {
    document.getElementById('countdown').innerText = 
      `${days}д ${hours}ч ${minutes}м ${seconds}с`;
  }
}

// Моргание глаз снеговика (если элемент есть)
function initSnowmanBlink() {
  const eyes = document.querySelectorAll('.eye');
  if (eyes.length === 0) return;

  eyes.forEach(eye => {
    eye.style.animation = 'blink 5s infinite';
  });

  if (!document.getElementById('blink-animation-style')) {
    const style = document.createElement('style');
    style.id = 'blink-animation-style';
    style.innerHTML = `
      @keyframes blink {
        0%, 45%, 55%, 100% { r: 2; }
        48%, 52% { r: 0.1; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  createSnow();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  initSnowmanBlink();
});
