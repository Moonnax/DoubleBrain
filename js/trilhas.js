const conteudoTrilhas = {
  'algoritmos': {
    titulo: 'Algoritmos',
    imagem: './assets/img/algoritmos.png',
    secoes: [
      {
        titulo: 'O que é um algoritmo?',
        conteudo: `
          <p>Um algoritmo é, basicamente, um conjunto de instruções bem definidas que orientam a solução de um problema específico.</p>
          <p>Imagine que você está seguindo uma receita culinária. Cada passo da receita, como adicionar ingredientes, mexer, cozinhar por X minutos, é um algoritmo, ou seja, um passo a passo para alcançar o resultado final.</p>
          <p>Em programação, os algoritmos desempenham esse mesmo papel. Eles orientam o computador sobre como processar dados, tomar decisões e automatizar processos. Ou seja, sem algoritmos, a programação simplesmente não funciona.</p>
        `
      },
      {
        titulo: 'Exemplos de algoritmos básicos',
        conteudo: `
          <h2>Algoritmos de busca</h2>
          <h3>Busca linear</h3>
          <p>A busca linear é um dos algoritmos de busca mais simples. Basicamente, ela percorre todos os elementos de uma lista (ou array) um por um, verificando se o elemento atual é igual ao elemento que estamos procurando.</p>
          <p><strong>Como funciona:</strong> Começa pelo primeiro elemento da lista e vai verificando cada um até encontrar o item desejado ou chegar ao final da lista.</p>
          <p><strong>Quando usar:</strong> Esse método é útil quando a lista está desordenada ou quando o custo de ordenar os dados não vale a pena. Ideal para pequenas coleções de dados.</p>
          
          <h3>Busca binária</h3>
          <p>A busca binária é muito mais eficiente do que a busca linear, mas tem uma condição: a lista precisa estar ordenada. Ela funciona dividindo a lista ao meio repetidamente até encontrar o elemento desejado.</p>
          <p><strong>Como funciona:</strong> O algoritmo começa verificando o elemento do meio da lista. Se o elemento procurado for menor que o do meio, a busca continua apenas na metade esquerda; se for maior, a busca se concentra na metade direita.</p>
        `
      }
    ],

  },
  
  'estrutura-de-dados': {
    titulo: 'Estrutura de Dados',
    imagem: './assets/img/estruturadedados.png',
    secoes: [
      {
        titulo: 'O que são estruturas de dados?',
        conteudo: `
          <p>Estruturas de dados são formas de organizar e armazenar dados no computador para que possam ser acessados e modificados de maneira eficiente. Elas são fundamentais para a programação, pois permitem que o desenvolvedor escolha a melhor forma de manipular informações.</p>
        `
      },
      {
        titulo: 'Tipos principais',
        conteudo: `
          <h2>Arrays (Vetores)</h2>
          <p>Arrays são coleções de elementos do mesmo tipo, armazenados em posições consecutivas de memória. Cada elemento pode ser acessado através de um índice.</p>
          
          <h2>Listas Encadeadas</h2>
          <p>Uma lista encadeada é uma estrutura de dados linear onde cada elemento (nó) contém dados e uma referência para o próximo nó da sequência.</p>
          
          <h2>Pilhas e Filas</h2>
          <p>Pilhas seguem o princípio LIFO (Last In, First Out), enquanto filas seguem FIFO (First In, First Out).</p>
        `
      }
    ],

  },
  
  'programacao': {
    titulo: 'Programação',
    imagem: './assets/img/programacao.png',
    secoes: [
      {
        titulo: 'Fundamentos de Programação',
        conteudo: `
          <p>Programação é o processo de criar instruções que um computador pode executar. Essas instruções são escritas em linguagens de programação que servem como ponte entre o pensamento humano e a execução pela máquina.</p>
        `
      },
      {
        titulo: 'Conceitos básicos',
        conteudo: `
          <h2>Variáveis</h2>
          <p>Variáveis são espaços na memória usados para armazenar valores durante a execução do programa. Elas têm um nome, um tipo e um valor.</p>
          
          <h2>Estruturas de Controle</h2>
          <p>São comandos que controlam o fluxo de execução do programa, como condicionais (if/else) e laços de repetição (for, while).</p>
          
          <h2>Funções</h2>
          <p>Blocos de código reutilizáveis que executam uma tarefa específica. Ajudam a organizar o código e evitar repetição.</p>
        `
      }
    ],
    
  }
};


