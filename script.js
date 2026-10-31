const root = document.documentElement;
const menuButton = document.querySelector('#menu-btn');
const navLinks = document.querySelector('#nav-links');
const themeButton = document.querySelector('#theme-btn');
const email = 'akash@akashdev.online';

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

themeButton.addEventListener('click', () => {
  root.classList.toggle('light');
  root.classList.toggle('dark');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', root.classList.contains('light') ? '#f6f5ef' : '#0a0a0a');
});

document.querySelector('#copy-email').addEventListener('click', async (event) => {
  try {
    await navigator.clipboard.writeText(email);
    event.currentTarget.textContent = 'Copied!';
    setTimeout(() => { event.currentTarget.textContent = 'Copy email'; }, 1600);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

const now = new Date();
document.querySelector('#clock').textContent = now.toLocaleTimeString('en-GB', { hour12: false });
document.querySelector('#year').textContent = now.getFullYear();

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.08 });

document.querySelectorAll('.rise, .studio-rise, .reveal').forEach((item) => observer.observe(item));
