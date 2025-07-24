// ================================
//           script.js            
// ================================

// --- Calculator Code (unchanged) ---
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
}

let grafico;

function gerarGrafico() {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const economias = [];
  let totalEconomia = 0;
  let maxEconomia = 0;
  let minEconomia = Infinity;
  let maxMes = '';
  let minMes = '';

  for (let i = 0; i < 12; i++) {
    const valor = parseFloat(document.getElementById(`mes${i}`).value);

    if (!isNaN(valor) && valor >= 1000) {
      const economia = valor * 0.1;
      economias.push(economia);
      totalEconomia += economia;

      if (economia > maxEconomia) {
        maxEconomia = economia;
        maxMes = meses[i];
      }

      if (economia < minEconomia) {
        minEconomia = economia;
        minMes = meses[i];
      }
    } else {
      economias.push(0); // Marca economia como zero se valor inválido
    }
  }

  const validInputs = economias.filter((e, i) => parseFloat(document.getElementById(`mes${i}`).value) >= 1000);

if (validInputs.length < 3) {
  alert("Por favor, preencha pelo menos 3 meses com valores de R$1000 ou mais.");
  return;
}

  const ctx = document.getElementById('graficoEconomia').getContext('2d');
  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: meses,
      datasets: [{
        label: 'Economia Mensal (R$)',
        data: economias,
        backgroundColor: 'rgba(0, 200, 100, 0.7)',
        borderColor: 'rgb(0, 150, 80)',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Economia Mensal com Energia Sustentável'
        },
        tooltip: {
          callbacks: {
            label: context => `R$ ${context.parsed.x.toFixed(2)}`
          }
        },
        annotation: {
          annotations: {
            max: {
              type: 'label',
              xValue: maxEconomia,
              yValue: maxMes,
              backgroundColor: 'rgba(0, 180, 0, 0.8)',
              content: [`Pico: R$${maxEconomia.toFixed(2)}`],
              enabled: true,
              position: 'end'
            },
            min: {
              type: 'label',
              xValue: minEconomia,
              yValue: minMes,
              backgroundColor: 'rgba(200, 100, 0, 0.8)',
              content: [`Mínimo: R$${minEconomia.toFixed(2)}`],
              enabled: true,
              position: 'end'
            }
          }
        }
      },
      scales: {
        x: {
          min: 500,
          max: 5000,
          beginAtZero: false,
          title: {
            display: true,
            text: 'Economia (R$)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Mês'
          }
        }
      }
    }
  });

  // Mostra o total de economia
  const divExistente = document.getElementById('economiaTotal');
  if (divExistente) {
    divExistente.innerText = `Você economizou R$ ${totalEconomia.toFixed(2)} no total!`;
  } else {
    const total = document.createElement('div');
    total.id = 'economiaTotal';
    total.style.marginTop = '15px';
    total.style.fontWeight = 'bold';
    total.style.fontSize = '18px';
    total.innerText = `Você economizou R$ ${totalEconomia.toFixed(2)} no total!`;
    ctx.canvas.parentNode.appendChild(total);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  /**
   * Initializes a simple slider controlled by arrows.
   * @param {string} boxSelector - inner flex wrapper
   * @param {string} viewportSelector - outer container
   * @param {string} prevSelector - previous arrow button
   * @param {string} nextSelector - next arrow button
   */
  function initSlider({boxSelector, viewportSelector, prevSelector, nextSelector}) {
    const box = document.querySelector(boxSelector);
    const viewport = document.querySelector(viewportSelector);
    const prevBtn = document.querySelector(prevSelector);
    const nextBtn = document.querySelector(nextSelector);
    const itemsCount = box.children.length;
    let currentIndex = 0;

    function update() {
      const offset = currentIndex * viewport.clientWidth;
      box.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % itemsCount;
      update();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + itemsCount) % itemsCount;
      update();
    });

    // Optional: swipe support for mobile
    let startX = null;
    viewport.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    viewport.addEventListener('touchend', e => {
      if (startX === null) return;
      const deltaX = e.changedTouches[0].clientX - startX;
      if (deltaX > 50) prevBtn.click();
      else if (deltaX < -50) nextBtn.click();
      startX = null;
    });

    // Initial render
    update();
  }

  // Benefit slider
  initSlider({
    boxSelector: '.benefit_box',
    viewportSelector: '.benefit_viewport',
    prevSelector: '.prev-benefit',
    nextSelector: '.next-benefit'
  });

  // Explanation slider
  initSlider({
    boxSelector: '.explanation_box',
    viewportSelector: '.explanation_viewport',
    prevSelector: '.prev-explanation',
    nextSelector: '.next-explanation'
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // ... your initSlider definition and benefit slider call above ...

  // Explanation slider
  initSlider({
    boxSelector: '.explanation_box',
    viewportSelector: '.explanation_viewport',
    prevSelector: '.floating-explanation .slide-btn.prev',
    nextSelector: '.floating-explanation .slide-btn.next'
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const box       = document.querySelector('.explanation_box');
  const viewport  = document.querySelector('.explanation_viewport');
  const prevBtn   = document.querySelector('.floating-explanation .prev');
  const nextBtn   = document.querySelector('.floating-explanation .next');
  const count     = box.children.length;
  let   index     = 0;

  function update() {
    box.style.transform = `translateX(-${index * viewport.clientWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % count;
    update();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + count) % count;
    update();
  });

  // (Optional) swipe support
  let startX = null;
  viewport.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  viewport.addEventListener('touchmove', e => {
    if (startX === null) return;
    const delta = e.touches[0].clientX - startX;
    if (delta > 50) { prevBtn.click(); startX = null; }
    else if (delta < -50) { nextBtn.click(); startX = null; }
  });

  // initial position
  update();
});
