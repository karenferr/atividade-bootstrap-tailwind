(() => {
  const menuButton = document.getElementById('menuButton');
  const menuMobile = document.getElementById('menuMobile');
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuMobile.classList.toggle('hidden');
  });
  menuMobile.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuMobile.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
  }));

  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.dot')];
  let current = 0;
  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active-slide', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active-dot', i === current));
  }
  document.getElementById('prevSlide').addEventListener('click', () => showSlide(current - 1));
  document.getElementById('nextSlide').addEventListener('click', () => showSlide(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

  const modal = document.getElementById('infoModal');
  const openModal = () => { modal.classList.remove('hidden'); modal.classList.add('flex'); document.body.classList.add('modal-open'); document.getElementById('closeModal').focus(); };
  const closeModal = () => { modal.classList.add('hidden'); modal.classList.remove('flex'); document.body.classList.remove('modal-open'); document.getElementById('openModal').focus(); };
  document.getElementById('openModal').addEventListener('click', openModal);
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('confirmModal').addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });

  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  form.addEventListener('submit', event => {
    event.preventDefault();
    let valid = true;
    [...form.querySelectorAll('input,select,textarea')].forEach(field => {
      const fieldValid = field.checkValidity();
      field.classList.toggle('invalid', !fieldValid);
      field.nextElementSibling.classList.toggle('hidden', fieldValid);
      if (!fieldValid) valid = false;
    });
    if (!valid) {
      feedback.textContent = 'Revise os campos destacados antes de continuar.';
      feedback.className = 'mt-3 text-sm text-red-700';
      return;
    }
    const name = document.getElementById('nome').value.trim();
    feedback.textContent = `Obrigado, ${name}! Seu interesse foi registrado nesta demonstração.`;
    feedback.className = 'mt-3 text-sm font-semibold text-green-700';
    form.reset();
    form.querySelectorAll('.invalid').forEach(field => field.classList.remove('invalid'));
    form.querySelectorAll('.error').forEach(error => error.classList.add('hidden'));
  });
})();