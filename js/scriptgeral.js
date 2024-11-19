
// Função para adicionar os eventos ao menu e overlay
function initializeMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('overlay');
  const body = document.body;

  if (!hamburger || !navLinks || !overlay) return;

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
      body.classList.remove('menu-open'); // Habilita a rolagem da página
  }

  // Adiciona evento de clique ao ícone do hambúrguer
  hamburger.addEventListener('click', openMenu);

  // Adiciona evento de clique ao overlay para fechar o menu
  overlay.addEventListener('click', closeMenu);

  // Fecha o menu ao clicar fora dele ou no overlay
  document.addEventListener('click', (event) => {
      if (!navLinks.contains(event.target) && event.target !== hamburger && overlay.classList.contains('active')) {
          closeMenu();
      }
  });
}

// Monitora a presença dos elementos no DOM e inicializa o menu quando disponíveis
const checkForElements = setInterval(() => {
  if (document.getElementById('hamburger') && document.getElementById('nav-links') && document.getElementById('overlay')) {
      clearInterval(checkForElements);
      initializeMenu();
  }
}, 100); // Verifica a cada 100ms até encontrar os elementos

// ------------------- PAGINAS CATEGORIA LOGIC -------------------
     // Filtro de categorias com deseleção
     document.querySelectorAll('.category-buttons img').forEach(button => {
        button.addEventListener('click', function() {
            const alreadySelected = this.classList.contains('selected');

            // Remover seleção de todas as categorias
            document.querySelectorAll('.category-buttons img').forEach(img => img.classList.remove('selected'));
            
            // Se já estava selecionada, desmarque e mostre todas as campanhas
            if (alreadySelected) {
                // Mostrar todas as campanhas
                document.querySelectorAll('.campaign').forEach(campaign => campaign.style.display = 'block');
            } else {
                // Selecionar a nova categoria
                this.classList.add('selected');

                // Mostrar apenas as campanhas da categoria selecionada
                const category = this.getAttribute('data-category');
                document.querySelectorAll('.campaign').forEach(campaign => {
                    campaign.style.display = campaign.getAttribute('data-category') === category ? 'block' : 'none';
                });
            }
        });
    });



    document.addEventListener("DOMContentLoaded", function() {
      const campaigns = Array.from(document.querySelectorAll("#campaigns .campaign"));
      const paginationContainer = document.getElementById("pagination");
      const itemsPerPage = 9; // Exibir 9 campanhas por página
      const totalPages = Math.ceil(campaigns.length / itemsPerPage);
      let currentPage = 1;
  
      // Função para exibir apenas as campanhas da página atual
      function displayPage(page) {
          const start = (page - 1) * itemsPerPage;
          const end = page * itemsPerPage;
  
          campaigns.forEach((campaign, index) => {
              campaign.style.display = (index >= start && index < end) ? "block" : "none";
          });
          
          // Atualizar estilo do botão ativo
          document.querySelectorAll(".pagination-button").forEach((button, idx) => {
              button.classList.toggle("active", idx === page - 1);
          });
      }
  
      // Criar botões de navegação de página
      function createPaginationButtons() {
          for (let i = 1; i <= totalPages; i++) {
              const button = document.createElement("div");
              button.classList.add("pagination-button");
              button.textContent = i;
  
              // Adiciona evento de clique para cada botão
              button.addEventListener("click", function() {
                  currentPage = i;
                  displayPage(currentPage);
              });
              
              paginationContainer.appendChild(button);
          }
      }
  
      // Inicializar a primeira página e botões de navegação
      createPaginationButtons();
      displayPage(currentPage);
  });
  
    // Paginação
    document.querySelectorAll('.pagination button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.pagination button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const page = this.getAttribute('data-page');

            // Simulação de paginação
            document.querySelectorAll('.campaign').forEach((campaign, index) => {
                if (Math.floor(index / 9) + 1 == page) {
                    campaign.style.display = 'block';
                } else {
                    campaign.style.display = 'none';
                }
            });
        });
    });

    // Inicializar a página 1
    document.querySelectorAll('.campaign').forEach((campaign, index) => {
        campaign.style.display = index < 9 ? 'block' : 'none';
    });


    document.addEventListener("DOMContentLoaded", function() {
      const campaigns = Array.from(document.querySelectorAll("#campaigns .campaign"));
      const paginationContainer = document.getElementById("pagination");
      const searchBar = document.getElementById("search-bar");
      const itemsPerPage = 9;
      let currentPage = 1;
      let filteredCampaigns = campaigns;
  
      const totalPages = () => Math.ceil(filteredCampaigns.length / itemsPerPage);
  
      // Função para exibir campanhas da página atual
      function displayPage(page) {
          const start = (page - 1) * itemsPerPage;
          const end = page * itemsPerPage;
  
          campaigns.forEach(campaign => campaign.style.display = "none"); // Esconde todas inicialmente
          filteredCampaigns.slice(start, end).forEach(campaign => campaign.style.display = "block"); // Mostra apenas as da página
  
          // Atualizar estilo do botão ativo
          document.querySelectorAll(".pagination-button").forEach((button, idx) => {
              button.classList.toggle("active", idx === page - 1);
          });
      }
  
      // Função para criar botões de paginação com base nas campanhas filtradas
      function createPaginationButtons() {
          paginationContainer.innerHTML = ""; // Limpa os botões de paginação antigos
          for (let i = 1; i <= totalPages(); i++) {
              const button = document.createElement("div");
              button.classList.add("pagination-button");
              button.textContent = i;
  
              // Evento de clique para cada botão
              button.addEventListener("click", function() {
                  currentPage = i;
                  displayPage(currentPage);
              });
              
              paginationContainer.appendChild(button);
          }
      }
  
      // Função para filtrar campanhas baseado no texto de pesquisa
      function filterCampaigns(query) {
          const searchQuery = query.toLowerCase();
          filteredCampaigns = campaigns.filter(campaign => {
              const textContent = campaign.textContent.toLowerCase();
              return textContent.includes(searchQuery);
          });
  
          // Reinicializa para a primeira página após filtragem
          currentPage = 1;
          createPaginationButtons();
          displayPage(currentPage);
      }
  
      // Listener para entrada de texto na barra de pesquisa
      searchBar.addEventListener("input", (e) => filterCampaigns(e.target.value));
  
      // Inicializar a primeira página e botões de navegação
      createPaginationButtons();
      displayPage(currentPage);
  });
  

