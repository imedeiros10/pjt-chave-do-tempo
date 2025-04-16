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