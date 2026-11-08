(() => {
  'use strict';
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      feedback.textContent = 'Revise os campos destacados antes de continuar.';
      feedback.className = 'small mt-3 mb-0 text-danger';
      return;
    }

    const nome = document.getElementById('nome').value.trim();
    feedback.textContent = `Obrigado, ${nome}! Seu interesse foi registrado nesta demonstração.`;
    feedback.className = 'small mt-3 mb-0 text-success';
    form.reset();
    form.classList.remove('was-validated');
  });
})();