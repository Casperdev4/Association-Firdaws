// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Header Scroll Effect =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

// Counter animation observer
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-target]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe impact section
const impactSection = document.querySelector('.impact');
if (impactSection) {
    counterObserver.observe(impactSection);
}

// Observe about stats
const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    counterObserver.observe(aboutStats);
}

// Observe services stats
const servicesStats = document.querySelector('.services-stats');
if (servicesStats) {
    counterObserver.observe(servicesStats);
}

// Observe impact section 2
const impactSection2 = document.querySelector('.impact-section');
if (impactSection2) {
    counterObserver.observe(impactSection2);
}

// Observe distribution impact (distributions page)
const distributionImpact = document.querySelector('.distribution-impact');
if (distributionImpact) {
    counterObserver.observe(distributionImpact);
}

// Observe transformed lives section (about page)
const transformedLives = document.querySelector('.transformed-lives');
if (transformedLives) {
    counterObserver.observe(transformedLives);
}

// ===== Scroll Animation Observer =====
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add animation class to elements
document.querySelectorAll('.service-card, .news-card, .stat-box, .faq-item, .gallery-item, .impact-stat-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    animationObserver.observe(el);
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Show success message (you can replace this with actual form submission)
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        btn.textContent = 'Message envoyé !';
        btn.style.backgroundColor = '#28a745';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            this.reset();
        }, 3000);

        console.log('Form submitted:', data);
    });
}

// ===== Newsletter Form Handling =====
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        btn.textContent = 'Inscrit !';
        btn.style.backgroundColor = '#28a745';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            this.reset();
        }, 3000);

        console.log('Newsletter subscription:', email);
    });
}

// ===== Parallax Effect on Hero =====
const heroImage = document.querySelector('.hero-image');

if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ===== Donation System =====
const donationTypeButtons = document.querySelectorAll('.donation-type-btn');
const amountCards = document.querySelectorAll('.amount-card');
const customAmountInput = document.getElementById('customAmount');
const donateBtn = document.getElementById('donateBtn');
let selectedAmount = 30;
let isMonthly = true;

// Toggle between monthly and one-time donation
donationTypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        donationTypeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        isMonthly = btn.dataset.type === 'monthly';

        // Update period text on cards
        document.querySelectorAll('.amount-period').forEach(period => {
            period.textContent = isMonthly ? '/mois' : 'unique';
        });

        // Update button text
        if (donateBtn) {
            donateBtn.textContent = isMonthly ? 'Je fais un don mensuel' : 'Je fais un don unique';
        }
    });
});

// Select amount card
amountCards.forEach(card => {
    card.addEventListener('click', () => {
        amountCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedAmount = parseInt(card.dataset.amount);

        // Clear custom amount
        if (customAmountInput) {
            customAmountInput.value = '';
        }
    });
});

// Custom amount input
if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
        if (customAmountInput.value) {
            amountCards.forEach(c => c.classList.remove('selected'));
            selectedAmount = parseInt(customAmountInput.value) || 0;
        }
    });

    customAmountInput.addEventListener('focus', () => {
        amountCards.forEach(c => c.classList.remove('selected'));
    });
}

// Donate button click
if (donateBtn) {
    donateBtn.addEventListener('click', () => {
        if (selectedAmount < 1) {
            alert('Veuillez sélectionner un montant valide.');
            return;
        }

        const donationType = isMonthly ? 'mensuel' : 'unique';

        // Here you would integrate with Stripe or your payment system
        // For now, show a confirmation message
        alert(`Merci pour votre don ${donationType} de ${selectedAmount}€ !\n\nVous allez être redirigé vers la page de paiement sécurisé.`);

        // Example: Redirect to payment page
        // window.location.href = `/paiement?montant=${selectedAmount}&type=${donationType}`;
    });
}

// Set default selected card (30€)
const defaultCard = document.querySelector('.amount-card[data-amount="30"]');
if (defaultCard) {
    defaultCard.classList.add('selected');
}

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');

    // Set first FAQ item as active by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});

// ===== Service Worker Registration (for PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // You can add a service worker here for offline functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}
