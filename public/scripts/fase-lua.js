// === fase-lua.js ===
function calcularFaseLua(data) {
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const dia = data.getDate();
    
    const c = Math.floor((ano / 100));
    const e = Math.floor(c / 4);
    const f = c - e;
    const g = Math.floor(((ano % 100) + (ano % 100) / 4) + 30.6 * ((mes + 9) % 12 + 1) + dia + 2 - f);
    const fase = g % 30;
  
    if (fase < 7) return { nome: "Nova", emoji: "🌑", mensagem: "Hora de plantar ideias e começar novos ciclos." };
    if (fase < 14) return { nome: "Crescente", emoji: "🌓", mensagem: "Momento de ação, foco e expansão." };
    if (fase < 22) return { nome: "Cheia", emoji: "🌕", mensagem: "Expresse gratidão e colha o que foi plantado." };
    return { nome: "Minguante", emoji: "🌘", mensagem: "Tempo de liberação, cura e descanso." };
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.id = 'fase-lua';
    document.body.prepend(container);
  
    const hoje = new Date();
    const fase = calcularFaseLua(hoje);
  
    container.innerHTML = `
      <div class="fase-lua-box">
        <span class="lua-icon">${fase.emoji}</span>
        <div>
          <strong>Lua ${fase.nome}</strong><br>
          <span>${fase.mensagem}</span>
        </div>
      </div>
    `;
  });