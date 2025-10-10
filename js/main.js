document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('mobile-nav-toggle');
    const navLinks = document.querySelectorAll('.navbar a');

    // --- Sticky Header ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.height = '70px';
        } else {
            header.style.height = '80px';
        }
    });

    // --- Mobile Navigation ---
    navToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        navToggle.querySelector('i').classList.toggle('fa-bars');
        navToggle.querySelector('i').classList.toggle('fa-times');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                navToggle.querySelector('i').classList.add('fa-bars');
                navToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // --- Project Modal Logic ---
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const iframe = document.getElementById('project-iframe');
    const closeModalBtn = document.getElementById('modal-close');
    const newTabBtn = document.getElementById('modal-new-tab');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const url = card.dataset.projectUrl;
            if (url) {
                iframe.src = url;
                newTabBtn.href = url;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        iframe.src = ''; // Stop video/audio from playing
        document.body.style.overflow = 'auto';
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- Scroll Animations (AOS - Animate On Scroll) ---
    const aosElements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    aosElements.forEach(el => observer.observe(el));
});

// Add this CSS to your style.css for the animations
/*
[data-aos] { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
[data-aos].aos-animate { opacity: 1; transform: translateY(0); }
*/
