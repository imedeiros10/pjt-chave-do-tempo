// === scripts-unificados.js ===



// === Carrossel de Depoimentos (carrossel.js) ===

// === carrossel.js ===
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const bolinhas = document.querySelectorAll('.bolinha');
    const esquerda = document.querySelector('.seta.esquerda');
    const direita = document.querySelector('.seta.direita');
    const pauseBtn = document.getElementById('pauseBtn');

    if (!slides.length) return;

    let indiceAtual = 0;
    let intervalo;
    let pausado = false;

    function mostrarSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('ativo', i === index);
            if (bolinhas[i]) bolinhas[i].classList.toggle('ativa', i === index);
        });
        indiceAtual = index;
    }

    function proximo() {
        mostrarSlide((indiceAtual + 1) % slides.length);
    }

    function anterior() {
        mostrarSlide((indiceAtual - 1 + slides.length) % slides.length);
    }

    function iniciarAuto() {
        intervalo = setInterval(() => {
            if (!pausado) proximo();
        }, 5000);
    }

    function pararAuto() {
        clearInterval(intervalo);
    }

    function reiniciarAuto() {
        pararAuto();
        if (!pausado) iniciarAuto();
    }

    direita?.addEventListener('click', () => { proximo(); reiniciarAuto(); });
    esquerda?.addEventListener('click', () => { anterior(); reiniciarAuto(); });
    bolinhas?.forEach((bolinha, index) => {
        bolinha.addEventListener('click', () => {
            mostrarSlide(index);
            reiniciarAuto();
        });
    });

    pauseBtn?.addEventListener('click', () => {
        pausado = !pausado;
        pauseBtn.textContent = pausado ? '▶️ Retomar' : '⏸ Pausar';
    });

    mostrarSlide(indiceAtual);
    iniciarAuto();
});

// === Cartas do Tarot com WeatherAPI (cartas-multiplas-weatherapi.js) ===

