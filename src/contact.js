export function initContact() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const pills = document.querySelectorAll('#collectionPills .pill');

  if (!form) return;

  // Collection pill toggles
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('selected');
    });
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Fade out form, show success
    form.style.transition = 'opacity 0.5s ease';
    form.style.opacity = '0';

    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('show');
    }, 500);
  });
}
