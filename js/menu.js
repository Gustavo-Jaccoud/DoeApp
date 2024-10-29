document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos necessários
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('overlay');
    const body = document.body;

    // Função para abrir o menu
    function openMenu() {
        navLinks.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open'); // Impede a rolagem da página
    }

    // Função para fechar o menu
    function closeMenu() {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    hamburger.addEventListener('click', openMenu);

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && event.target !== hamburger && overlay.classList.contains('active')) {
            closeMenu();
        }
    });
});
