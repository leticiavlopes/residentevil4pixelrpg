// Configuração do canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Dimensões do canvas
const width = canvas.width;
const height = canvas.height;

// Configuração inicial
const title = "Escolha um personagem para prosseguir";
const characters = [
  { name: "Leon S. Kennedy", x: width / 4, y: height / 2, img: "imagemsimulacaop_personagem.png" },
  { name: "Ada Wong", x: (3 * width) / 4, y: height / 2, img: "imagemsimulacaop_personagem.png" },
];
let selectedCharacter = null;

// Carregar imagens
const images = {};
characters.forEach((char) => {
  const img = new Image();
  img.src = char.img;
  images[char.name] = img;
});

// Função para desenhar a tela inicial
function drawScreen() {
  ctx.clearRect(0, 0, width, height);

  // Desenhar o título
  ctx.font = "24px Arial";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(title, width / 2, 50);

  // Desenhar personagens
  characters.forEach((char, index) => {
    const img = images[char.name];
    if (img.complete) {
      ctx.drawImage(img, char.x - 50, char.y - 100, 100, 100);
    } else {
      img.onload = () => drawScreen();
    }

    // Desenhar caixas de texto
    ctx.fillStyle = "#222";
    ctx.fillRect(char.x - 75, char.y + 20, 150, 40);
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(char.x - 75, char.y + 20, 150, 40);

    // Nome do personagem
    ctx.font = "18px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(char.name, char.x, char.y + 45);
  });
}

// Função para detectar clique nos personagens
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  characters.forEach((char) => {
    const boxX = char.x - 75;
    const boxY = char.y + 20;
    const boxWidth = 150;
    const boxHeight = 40;

    if (
      mouseX > boxX &&
      mouseX < boxX + boxWidth &&
      mouseY > boxY &&
      mouseY < boxY + boxHeight
    ) {
      selectedCharacter = char.name;
      alert(`Você escolheu: ${char.name}`);
    }
  });
});

// Desenhar a tela inicial ao carregar
drawScreen();
