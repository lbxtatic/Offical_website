const app = (() => {
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-menu');
  const year = document.getElementById('year');
  year.textContent = new Date().getFullYear();

  if (navToggle && menu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          menu?.classList.remove('open');
          navToggle?.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Dumb demo for contact form: prints to console and shows note.
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Form submission:', data);
    const note = document.getElementById('formNote');
    note.textContent = 'Thanks! We will reach out shortly.';
    form.reset();
    return false;
  }

  return { handleSubmit };
})();
