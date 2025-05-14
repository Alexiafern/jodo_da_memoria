const grid = document.querySelector('.grid');
const mensagem = document.getElementById('mensagem');
const botaoReiniciar = document.getElementById('reiniciar');

// Lista com o caminho das imagens
let imagens = [
  'img/1.jpg',
  'img/2.jpg',
  'img/3.avif',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg'
];

imagens = [...imagens, ...imagens]; // duplicar pares
imagens.sort(() => 0.5 - Math.random()); // embaralhar

let selecionadas = [];
let bloqueio = false;

function criarTabuleiro() {
  grid.innerHTML = '';
  imagens.forEach((imgSrc, index) => {
    const carta = document.createElement('div');
    carta.classList.add('card');
    carta.dataset.img = imgSrc;
    carta.dataset.index = index;

    const imagem = document.createElement('img');
    imagem.src = imgSrc;
    imagem.classList.add('imagem');
    imagem.style.display = 'none';

    carta.appendChild(imagem);
    carta.addEventListener('click', virarCarta);
    grid.appendChild(carta);
  });
  mensagem.textContent = '';
}

function virarCarta() {
  if (bloqueio || this.classList.contains('revelada')) return;

  this.querySelector('img').style.display = 'block';
  this.classList.add('revelada');
  selecionadas.push(this);

  if (selecionadas.length === 2) {
    bloqueio = true;
    setTimeout(verificarPar, 800);
  }
}

function verificarPar() {
  const [carta1, carta2] = selecionadas;

  if (carta1.dataset.img !== carta2.dataset.img) {
    carta1.querySelector('img').style.display = 'none';
    carta2.querySelector('img').style.display = 'none';
    carta1.classList.remove('revelada');
    carta2.classList.remove('revelada');
  }

  selecionadas = [];
  bloqueio = false;
  verificarFimDeJogo();
}

function verificarFimDeJogo() {
  const reveladas = document.querySelectorAll('.card.revelada');
  if (reveladas.length === imagens.length) {
    mensagem.textContent = 'Parabéns! Você venceu!';
  }
}

botaoReiniciar.addEventListener('click', () => {
  imagens.sort(() => 0.5 - Math.random());
  selecionadas = [];
  criarTabuleiro();
});

criarTabuleiro();