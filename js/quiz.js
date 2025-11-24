class Quiz {
  constructor() {
    this.options = document.querySelectorAll('.option');
    this.conferirBtn = document.getElementById('conferirBtn');
    this.feedbackMessage = document.getElementById('feedbackMessage');
    this.progressBar = document.getElementById('progressBar');
    
    this.selectedOption = null;
    this.isAnswered = false;
    
    this.init();
  }
  
  init() {
    // Adicionar event listeners para as opções
    this.options.forEach(option => {
      option.addEventListener('click', () => this.selectOption(option));
    });
    
    // Event listener para o botão conferir
    this.conferirBtn.addEventListener('click', () => this.checkAnswer());
    
    // Inicializar barra de progresso
    this.updateProgress(0);
  }
  
  selectOption(option) {
    if (this.isAnswered) return;
    
    // Remover seleção anterior
    this.options.forEach(opt => opt.classList.remove('selected'));
    
    // Selecionar nova opção
    option.classList.add('selected');
    this.selectedOption = option;
    
    // Habilitar botão conferir
    this.conferirBtn.disabled = false;
  }
  
  checkAnswer() {
    if (!this.selectedOption || this.isAnswered) return;
    
    this.isAnswered = true;
    
    const isCorrect = this.selectedOption.dataset.correct === 'true';
    
    // Mostrar feedback visual
    if (isCorrect) {
      this.selectedOption.classList.add('correct');
      this.conferirBtn.classList.add('correct');
      this.conferirBtn.textContent = 'Correto! ✓';
      this.showFeedback('Parabéns! Resposta correta! 🎉', 'correct');
    } else {
      this.selectedOption.classList.add('incorrect');
      this.conferirBtn.classList.add('incorrect');
      this.conferirBtn.textContent = 'Incorreto! ✗';
      this.showFeedback('Resposta incorreta. Tente novamente! 💪', 'incorrect');
      
      // Mostrar a resposta correta
      this.showCorrectAnswer();
    }
    
    // Atualizar progresso
    this.updateProgress(isCorrect ? 100 : 0);
    
    // Desabilitar seleção de outras opções
    this.options.forEach(option => {
      option.style.cursor = 'not-allowed';
    });
  }
  
  showCorrectAnswer() {
    this.options.forEach(option => {
      if (option.dataset.correct === 'true') {
        option.classList.add('correct');
      }
    });
  }
  
  showFeedback(message, type) {
    this.feedbackMessage.textContent = message;
    this.feedbackMessage.className = `feedback-message show ${type}`;
  }
  
  updateProgress(percentage) {
    this.progressBar.style.width = `${percentage}%`;
  }
  
  resetQuiz() {
    this.options.forEach(option => {
      option.classList.remove('selected', 'correct', 'incorrect');
      option.style.cursor = 'pointer';
    });
    
    this.conferirBtn.classList.remove('correct', 'incorrect');
    this.conferirBtn.textContent = 'Conferir Resposta';
    this.conferirBtn.disabled = true;
    
    this.feedbackMessage.classList.remove('show');
    this.feedbackMessage.className = 'feedback-message';
    
    this.selectedOption = null;
    this.isAnswered = false;
    
    this.updateProgress(0);
  }
}

// Inicializar quiz quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new Quiz();
});

// Exemplo de como adicionar mais perguntas (para futuro desenvolvimento)
const quizQuestions = [
  {
    question: "Qual das opções abaixo é um tipo de algoritmo de busca?",
    options: [
      { text: "Busca linear", correct: true },
      { text: "Busca espiral", correct: false },
      { text: "Busca nebulosa", correct: false },
      { text: "Busca cruzada", correct: false }
    ]
  }
  // Adicione mais perguntas aqui...
];