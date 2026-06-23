const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
    menu.classList.toggle('menu--open');
    burger.classList.toggle('burger--active');
});
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('menu--open');
        burger.classList.remove('burger--active');
    });
});

const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    obs.observe(element);
});

const form = document.getElementById('form');
const status = document.getElementById('form-status');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('input[name="name"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();
    if (!name || !phone || !message) {
        status.textContent = 'Пожалуйста, заполните все поля.';
        status.style.color = 'red';
        return;
    }
    const phoneValid = /^[\d\s\+\-\(\)]{7,15}$/;
    if (!phoneValid.test(phone)) {
        status.textContent = 'Введите корректный номер телефона.';
        status.style.color = 'red';
        return;
    }
    status.textContent = 'Спасибо! Мы свяжемся с вами.';
    status.style.color = 'var(--color-main-green)';
    form.reset();
    setTimeout(() => {
        status.textContent = '';
    }, 5000);
});