const cartas = [
    {
      nome: "O Louco",
      arquivo: "0_o_bobo.jpg",
      geral: "O Louco convida você a mergulhar no desconhecido com leveza e fé. Mesmo sem saber o caminho, há magia na jornada quando você se permite confiar no Universo.",
      amor: "Na esfera amorosa, O Louco pede entrega sem medo. Aventuras inesperadas podem surgir, mas cuidado para não ignorar sinais do coração.",
      financeiro: "Um novo começo financeiro pode se apresentar. Arrisque com sabedoria, confie em sua intuição e dê o primeiro passo rumo ao inesperado."
    },
    {
      nome: "O Mago",
      arquivo: "1_o_mago.jpg",
      geral: "Você possui todas as ferramentas necessárias para manifestar seus desejos. O Mago lembra que é hora de agir com intenção e foco. Crie sua realidade.",
      amor: "No amor, suas palavras e gestos têm poder. Use sua comunicação para atrair conexões verdadeiras ou reacender a chama que parecia adormecida.",
      financeiro: "Negociações, ideias e novas propostas estão favorecidas. Use sua habilidade e criatividade para transformar planos em conquistas concretas."
    },
    {
      nome: "A Sacerdotisa",
      arquivo: "2_a_sacerdotisa.jpg",
      geral: "Mistérios antigos sussurram ao seu coração. A Sacerdotisa fala sobre sabedoria interior e a importância de ouvir mais o silêncio do que o ruído externo.",
      amor: "O momento pede introspecção no amor. O que está oculto virá à tona. Sinta antes de agir, perceba além das palavras.",
      financeiro: "Evite exposição agora. Observe, estude e aguarde o momento certo para agir com estratégia. O que você pressente está mais certo do que parece."
    },
    {
      nome: "A Imperatriz",
      arquivo: "3_a_imperatriz.jpg",
      geral: "Fertilidade, abundância e criação. A Imperatriz traz um tempo de crescimento, amor próprio e nutrição de sonhos. Cuide do que deseja ver florescer.",
      amor: "O amor pede aconchego, carinho e gestos doces. Relacionamentos se fortalecem com afeto, sensibilidade e escuta genuína.",
      financeiro: "Oportunidades podem florescer com seu toque pessoal. Invista com sensibilidade e colha resultados frutíferos. Seu talento criativo é um recurso valioso."
    },
    {
      nome: "O Imperador",
      arquivo: "4_o_imperador.jpg",
      geral: "Hora de assumir o comando da sua vida com coragem e firmeza. O Imperador pede estrutura, limites e determinação para construir algo duradouro.",
      amor: "O amor pode se manifestar com maturidade e estabilidade. Esteja presente com autoridade afetiva, mas evite rigidez emocional.",
      financeiro: "Disciplina e estratégia trarão vitórias. Este é um tempo de construir patrimônio e agir com visão de longo prazo. Confie na força da ordem."
    },
    {
      nome: "O Papa",
      arquivo: "5_o_papa.jpg",
      geral: "Sabedoria ancestral e conexão espiritual guiam seus passos. O Papa orienta a buscar conhecimento, apoio e seguir aquilo que honra a tradição da sua alma.",
      amor: "Laços profundos, baseados em respeito e valores em comum, ganham força. Honre seus princípios e fortaleça suas alianças com verdade.",
      financeiro: "Siga o caminho mais ético e estável. Consultas com especialistas ou investimentos conservadores tendem a trazer segurança e crescimento."
    },
    {
      nome: "Os Enamorados",
      arquivo: "6_os_enamorados.jpg",
      geral: "Você está diante de uma escolha significativa. Os Enamorados pedem conexão com o coração e alinhamento entre razão e emoção.",
      amor: "Uniões verdadeiras se revelam. É tempo de decisões sentimentais: seguir um caminho, fortalecer uma ligação ou redescobrir o amor-próprio.",
      financeiro: "Escolhas profissionais ou financeiras surgem: ouça sua alma, não apenas números. Parcerias podem florescer se houver harmonia nos propósitos."
    },
    {
      nome: "O Carro",
      arquivo: "7_o_carro.jpg",
      geral: "Você está pronto para avançar com força e determinação. O Carro pede foco, ação e equilíbrio emocional para vencer obstáculos.",
      amor: "Relações ganham movimento. Viagens, reencontros ou conversas decisivas marcam o momento. Direcione com intenção, não com impulsividade.",
      financeiro: "Projetos profissionais ou negociações se aceleram. É hora de agir com foco, superar distrações e buscar suas conquistas com garra."
    },
    {
      nome: "A Justiça",
      arquivo: "8_a_justica.jpg",
      geral: "Tudo que está fora de equilíbrio tende a se ajustar. A Justiça revela colheitas cármicas e pede honestidade, responsabilidade e escolhas conscientes.",
      amor: "Transparência é essencial. Seja justo com você e com o outro. Conversas sérias podem esclarecer dúvidas e trazer equilíbrio ao coração.",
      financeiro: "Questões legais ou contratuais ganham destaque. Analise cada detalhe com precisão. A justiça divina está em curso — confie no retorno do que foi plantado."
    },
    {
      nome: "O Eremita",
      arquivo: "9_o_eremita.jpg",
      geral: "Este é um tempo sagrado de recolhimento e autoconhecimento. O Eremita guia você com sua lanterna interior. O silêncio pode conter grandes respostas.",
      amor: "Solitude não é solidão. Reflita sobre o que realmente deseja em seus vínculos. Relações profundas exigem clareza interior antes de conexão exterior.",
      financeiro: "Evite pressa. Avalie seus caminhos, estude, repense estratégias. O crescimento virá com prudência e sabedoria acumulada."
    },
    {
      nome: "A Roda da Fortuna",
      arquivo: "10_roda_da_fortuna.jpg",
      geral: "A vida gira em ciclos. A Roda da Fortuna indica mudanças inesperadas que trazem movimento ao seu destino. Aceite o fluxo e abrace a transformação.",
      amor: "O amor pode surpreender. Reviravoltas emocionais podem renovar ou encerrar vínculos. Deixe o coração girar com leveza.",
      financeiro: "Mudanças de sorte. Uma nova fase financeira se inicia, mas exige atenção: o que sobe pode descer, e vice-versa. Aproveite com equilíbrio."
    },
    {
      nome: "A Força",
      arquivo: "11_a_forca.jpg",
      geral: "Você tem dentro de si a força que precisa. A verdadeira coragem não grita: ela sussurra com paciência, compaixão e domínio de si.",
      amor: "Relações exigem sensibilidade com firmeza. Não se trata de dominar o outro, mas de acolher com respeito, mesmo nas diferenças.",
      financeiro: "Desafios serão vencidos com determinação e equilíbrio emocional. Mantenha o foco e use sua inteligência emocional para prosperar."
    },
    {
      nome: "O Enforcado",
      arquivo: "12_o_enforcado.jpg",
      geral: "O momento pede pausa e rendição. O Enforcado revela que às vezes, para seguir, é preciso soltar. Veja a vida sob uma nova perspectiva.",
      amor: "Relacionamentos podem estar estagnados. Em vez de forçar respostas, contemple o silêncio. O tempo trará clareza e cura.",
      financeiro: "Evite grandes decisões agora. O sacrifício presente trará libertação futura. Confie no tempo divino dos resultados."
    },
    {
      nome: "A Morte",
      arquivo: "13_a_morte.jpg",
      geral: "Fim, transição e renascimento. A Morte limpa o terreno para que algo novo floresça. Não resista às mudanças: abrace sua evolução.",
      amor: "Relacionamentos se transformam ou chegam ao fim. Honre o que passou e esteja aberto para novas conexões mais alinhadas com seu ser.",
      financeiro: "Encerramentos financeiros podem abrir portas. Desapegue do que não serve mais e permita a renovação energética na sua vida material."
    },
    {
      nome: "A Temperança",
      arquivo: "14_a_temperanca.jpg",
      geral: "Cure, harmonize, una os opostos. A Temperança pede paciência, equilíbrio e alquimia entre razão e emoção, ação e contemplação.",
      amor: "Diálogo e equilíbrio fortalecem laços. Não há pressa: os sentimentos amadurecem com cuidado e presença.",
      financeiro: "É tempo de organizar e moderar. Misture intuição e racionalidade. Ajustes financeiros feitos agora trarão estabilidade duradoura."
    },
    {
      nome: "O Diabo",
      arquivo: "15_o_diabo.jpg",
      geral: "Você está preso a algo que precisa ser libertado. O Diabo revela vícios, apegos ou ilusões que limitam sua expansão. Reaja com consciência.",
      amor: "Relacionamentos intensos, mas possivelmente tóxicos. É hora de reconhecer padrões que aprisionam e escolher a liberdade interior.",
      financeiro: "Cuidado com armadilhas financeiras, promessas fáceis ou gastos impulsivos. Questione o que está comandando suas decisões."
    },
    {
      nome: "A Torre",
      arquivo: "16_a_torre.jpg",
      geral: "Algo que estava instável pode ruir. A Torre quebra ilusões e constrói verdade. Pode parecer desafiador, mas a libertação vem logo após.",
      amor: "Revelações chocantes ou rupturas trazem clareza. Às vezes, é preciso o colapso para que o amor real possa nascer.",
      financeiro: "Mudanças bruscas exigem coragem e reconstrução. Mesmo perdas são oportunidades para recomeçar com mais consciência."
    },
    {
      nome: "A Estrela",
      arquivo: "17_a_estrela.jpg",
      geral: "Depois da tormenta, a luz. A Estrela traz cura, esperança e inspiração. Reconecte-se com sua fé e propósito: o caminho está se iluminando.",
      amor: "Relações se suavizam e curam. Permita que o amor renasça com pureza e verdade, seja com outro ou com você mesmo.",
      financeiro: "Novas ideias e conexões podem trazer prosperidade. Semeie com fé, pois há bênçãos no horizonte."
    },
    {
      nome: "A Lua",
      arquivo: "18_a_lua.jpg",
      geral: "Nem tudo está claro. A Lua envolve mistérios, sonhos e intuições. Confie mais no sentir do que no ver.",
      amor: "Romances envolventes ou ilusões podem surgir. O que parece encantado pode esconder inseguranças. Sinta com os pés no chão.",
      financeiro: "Evite decisões por impulso. Analise bem contratos e propostas. Intuição é sua bússola, mas mantenha a razão desperta."
    },
    {
      nome: "O Sol",
      arquivo: "19_o_sol.jpg",
      geral: "Alegria, clareza e vitalidade. O Sol aquece sua jornada com sucesso e positividade. Compartilhe sua luz com o mundo.",
      amor: "Relacionamentos florescem. Amor verdadeiro, sorrisos compartilhados e encontros de alma são possíveis agora.",
      financeiro: "Hora de colher frutos, lançar projetos ou expandir. Sucesso e reconhecimento estão ao seu alcance."
    },
    {
      nome: "O Julgamento",
      arquivo: "20_o_julgamento.jpg",
      geral: "Um chamado interior ecoa. O Julgamento desperta a consciência para renascer. Cure o passado, aceite o presente e abrace seu futuro.",
      amor: "Reencontros e reconciliações podem surgir. Perdoe, se for necessário, e escolha com sabedoria o que deseja recomeçar.",
      financeiro: "A hora da verdade: decisões antigas cobram retorno. Aja com responsabilidade e prepare-se para renascimentos financeiros."
    },
    {
      nome: "O Mundo",
      arquivo: "21_o_mundo.jpg",
      geral: "Você está encerrando um ciclo com maestria. O Mundo celebra conquistas, plenitude e alinhamento com sua missão de alma.",
      amor: "Relacionamentos ganham profundidade e realização. É hora de viver o amor em sua forma mais verdadeira e inteira.",
      financeiro: "Projetos chegam ao sucesso. Celebre, expanda-se e reconheça tudo que você construiu. Você está em sintonia com a abundância do universo."
    }
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnCartaDia");
    const resultado = document.getElementById("resultadoCarta");
    const tabs = document.querySelectorAll(".tarot-tabs button");
    const instrucao = document.getElementById("instrucao-tarot");
  
    let tipoAtual = "geral";
  
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(b => b.classList.remove("tab-ativa"));
        tab.classList.add("tab-ativa");
        tipoAtual = tab.dataset.tipo === "dia" ? "geral" : tab.dataset.tipo;
        resultado.innerHTML = "";
        btn.disabled = false;
  
        instrucao.textContent = {
          "geral": "Clique para revelar a carta do dia:",
          "amor": "Revele uma carta com sua energia amorosa:",
          "financeiro": "Descubra uma carta para sua área financeira:"
        }[tipoAtual];
      });
    });
  
    btn.addEventListener("click", () => {
      const hoje = new Date().toISOString().slice(0, 10);
      const chave = `carta-${tipoAtual}`;
      const dadosSalvos = JSON.parse(localStorage.getItem(chave));
  
      if (dadosSalvos && dadosSalvos.data === hoje) {
        resultado.innerHTML = dadosSalvos.html;
        btn.disabled = true;
        return;
      }
  
      resultado.innerHTML = `<p style="text-align:center; font-style: italic;">🌙 Concentre-se... a energia está sendo revelada...</p>`;
      btn.disabled = true;
  
      setTimeout(() => {
        const carta = cartas[Math.floor(Math.random() * cartas.length)];
        tocarSineta();
  
        const nome = carta.nome;
        const mensagem = carta[tipoAtual];
        const urlZap = `https://api.whatsapp.com/send?phone=5511984540187&text=${encodeURIComponent(
          `Oi Amanda, tirei a carta "${nome}" na categoria "${tipoAtual.toUpperCase()}". A mensagem foi: "${mensagem}". Gostaria de entender melhor o que isso quer dizer para mim.`
        )}`;
  
        const html = `
          <h2>${nome}</h2>
          <img src="assets/cartas/${carta.arquivo}" alt="${nome}" />
          <p class="mensagem-destacada">${mensagem}</p>
  
          <div class="cta-whatsapp destaque-chamado">
            <p>🔮 <strong>Quer saber o que mais essa energia tem a te dizer?</strong></p>
            <p style="font-size: 0.95rem; color: #5F080F;">Converse diretamente comigo e receba uma interpretação completa da sua carta.</p>
            <a href="${urlZap}" target="_blank" class="botao-zap">💌 Fale comigo no WhatsApp</a>
          </div>
        `;
  
        resultado.innerHTML = html;
        resultado.style.display = "block";
  
        localStorage.setItem(chave, JSON.stringify({
          data: hoje,
          html: html
        }));
      }, 4000);
    });
  
    function tocarSineta() {
      const audio = new Audio('assets/sounds/sineta.mp3');
      audio.play();
    }
  });

// === Efeito de Estrelas no Fundo (estrelas.js) ===

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

// === Cálculo e Exibição da Fase da Lua (fase-lua.js) ===

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

// === Filtro dos Tipos de Consulta (filtros.js) ===

// === filtros.js ===
document.addEventListener('DOMContentLoaded', () => {
    const botoesFiltro = document.querySelectorAll('.filtro');
    const cards = document.querySelectorAll('.card');

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            const categoria = botao.getAttribute('data-categoria');

            cards.forEach(card => {
                const cardCategoria = card.getAttribute('data-categoria');
                card.style.display = (categoria === 'todos' || categoria === cardCategoria) ? 'block' : 'none';
            });
        });
    });
});