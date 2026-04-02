/* ============================================
   PORTFOLIO JS - Serigne Bamba Diop
   ============================================ */

// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== MENU MOBILE ==========
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ========== ANIMATIONS AU SCROLL ==========
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Ajouter un délai progressif pour les éléments frères
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ========== COMPTEUR DE STATS ==========
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
        // Ajouter le % pour la motivation
        if (target === 100) {
            element.textContent = Math.floor(current) + '%';
        }
    }, stepTime);
}

// Observer pour déclencher les compteurs
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                animateCounter(num, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========== RECHERCHE DE PROJETS ==========
const searchInput = document.getElementById('searchInput');
const projectsGrid = document.getElementById('projectsGrid');
const noResults = document.getElementById('noResults');

if (searchInput && projectsGrid) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        const cards = projectsGrid.querySelectorAll('.project-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const keywords = card.getAttribute('data-keywords') || '';
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            const searchText = keywords + ' ' + title + ' ' + desc;

            if (query === '' || searchText.includes(query)) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    });
}

// ========== GESTION FORMULAIRES ==========
function showNotification(message, type) {
    // Supprimer une notification existante
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#166534' : '#991b1b'};
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-family: 'Sora', sans-serif;
        font-size: 0.9rem;
        z-index: 9999;
        animation: fadeInUp 0.4s ease;
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        max-width: 350px;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 4000);
}

function handleContactSubmit() {
    const nom = document.getElementById('contact-nom').value.trim();
    const prenom = document.getElementById('contact-prenom').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const sujet = document.getElementById('contact-sujet').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    // Validation simple
    if (!nom || !prenom || !email || !sujet || !message) {
        showNotification('Veuillez remplir tous les champs.', 'error');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        showNotification('Veuillez entrer une adresse email valide.', 'error');
        return;
    }

    // Simulation d'envoi
    showNotification('Merci ' + prenom + ' ! Votre message a bien été envoyé.', 'success');

    // Reset
    document.getElementById('contact-nom').value = '';
    document.getElementById('contact-prenom').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-sujet').value = '';
    document.getElementById('contact-message').value = '';
}

function handleProjectSubmit() {
    const nom = document.getElementById('projet-nom').value.trim();
    const email = document.getElementById('projet-email').value.trim();
    const type = document.getElementById('projet-type').value;
    const description = document.getElementById('projet-description').value.trim();

    if (!nom || !email || !type || !description) {
        showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        showNotification('Veuillez entrer une adresse email valide.', 'error');
        return;
    }

    showNotification('Merci ! Votre demande de projet a bien été soumise.', 'success');

    // Reset
    document.getElementById('projet-nom').value = '';
    document.getElementById('projet-email').value = '';
    document.getElementById('projet-type').selectedIndex = 0;
    document.getElementById('projet-budget').selectedIndex = 0;
    document.getElementById('projet-description').value = '';
}

// ========== SMOOTH SCROLL POUR ANCRES ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
