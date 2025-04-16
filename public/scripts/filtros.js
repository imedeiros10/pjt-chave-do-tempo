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