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

// --- Chart Generation (keep your existing gerarGrafico if present) ---
// function gerarGrafico() { ... }

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
