document.addEventListener('DOMContentLoaded', function () {

    const HEADER_OFFSET = 90;
    const VISIBILITY_THRESHOLD = 0.15;

    const burgerButton = document.querySelector('.burger');
    const navMenu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    function closeMenu() {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }

    if (burgerButton && navMenu) {
        burgerButton.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }

    menuLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                closeMenu();

                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const animatedElements = document.querySelectorAll('.card, .product, .hero-text, .hero-img, .about-text, .about-img');

    const observerOptions = {
        root: null,
        threshold: VISIBILITY_THRESHOLD,
        rootMargin: '0px'
    };

    const appearanceCallback = function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(appearanceCallback, observerOptions);

    animatedElements.forEach(function (element) {
        element.classList.add('hidden');
        scrollObserver.observe(element);
    });

});