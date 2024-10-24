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
  growObserver.observe(document.querySelector('.mapa'));

  // Animação do mapa e pontos
  const map = document.querySelector('.map-container img');
  map.classList.add('invisible');
  const mapObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-in');
        document.querySelectorAll('.map-point').forEach(point => {
          point.classList.add('slide-in');
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
  const finalValue = parseInt(element.textContent.replace('R$', '').replace('.', ''));
  let currentValue = 0;
  const duration = 1000;
  const increment = finalValue / (duration / 20);

  const updateValue = () => {
    currentValue += increment;
    if (currentValue < finalValue) {
      element.textContent = Math.floor(currentValue).toLocaleString('pt-BR') + 'R$';
      requestAnimationFrame(updateValue);
    } else {
      element.textContent = finalValue.toLocaleString('pt-BR') + 'R$';
    }
  };
  requestAnimationFrame(updateValue);
}
