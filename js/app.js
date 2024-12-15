document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navbar = document.getElementById('navbar');

    // Build the nav
    navbar.innerHTML = '';
    sections.forEach(section => {
        const navItem = `<li><a href="#${section.id}" data-nav="${section.id}">${section.getAttribute('data-nav')}</a></li>`;
        navbar.innerHTML += navItem;
    });

    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    // Set initial active section and nav link
    let activeLink = navbar.querySelector('a'); // Default to first link
    activeLink.classList.add('active');

    // Add class 'active' to section when near top of viewport
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const link = navbar.querySelector(`a[href="#${section.id}"]`);
            if (isInViewport(section)) {
                section.classList.add('active');
                link.classList.add('active');
            } else {
                section.classList.remove('active');
                link.classList.remove('active');
            }
        });
    });

    // Scroll to anchor ID using scrollIntoView
    navbar.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.nodeName === 'A') {
            const targetSectionId = event.target.getAttribute('href').slice(1); // Remove '#'
            const targetSection = document.getElementById(targetSectionId);
            targetSection.scrollIntoView({ behavior: 'smooth' });

            // Update active link in navbar
            navbar.querySelectorAll('a').forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
        }
    });
});
