
$(document).ready(function() {

    lucide.createIcons();

    const navbar = document.querySelector('.navbar');

    if (!navbar) {
        return;
    }

    const syncNavbarScrollState = () => {
        if (window.scrollY > 10) {
            navbar.classList.add('is-scrolled');
            return;
        }

        navbar.classList.remove('is-scrolled');
    };

    syncNavbarScrollState();
    window.addEventListener('scroll', syncNavbarScrollState, { passive: true });

   
});