function atualizarScore() {
  let scoreAtual = localStorage.getItem('userScore');
  
  if (!scoreAtual) {
    scoreAtual = 0;
    localStorage.setItem('userScore', scoreAtual);
  }
  
  scoreAtual = parseInt(scoreAtual);
  
  const percentTexts = document.querySelectorAll('.evolution p');
  if (percentTexts.length >= 2) {
    percentTexts[1].textContent = scoreAtual + '%';
  }
  
  const barraProgresso = document.querySelector('.visual-percent-evolution');
  if (barraProgresso) {
    barraProgresso.style.width = scoreAtual + '%';
    barraProgresso.style.backgroundColor = '#EF68B4'; 
    barraProgresso.style.height = '100%';
    barraProgresso.style.borderRadius = '20px';
    barraProgresso.style.transition = 'width 0.5s ease';
    barraProgresso.style.display = 'block';
  }
  
  const contagemElement = document.getElementById('contagem');
  if (contagemElement) {
    contagemElement.textContent = scoreAtual + '%';
  }
}

function adicionarPontos(pontos) {
  let scoreAtual = parseInt(localStorage.getItem('userScore') || 0);
  scoreAtual = Math.min(scoreAtual + pontos, 100); 
  localStorage.setItem('userScore', scoreAtual);
  atualizarScore();
}

function resetarScore() {
  localStorage.setItem('userScore', 0);
  atualizarScore();
}

document.addEventListener('DOMContentLoaded', function() {
  atualizarScore();
});

// Exemplo de uso no console (terminal):
// adicionarPontos(5);  // Adiciona 5% ao score
// resetarScore();      // Reseta para 0%