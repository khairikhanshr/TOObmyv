const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Закрыть меню' : 'Открыть меню');
  navigation.classList.toggle('open', expanded);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Открыть меню');
  }
});

const icons = {
  pin: '<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  water: '<path d="M2 8c3-4 5 4 9 0s6 4 11 0M2 14c3-4 5 4 9 0s6 4 11 0M2 20c3-4 5 4 9 0s6 4 11 0"/>',
  dining: '<path d="M5 3v6a3 3 0 0 0 6 0V3M8 3v18M20 21V3c-4 2-5 6-5 10h5"/>',
  spa: '<path d="M12 21C3 21 2 14 3 10c4 0 7 2 9 6 2-4 5-6 9-6 1 4 0 11-9 11ZM12 16C7 10 9 5 12 2c3 3 5 8 0 14Z"/>',
  fitness: '<path d="M7 8v8M4 9v6M17 8v8M20 9v6M7 12h10M2 12h2M20 12h2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>',
  people: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-4a6 6 0 0 1 12 0v4M17 4a3 3 0 0 1 0 6M18 14c3 0 4 2 4 5v2"/>',
  wifi: '<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8 16a6 6 0 0 1 8 0"/><circle cx="12" cy="20" r=".5"/>',
  home: '<path d="m2 10 10-8 10 8M5 9v12h14V9M9 21v-8h6v8"/>',
  expand: '<path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/>',
  moon: '<path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z"/>',
  glass: '<path d="m5 3 1 8a6 6 0 0 0 12 0l1-8ZM12 17v5M8 22h8M6 8h12"/>',
  plane: '<path d="m22 2-7 20-4-9-9-4 20-7ZM11 13 22 2"/>',
  car: '<path d="m5 6-2 7v6h3v-3h12v3h3v-6l-2-7H5ZM3 12h18M6 14h2M16 14h2"/>',
  shield: '<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/>',
  sparkle: '<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 11h18M8 15h2M14 15h2"/>'
};
document.querySelectorAll('[data-icon]').forEach(el => {
  el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[el.dataset.icon] || icons.sparkle}</svg>`;
});

const roomImage = document.querySelector('#room-main');
document.querySelectorAll('.gallery-thumbs button').forEach(button => {
  button.addEventListener('click', () => {
    roomImage.src = button.dataset.src;
    roomImage.alt = button.dataset.alt;
    document.querySelectorAll('.gallery-thumbs button').forEach(other => {
      other.classList.toggle('selected', other === button);
      other.setAttribute('aria-pressed', String(other === button));
    });
  });
});
const photoDialog = document.querySelector('#photo-dialog');
document.querySelector('.gallery-main').addEventListener('click', () => {
  photoDialog.querySelector('img').src = roomImage.src;
  photoDialog.querySelector('img').alt = roomImage.alt;
  photoDialog.querySelector('p').textContent = roomImage.alt;
  photoDialog.showModal();
});
document.querySelector('.dialog-close').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', event => { if (event.target === photoDialog) photoDialog.close(); });

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Открыть меню');
    menuButton.focus();
  }
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-motion');
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
  const floatButton = document.querySelector('.floating-book');
  const targets = new Map();
  const floatObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => targets.set(entry.target, entry.isIntersecting));
    floatButton.classList.toggle('hidden', [...targets.values()].some(Boolean));
  }, {threshold: 0.1});
  floatObserver.observe(document.querySelector('.hero'));
  floatObserver.observe(document.querySelector('#booking'));
}

// Set a verified HTTPS form endpoint here once the owner provides a destination.
// Never store personal form data in the public repository or browser storage.
const BOOKING_ENDPOINT = '';
const bookingForm = document.querySelector('#booking');
const formStatus = document.querySelector('#form-status');
if (BOOKING_ENDPOINT) document.querySelector('#form-availability').hidden = true;
document.querySelectorAll('.consultation').forEach(link => link.addEventListener('click', () => {
  const comment = bookingForm.elements.comment;
  if (!comment.value) comment.value = 'Хочу получить консультацию по туру Anantara The Palm.';
}));
bookingForm.addEventListener('submit', async event => {
  event.preventDefault();
  formStatus.classList.remove('error');
  if (!BOOKING_ENDPOINT) {
    formStatus.classList.add('error');
    formStatus.textContent = 'Онлайн-приём заявок ещё не подключён. Данные не отправлены. Пожалуйста, обратитесь к представителю ТОО «LOVE», который поделился этим туром.';
    formStatus.focus();
    return;
  }
  const button = bookingForm.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'Отправляем…';
  try {
    const response = await fetch(BOOKING_ENDPOINT, {
      method: 'POST', headers: {'Accept': 'application/json'}, body: new FormData(bookingForm)
    });
    if (!response.ok) throw new Error('Submission failed');
    formStatus.textContent = 'Спасибо! Ваша заявка принята. Туристический менеджер свяжется с вами для подтверждения деталей поездки.';
    bookingForm.reset();
  } catch {
    formStatus.classList.add('error');
    formStatus.textContent = 'Не удалось отправить заявку. Проверьте подключение к интернету и попробуйте ещё раз.';
  } finally {
    button.disabled = false;
    button.textContent = 'Отправить заявку';
    formStatus.focus();
  }
});
