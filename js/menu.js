document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('overlay');
    const body = document.body;
    const btnPerfil = document.querySelector('.btn-perfil');
    const isUserLoggedIn = localStorage.getItem("logado") === "true";

    function openMenu() {
        navLinks.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    hamburger.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    // Lógica para usuários logados
    if (isUserLoggedIn) {
        document.querySelector(".btn-entrar").classList.add("sumir");
        document.querySelector(".btn-cadastrar").classList.add("sumir");

        const nome = localStorage.getItem("nome");
        if (nome) {
            btnPerfil.textContent = nome;
        }

        // Cria um dropdown no desktop
        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-menu', 'desktop-only');
        
        const profileLinkDesktop = document.createElement('a');
        profileLinkDesktop.href = 'perfil.html';
        profileLinkDesktop.textContent = 'Ver Perfil';
        
        const logoutLinkDesktop = document.createElement('a');
        logoutLinkDesktop.href = '#';
        logoutLinkDesktop.textContent = 'Deslogar';
        logoutLinkDesktop.addEventListener('click', () => {
            localStorage.removeItem('logado');
            localStorage.removeItem('nome');
            location.reload();
        });
        
        dropdownMenu.appendChild(profileLinkDesktop);
        dropdownMenu.appendChild(logoutLinkDesktop);
        btnPerfil.parentNode.insertBefore(dropdownMenu, btnPerfil.nextSibling);

        // Dropdown - desktop
        btnPerfil.addEventListener('click', (event) => {
            event.preventDefault();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', (event) => {
            if (!dropdownMenu.contains(event.target) && event.target !== btnPerfil) {
                dropdownMenu.style.display = 'none';
            }
        });

        // Dropdown - mobile
        const profileLinkMobile = document.createElement('a');
        profileLinkMobile.href = 'perfil.html';
        profileLinkMobile.textContent = 'Ver Perfil';
        profileLinkMobile.classList.add('mobile-only');

        const logoutLinkMobile = document.createElement('a');
        logoutLinkMobile.href = '#';
        logoutLinkMobile.textContent = 'Deslogar';
        logoutLinkMobile.classList.add('mobile-only');
        logoutLinkMobile.addEventListener('click', () => {
            localStorage.removeItem('logado');
            localStorage.removeItem('nome');
            location.reload();
        });

        navLinks.appendChild(profileLinkMobile);
        navLinks.appendChild(logoutLinkMobile);
    } else {
        btnPerfil.classList.add("sumir");
    }
});
