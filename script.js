
          
      const musica = document.getElementById('musica');
      const btn = document.getElementById('btnSom');

      // Autoplay mutado
      musica.muted = true;
      musica.play().catch(err => console.log("Autoplay bloqueado, esperando interação."));

      // Botão para ativar/desativar som
      btn.addEventListener('click', () => {
        if (musica.muted) {
          musica.muted = false;
          btn.textContent = "🔈 Desativar Som";
          musica.play(); // necessário para alguns navegadores
        } else {
          musica.muted = true;
          btn.textContent = "🔊 Ativar Som";
        }
      });
    // Função para inicializar cada carrossel separadamente
    function initCarrossel(carrosselId) {
      const carrossel = document.getElementById(carrosselId);
      const slides = carrossel.querySelectorAll('.slide');
      const dotsContainer = carrossel.parentElement.querySelector('.dots-container');
      let index = 0;
      const total = slides.length;
      let timer = null;

      slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);

        dot.addEventListener('click', () => {
          gotoSlide(i);
          resetInterval();
        });
      });

      function showSlide(i) {
        slides.forEach(s => s.classList.remove('ativo'));
        slides[i].classList.add('ativo');

        dotsContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        dotsContainer.querySelector(`.dot[data-index="${i}"]`).classList.add('active');
      }

      function gotoSlide(i) {
        index = (i + total) % total;
        showSlide(index);
      }

      function nextSlide() {
        index = (index + 1) % total;
        showSlide(index);
      }

      function resetInterval() {
        if (timer) clearInterval(timer);
        timer = setInterval(nextSlide, 1000);
      }

      resetInterval();

      carrossel.addEventListener('mouseenter', () => clearInterval(timer));
      carrossel.addEventListener('mouseleave', resetInterval);
    }

    // Inicializa cada carrossel
    initCarrossel('carrossel1');
    initCarrossel('carrossel2');
   
