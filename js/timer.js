let tempoRestante = 120; // 2 minutos em segundos
let intervalo;

function iniciarTimer() {
  intervalo = setInterval(() => {
    tempoRestante--;
    
    atualizarDisplay();
    
    if (tempoRestante <= 0) {
      pararTimer();
      alert('Tempo esgotado!');
    }
    
    if (tempoRestante === 30) {
      mudarCorTimer('#ff6b6b'); 
    }
  }, 1000);
}

function atualizarDisplay() {
  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;
  
  const display = `${minutos}:${segundos.toString().padStart(2, '0')}`;
  
  const cronometro = document.getElementById('cronometro');
  if (cronometro) {
    cronometro.textContent = display;
  }
}

function pararTimer() {
  clearInterval(intervalo);
}

function mudarCorTimer(cor) {
  const cronometro = document.getElementById('cronometro');
  if (cronometro) {
    cronometro.style.color = cor;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  atualizarDisplay(); // Mostra o tempo inicial
  iniciarTimer();
});

window.addEventListener('beforeunload', function() {
  pararTimer();
});