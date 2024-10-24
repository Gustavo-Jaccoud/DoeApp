// ------------------- MENU HAMBURGUER -------------------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');
const body = document.body;

// Abrir e fechar o menu ao clicar no ícone de hambúrguer
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open'); // Impede a rolagem da página
});

// Fechar o menu ao clicar fora dele (overlay)
overlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
});