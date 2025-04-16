
// === cartas-multiplas.js (com WeatherAPI) ===

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('btnCartaDia');
    const resultado = document.getElementById('resultadoCarta');
    const tabs = document.querySelectorAll('.tarot-tabs button');
    const instrucao = document.getElementById('instrucao-tarot');

    const cartas = []; // Adicione suas cartas aqui conforme já existiam antes

    const tocarSineta = () => {
        const audio = new Audio('assets/sounds/sineta.mp3');
        audio.play();
    };

    let tipoAtual = "dia";

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(b => b.classList.remove('tab-ativa'));
            tab.classList.add('tab-ativa');
            tipoAtual = tab.dataset.tipo;
            resultado.innerHTML = "";
            btn.disabled = false;

            instrucao.textContent = {
                "dia": "Clique para revelar a carta do dia:",
                "amor": "Revele uma carta com sua energia amorosa:",
                "financeiro": "Descubra uma carta para sua área financeira:"
            }[tipoAtual];
        });
    });

    btn.addEventListener('click', () => {
        const hoje = new Date().toISOString().slice(0, 10);
        const chave = `carta-${tipoAtual}`;
        const dadosSalvos = JSON.parse(localStorage.getItem(chave));

        if (dadosSalvos && dadosSalvos.data === hoje) {
            resultado.innerHTML = dadosSalvos.html;
            btn.disabled = true;
            return;
        }

        btn.disabled = true;
        resultado.innerHTML = `
        <p style="font-style: italic;">Respire fundo...<br>Procure um local silencioso...<br>Intencione sua pergunta...</p>
        `;

        setTimeout(() => {
            const carta = cartas[Math.floor(Math.random() * cartas.length)];
            tocarSineta();

            const mensagem = carta[tipoAtual] || carta.geral;

            const html = `
            <h3>${carta.nome}</h3>
            <img src="assets/cartas/${carta.arquivo}" alt="${carta.nome}" style="max-width: 200px; margin: 10px auto;" />
            <p>${mensagem}</p>
            `;

            resultado.innerHTML = html;

            localStorage.setItem(chave, JSON.stringify({
                data: hoje,
                html: resultado.innerHTML
            }));
        }, 4000);
    });

    // 🌕 Fase da Lua com WeatherAPI
    const hojeData = new Date().toISOString().slice(0, 10);
    fetch("https://api.weatherapi.com/v1/astronomy.json?key=38e99f57411c4870b40175921251504&q=São Paulo&dt=" + hojeData)
      .then(res => res.json())
      .then(data => {
        const fase = data.astronomy.astro.moon_phase;
        const iluminacao = data.astronomy.astro.moon_illumination;
        const txt = `${fase} (${iluminacao}%)`;
        const el = document.getElementById("faseLuaTexto");
        if (el) el.textContent = txt;
      })
      .catch(err => console.error("Erro ao buscar fase da lua (WeatherAPI):", err));

    // 🪐 Trânsito Astrológico
    const transitos = [
        "Lua em Áries", "Lua em Touro", "Lua em Gêmeos", "Lua em Câncer",
        "Lua em Leão", "Lua em Virgem", "Lua em Libra", "Lua em Escorpião"
    ];
    const transitoHoje = transitos[new Date().getDate() % transitos.length];
    document.getElementById("astrologiaTexto").textContent = transitoHoje;

    // ✨ Frase mágica breve
    const frases = [
        "Você é luz.",
        "Confie no seu brilho.",
        "Hoje é um portal.",
        "Magia começa com intenção.",
        "Respire. Receba. Renove."
    ];
    const fraseEscolhida = frases[Math.floor(Math.random() * frases.length)];
    document.getElementById("fraseMagicaTexto").textContent = fraseEscolhida;
});
