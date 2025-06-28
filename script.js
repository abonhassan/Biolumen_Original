
function calcularDesconto() {
  const valorFatura = parseFloat(document.getElementById('valorFatura').value);
  const tarifa = parseFloat(document.getElementById('tarifa').value);

  if (isNaN(valorFatura) || isNaN(tarifa)) {
    document.getElementById('resultado').innerText = 'Por favor, preencha todos os campos com valores válidos.';
    return;
  }

  const valorTotal = valorFatura * tarifa;
  const valorComDesconto = valorFatura - valorTotal;
  const economiaMensal = valorTotal;

  document.getElementById('resultado').innerText =
    `Com a BioLumen, você pagaria R$ ${valorComDesconto.toFixed(2)} (economia de R$ ${economiaMensal.toFixed(2)} por mês).`;

  // Oculta o gráfico
  document.getElementById('graficoEconomia').style.display = 'block';
}



  let slideIndex = 0;
  const slides = document.querySelectorAll('.explanation_item');

  function mostrarSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function moverSlide(direcao) {
    slideIndex += direcao;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    if (slideIndex >= slides.length) slideIndex = 0;
    mostrarSlide(slideIndex);
  }

  // Inicializa com o primeiro slide
  mostrarSlide(slideIndex);

  


  function gerarGrafico() {
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const economias = [];
    let valido = true;
  
    for (let i = 0; i < 12; i++) {
      const valor = parseFloat(document.getElementById(`mes${i}`).value);
      if (isNaN(valor) || valor < 1000) {
        valido = false;
        break;
      }
      const economia = valor * 0.10;
      economias.push(economia);
    }
  
    if (!valido) {
      alert("Por favor, insira valores válidos e maiores ou iguais a R$ 1000 para todos os meses.");
      return;
    }

    document.querySelector('.calculator').classList.remove('reduzida');
    document.querySelector('.calculator').classList.add('expandida');

  
    // ✅ Mostra o gráfico caso tenha sido escondido
    const grafico = document.getElementById('graficoEconomia');
    if (grafico) {
      grafico.style.display = 'block';
    }
  
    if (window.myChart) window.myChart.destroy();
  
    const ctx = grafico.getContext('2d');
    window.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: meses,
        datasets: [{
          label: 'Economia Mensal (R$)',
          data: economias,
          backgroundColor: '#e89c00',
          borderColor: '#cc6600',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        scales: {
          y: {
            min: 100,
            max: 1000,
            title: {
              display: true,
              text: 'Economia em Reais (R$)'
            }
          }
        },
        plugins: {
          legend: {
            labels: { font: { size: 14 } }
          }
        }
      }
    });
  }
  


  document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.benefits-track');
    const dotsContainer = document.querySelector('.benefits-dots');
    const slides = document.querySelectorAll('.benefit-item');
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    function createDots() {
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('button');
        dot.addEventListener('click', () => moveToSlide(i));
        dotsContainer.appendChild(dot);
      }
      updateDots();
    }

    function moveToSlide(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${index * 100}%)`;
      updateDots();
    }

    function updateDots() {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }

    function autoSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      moveToSlide(currentIndex);
    }

    // Swipe para mobile
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const moveX = e.touches[0].clientX;
      const diffX = startX - moveX;
      if (Math.abs(diffX) > 50) {
        if (diffX > 0 && currentIndex < slides.length - 1) {
          moveToSlide(currentIndex + 1);
        } else if (diffX < 0 && currentIndex > 0) {
          moveToSlide(currentIndex - 1);
        }
        isDragging = false;
      }
    });

    track.addEventListener('touchend', () => {
      isDragging = false;
    });

    createDots();
    setInterval(autoSlide, 5000); // 5s
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.brand-name')?.classList.add('appear');
    document.querySelector('.header-content h1')?.classList.add('appear');
  });

  // This is the function for the active arrows
  
  const box = document.getElementById('explanationBox');
  const items = box.querySelectorAll('.explanation_item');
  let index = 0;

  function showSlide(newIndex) {
    if (newIndex < 0 || newIndex >= items.length) return;
    index = newIndex;
    box.style.transform = `translateX(-${index * 100}%)`;
  }

  document.querySelector('.slide-btn.prev').addEventListener('click', () => {
    showSlide(index - 1);
  });

  document.querySelector('.slide-btn.next').addEventListener('click', () => {
    showSlide(index + 1);
  });

  if (window.innerWidth > 768) {
    const box = document.getElementById('explanationBox');
    const items = box.querySelectorAll('.explanation_item');
    let index = 0;

    function showSlide(newIndex) {
      if (newIndex < 0 || newIndex >= items.length) return;
      index = newIndex;
      box.style.transform = `translateX(-${index * 100}%)`;
    }

    document.querySelector('.slide-btn.prev').addEventListener('click', () => {
      showSlide(index - 1);
    });

    document.querySelector('.slide-btn.next').addEventListener('click', () => {
      showSlide(index + 1);
    });
  }

  const benefitBox = document.querySelector('.benefit_box');
  const benefitItems = document.querySelectorAll('.benefit_item');
  let benefitIndex = 0;

  document.querySelector('.next-benefit').onclick = () => {
    benefitIndex = (benefitIndex + 1) % benefitItems.length;
    benefitBox.style.transform = `translateX(-${benefitIndex * 100}%)`;
  };

  document.querySelector('.prev-benefit').onclick = () => {
    benefitIndex = (benefitIndex - 1 + benefitItems.length) % benefitItems.length;
    benefitBox.style.transform = `translateX(-${benefitIndex * 100}%)`;
  };

