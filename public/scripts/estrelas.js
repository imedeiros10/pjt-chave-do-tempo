// === estrelas.js ===
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'estrelas';
    document.body.appendChild(canvas);
  
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
  
    const estrelas = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.5 + 0.2
    }));
  
    function desenhar() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      estrelas.forEach(estrela => {
        ctx.beginPath();
        ctx.arc(estrela.x, estrela.y, estrela.radius, 0, Math.PI * 2);
        ctx.fill();
        estrela.y += estrela.speed;
        if (estrela.y > height) estrela.y = 0;
      });
      requestAnimationFrame(desenhar);
    }
  
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  
    desenhar();
  });
  