function carregarTrilhas() {
  const trilhasSalvas = localStorage.getItem('trilhas');
  if (trilhasSalvas) {
    return JSON.parse(trilhasSalvas);
  }
  return Object.keys(conteudoTrilhas);
}

function salvarTrilhas(trilhas) {
  localStorage.setItem('trilhas', JSON.stringify(trilhas));
}

function renderizarTrilhas() {
  const trilhasContainer = document.querySelector('.trilhas-choice');
  if (!trilhasContainer) return;

  const trilhasAtivas = carregarTrilhas();
  
  const botaoAdicionar = trilhasContainer.querySelector('[href=""].parentElement') || 
                        Array.from(trilhasContainer.children).find(div => 
                          div.querySelector('a[href=""]')
                        );
  
  trilhasContainer.innerHTML = '';
  
  trilhasAtivas.forEach(trilhaId => {
    const trilha = conteudoTrilhas[trilhaId];
    if (!trilha) return;
    
    const trilhaDiv = document.createElement('div');
    trilhaDiv.innerHTML = `
      <a href="praticar.html?trilha=${trilhaId}">
        <img src="${trilha.imagem}" alt="${trilha.titulo}">
        <p>${trilha.titulo}</p>
      </a>
    `;
    trilhasContainer.appendChild(trilhaDiv);
  });
  
  const addDiv = document.createElement('div');
  addDiv.innerHTML = `
    <a href="#" id="btn-adicionar-trilha">
      <div id="more">
        <i data-lucide="plus" id="svg-big"></i>
      </div>
      <p>Adicionar trilha</p>
    </a>
  `;
  trilhasContainer.appendChild(addDiv);
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  document.getElementById('btn-adicionar-trilha')?.addEventListener('click', abrirModalAdicionar);
}