// ------------------- Carousel -------------------

const images = document.querySelectorAll('.carousel-img');
const progressBar = document.querySelector('.progress');
let currentIndex = 0;
const totalImages = images.length;
const intervalTime = 5000; // Tempo de transição (5 segundos)

// Função para mover o carrossel
function updateCarousel() {
  const leftIndex = (currentIndex - 1 + totalImages) % totalImages;
  const rightIndex = (currentIndex + 1) % totalImages;

  images[rightIndex].classList.add('right');
  images[currentIndex].classList.add('center');
  images[leftIndex].classList.add('left');

  setTimeout(() => {
    images.forEach(image => image.classList.remove('left', 'center', 'right'));

    images[currentIndex].classList.add('left');
    images[rightIndex].classList.add('center');
    images[(rightIndex + 1) % totalImages].classList.add('right');

    currentIndex = rightIndex;
  }, 1000); // Transição com 1 segundo de delay

  // Atualiza barra de progresso
  progressBar.style.width = '0';
  setTimeout(() => {
    progressBar.style.width = '100%';
  }, 10);
}

// Inicializa o carrossel
setInterval(updateCarousel, intervalTime);
progressBar.style.width = '100%';


// ------------------- Animações -------------------

// Função genérica para adicionar animações
function handleAnimations(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      entry.target.classList.remove('invisible');
      observer.unobserve(entry.target);
    }
  });
}

// Função para observadores com animação de crescimento
function handleGrowLine(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelector('.border').classList.add('grow-line');
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}

// Configurações do observer
const observerOptions = {
  root: null,
  threshold: 0.1
};

// Observador para fade-in
const fadeInObserver = new IntersectionObserver(handleAnimations, observerOptions);

// Observador para crescimento de linha (barras, título "Depoimentos")
const growObserver = new IntersectionObserver(handleGrowLine, observerOptions);

// Animação para depoimentos com delay
const testimonialObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('slide-up');
        entry.target.classList.remove('invisible');
      }, index * 300); // Atraso de 300ms entre cada depoimento
      testimonialObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animação para o botão explorar e os botões de categoria
const buttonsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-up');
      buttonsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);


// ------------------- DOMContentLoaded -------------------

document.addEventListener("DOMContentLoaded", function() {
  // Seleciona elementos para animações
  document.querySelectorAll('.campaign').forEach(campaign => {
    campaign.classList.add('invisible');
    fadeInObserver.observe(campaign);
  });

  document.querySelectorAll('.category-buttons img').forEach(button => {
    button.classList.add('invisible');
    buttonsObserver.observe(button);
  });

  const exploreButton = document.querySelector('.explore-more');
  exploreButton.classList.add('invisible');
  buttonsObserver.observe(exploreButton);

  // Observa títulos e depoimentos
  growObserver.observe(document.querySelector('.depoimentos'));
  document.querySelectorAll('.testimonial').forEach(testimonial => {
    testimonial.classList.add('invisible');
    testimonialObserver.observe(testimonial);
  });
  document.querySelectorAll('.text-title').forEach(title => {
    title.classList.add('invisible');
    growObserver.observe(title);
});

  growObserver.observe(document.querySelector('.campanhastex'));
  growObserver.observe(document.querySelector('.carotex'));
  growObserver.observe(document.querySelector('.mapa'));

  // Animação do mapa e pontos
  const map = document.querySelector('.map-container');
  map.classList.add('invisible');
  const mapObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-in');
        document.querySelectorAll('.map-point').forEach(point => {
          point.classList.add('fade-in');
          point.classList.remove('invisible');
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  mapObserver.observe(map);

  // Observa e anima números
  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers(entry.target);
        entry.target.classList.add('fade-in');
        numberObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.text-value').forEach(number => {
    number.classList.add('invisible');
    numberObserver.observe(number);
  });
});

// Função de animação para números
function animateNumbers(element) {
  const finalValue = parseInt(element.textContent.replace('', '').replace('.', ''));
  let currentValue = 0;
  const duration = 1000;
  const increment = finalValue / (duration / 20);

  const updateValue = () => {
    currentValue += increment;
    if (currentValue < finalValue) {
      element.textContent = Math.floor(currentValue).toLocaleString('pt-BR') + '';
      requestAnimationFrame(updateValue);
    } else {
      element.textContent = finalValue.toLocaleString('pt-BR') + '';
    }
  };
  requestAnimationFrame(updateValue);
}

// Botão para abrir o modal
const contatoButton = document.getElementById("contatoButton");
const contactModal = document.getElementById("contactModal");

// Abrir modal ao clicar no botão "Contato"
contatoButton.addEventListener("click", () => {
    contactModal.classList.remove("hidden");
});

// Fechar modal ao clicar fora do conteúdo
contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
        contactModal.classList.add("hidden");
    }
});

// Máscara para o campo de telefone
const telefoneInput = document.getElementById("telefone");
telefoneInput.addEventListener("input", (e) => {
    e.target.value = e.target.value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
});


