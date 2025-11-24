const diasSemana = [
  { id: 'domingo', nome: 'Dom', nomeFull: 'Domingo' },
  { id: 'segunda', nome: 'Seg', nomeFull: 'Segunda-feira' },
  { id: 'terca', nome: 'Ter', nomeFull: 'Terça-feira' },
  { id: 'quarta', nome: 'Qua', nomeFull: 'Quarta-feira' },
  { id: 'quinta', nome: 'Qui', nomeFull: 'Quinta-feira' },
  { id: 'sexta', nome: 'Sex', nomeFull: 'Sexta-feira' },
  { id: 'sabado', nome: 'Sáb', nomeFull: 'Sábado' }
];

function getProgresso() {
  const hoje = new Date();
  const inicioSemana = getInicioSemana(hoje);
  const chave = `progresso_${inicioSemana}`;
  
  const dados = localStorage.getItem(chave);
  if (dados) {
    return JSON.parse(dados);
  }
  
  const progressoVazio = {};
  diasSemana.forEach(dia => {
    progressoVazio[dia.id] = false;
  });
  
  return progressoVazio;
}

function salvarProgresso(progresso) {
  const hoje = new Date();
  const inicioSemana = getInicioSemana(hoje);
  const chave = `progresso_${inicioSemana}`;
  
  localStorage.setItem(chave, JSON.stringify(progresso));
}

function getInicioSemana(data) {
  const d = new Date(data);
  const day = d.getDay();
  const diff = d.getDate() - day; 
  const inicio = new Date(d.setDate(diff));
  return inicio.toISOString().split('T')[0];
}

function getDiaAtual() {
  const hoje = new Date().getDay();
  return diasSemana[hoje].id;
}

function renderizarProgresso() {
  const container = document.querySelector('.progress-visual');
  if (!container) return;
  
  const progresso = getProgresso();
  const diaAtual = getDiaAtual();
  const diasCompletos = Object.values(progresso).filter(v => v).length;
  const percentual = Math.round((diasCompletos / 7) * 100);
  
  container.innerHTML = `
    <div class="progress-header">
      <h3>Sequência Semanal</h3>
      <div class="progress-stats">
        <span class="dias-completos">${diasCompletos}/7 dias</span>
        <span class="percentual">${percentual}%</span>
      </div>
    </div>
    
    <div class="semana-visual">
      ${diasSemana.map(dia => {
        const completo = progresso[dia.id];
        const isHoje = dia.id === diaAtual;
        
        return `
          <div class="dia-card ${completo ? 'completo' : ''} ${isHoje ? 'hoje' : ''}" 
               data-dia="${dia.id}"
               title="${dia.nomeFull}">
            <div class="dia-circulo">
              <i data-lucide="${completo ? 'check' : 'circle'}"></i>
            </div>
            <span class="dia-nome">${dia.nome}</span>
            ${isHoje ? '<span class="badge-hoje">Hoje</span>' : ''}
          </div>
        `;
      }).join('')}
    </div>
    
    <div class="progress-footer">
      <button class="btn-reset-semana" id="btn-reset-progresso">
        <i data-lucide="rotate-ccw"></i>
        Resetar Semana
      </button>
    </div>
  `;
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  document.querySelectorAll('.dia-card').forEach(card => {
    card.addEventListener('click', toggleDia);
  });
  
  document.getElementById('btn-reset-progresso')?.addEventListener('click', resetarProgresso);
}

function toggleDia(e) {
  const card = e.currentTarget;
  const diaId = card.dataset.dia;
  const progresso = getProgresso();
  
  progresso[diaId] = !progresso[diaId];
  salvarProgresso(progresso);
  
  if (progresso[diaId]) {
    mostrarMensagem('Dia marcado como estudado! 🎉', 'sucesso');
    
    const diasCompletos = Object.values(progresso).filter(v => v).length;
    if (diasCompletos === 7) {
      mostrarMensagem('🔥 Parabéns! Você completou todos os dias da semana! 🔥', 'sucesso');
    }
  } else {
    mostrarMensagem('Dia desmarcado', 'info');
  }
  
  renderizarProgresso();
}

function resetarProgresso() {
  if (confirm('Tem certeza que deseja resetar o progresso da semana?')) {
    const progressoVazio = {};
    diasSemana.forEach(dia => {
      progressoVazio[dia.id] = false;
    });
    
    salvarProgresso(progressoVazio);
    renderizarProgresso();
    mostrarMensagem('Progresso resetado! Comece uma nova semana! 🚀', 'info');
  }
}

function mostrarMensagem(texto, tipo = 'sucesso') {
  const existente = document.querySelector('.mensagem-feedback');
  if (existente) {
    existente.remove();
  }
  
  const mensagem = document.createElement('div');
  mensagem.className = `mensagem-feedback ${tipo}`;
  mensagem.textContent = texto;
  
  document.body.appendChild(mensagem);
  
  setTimeout(() => {
    mensagem.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    mensagem.classList.remove('show');
    setTimeout(() => mensagem.remove(), 300);
  }, 3000);
}

function calcularEstatisticas() {
  const progresso = getProgresso();
  const diasCompletos = Object.values(progresso).filter(v => v).length;
  const percentual = Math.round((diasCompletos / 7) * 100);
  
  return {
    diasCompletos,
    diasRestantes: 7 - diasCompletos,
    percentual,
    sequenciaAtual: calcularSequencia(progresso)
  };
}

function calcularSequencia(progresso) {
  let sequenciaAtual = 0;
  const diaAtualIndex = new Date().getDay();
  
  for (let i = 0; i <= diaAtualIndex; i++) {
    if (progresso[diasSemana[i].id]) {
      sequenciaAtual++;
    } else {
      sequenciaAtual = 0;
    }
  }
  
  return sequenciaAtual;
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.progress-visual')) {
    renderizarProgresso();
    
    const diaAtual = getDiaAtual();
    const progresso = getProgresso();
  }
});