function activateFlipCards() {
const cards = document.querySelectorAll('.carousel-item');

cards.forEach(card => {
  const btn = card.querySelector('.flip-btn');
  const content = card.querySelector('.card-content');

  btn.addEventListener('click', () => {
    content.classList.toggle('flipped');
    btn.textContent = content.classList.contains('flipped')
      ? 'Ver termo'
      : 'Ver definição';
  });
});

}

document.addEventListener('DOMContentLoaded', activateFlipCards);