function abrirModalAdicionar(e) {
  e.preventDefault();
  
  const trilhasAtivas = carregarTrilhas();
  const trilhasDisponiveis = Object.keys(conteudoTrilhas).filter(
    id => !trilhasAtivas.includes(id)
  );
  
  if (trilhasDisponiveis.length === 0) {
    alert('Todas as trilhas já foram adicionadas! 🎉');
    return;
  }
  
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.id = 'modal-adicionar';
  
  let opcoesHTML = '';
  trilhasDisponiveis.forEach(id => {
    const trilha = conteudoTrilhas[id];
    opcoesHTML += `
      <div class="trilha-opcao" data-trilha="${id}">
        <img src="${trilha.imagem}" alt="${trilha.titulo}">
        <p>${trilha.titulo}</p>
      </div>
    `;
  });
  
  modal.innerHTML = `
    <div class="modal-content modal-trilhas">
      <div class="modal-icon">
        <i data-lucide="book-plus"></i>
      </div>
      <h2>Adicionar Trilha</h2>
      <p>Escolha uma trilha para adicionar:</p>
      <div class="trilhas-opcoes">
        ${opcoesHTML}
      </div>
      <button class="modal-button modal-cancelar">Cancelar</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  modal.querySelector('.modal-cancelar').addEventListener('click', () => {
    modal.remove();
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  document.querySelectorAll('.trilha-opcao').forEach(opcao => {
    opcao.addEventListener('click', () => {
      const trilhaId = opcao.dataset.trilha;
      adicionarTrilha(trilhaId);
      modal.remove();
    });
  });
}

function adicionarTrilha(trilhaId) {
  const trilhasAtivas = carregarTrilhas();
  
  if (!trilhasAtivas.includes(trilhaId)) {
    trilhasAtivas.push(trilhaId);
    salvarTrilhas(trilhasAtivas);
    renderizarTrilhas();
    
    mostrarMensagem('Trilha adicionada com sucesso! ✅', 'sucesso');
  }
}



function ativarModoExclusao(e) {
  e.preventDefault();
  
  const trilhasAtivas = carregarTrilhas();
  
  if (trilhasAtivas.length === 1) {
    alert('Você precisa ter pelo menos uma trilha ativa! 📚');
    return;
  }
  
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.id = 'modal-excluir';
  
  let opcoesHTML = '';
  trilhasAtivas.forEach(id => {
    const trilha = conteudoTrilhas[id];
    opcoesHTML += `
      <div class="trilha-opcao trilha-excluir" data-trilha="${id}">
        <img src="${trilha.imagem}" alt="${trilha.titulo}">
        <p>${trilha.titulo}</p>
        <div class="excluir-badge">
          <i data-lucide="x"></i>
        </div>
      </div>
    `;
  });
  
  modal.innerHTML = `
    <div class="modal-content modal-trilhas">
      <div class="modal-icon" style="background: #ff4444;">
        <i data-lucide="trash-2"></i>
      </div>
      <h2>Excluir Trilha</h2>
      <p>Selecione a trilha que deseja remover:</p>
      <div class="trilhas-opcoes">
        ${opcoesHTML}
      </div>
      <button class="modal-button modal-cancelar">Cancelar</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  modal.querySelector('.modal-cancelar').addEventListener('click', () => {
    modal.remove();
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  document.querySelectorAll('.trilha-excluir').forEach(opcao => {
    opcao.addEventListener('click', () => {
      const trilhaId = opcao.dataset.trilha;
      const trilha = conteudoTrilhas[trilhaId];
      
      if (confirm(`Tem certeza que deseja remover a trilha "${trilha.titulo}"?`)) {
        excluirTrilha(trilhaId);
        modal.remove();
      }
    });
  });
}

function excluirTrilha(trilhaId) {
  let trilhasAtivas = carregarTrilhas();
  
  if (trilhasAtivas.length <= 1) {
    alert('Você precisa ter pelo menos uma trilha ativa! 📚');
    return;
  }
  
  trilhasAtivas = trilhasAtivas.filter(id => id !== trilhaId);
  salvarTrilhas(trilhasAtivas);
  renderizarTrilhas();
  
  mostrarMensagem('Trilha removida com sucesso! 🗑️', 'erro');
}


function mostrarMensagem(texto, tipo = 'sucesso') {
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


function getTrilhaFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('trilha') || 'algoritmos';
}

function carregarConteudo() {
  const trilha = getTrilhaFromURL();
  const conteudo = conteudoTrilhas[trilha];
  
  if (!conteudo) return;
  
  const tituloElement = document.querySelector('.select-trilha p');
  if (tituloElement) {
    tituloElement.textContent = conteudo.titulo;
  }
  
  const articleElement = document.querySelector('.article-resume');
  if (articleElement) {
    let html = '';
    
    conteudo.secoes.forEach(secao => {
      html += `
        <section>
          <h1>${secao.titulo}</h1>
          ${secao.conteudo}
        </section>
      `;
    });
    

    
    html += '</div>';
    articleElement.innerHTML = html;
    
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
      if (typeof activateFlipCards === 'function') {
        activateFlipCards();
      }
    }, 100);
  }
}


document.addEventListener('DOMContentLoaded', function() {

  if (document.querySelector('.trilhas-choice')) {
    renderizarTrilhas();
    
    const btnExcluir = document.querySelector('.endpage');
    if (btnExcluir) {
      btnExcluir.addEventListener('click', ativarModoExclusao);
    }
  }
  
  if (document.querySelector('.article-resume')) {
    carregarConteudo();
  }
});