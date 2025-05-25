// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Show loading state
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Suscribiendo...';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('¡Gracias por suscribirte! Recibirás nuestras novedades pronto.');
            e.target.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
}

// Contact Form (for about.html)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const button = e.target.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Enviando...';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert(`¡Gracias ${data.name}! Hemos recibido tu solicitud. Te contactaremos pronto para programar tu consulta gratuita.`);
            e.target.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .philosophy-item, .credential-card, .specialization-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Plan card hover effects
document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('featured')) {
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent; // Reset to original
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Form validation
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePhone = (phone) => {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
};

// Add real-time validation to forms
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validateEmail(input.value)) {
            input.style.borderColor = '#ef4444';
            showValidationMessage(input, 'Por favor, introduce un email válido');
        } else {
            input.style.borderColor = '#d1d5db';
            hideValidationMessage(input);
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validatePhone(input.value)) {
            input.style.borderColor = '#ef4444';
            showValidationMessage(input, 'Por favor, introduce un teléfono válido');
        } else {
            input.style.borderColor = '#d1d5db';
            hideValidationMessage(input);
        }
    });
});

function showValidationMessage(input, message) {
    hideValidationMessage(input); // Remove existing message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function hideValidationMessage(input) {
    const existingError = input.parentNode.querySelector('.validation-error');
    if (existingError) {
        existingError.remove();
    }
}

// Loading states for buttons
document.querySelectorAll('.btn').forEach(btn => {
    if (btn.tagName === 'A' && btn.href && !btn.href.includes('#')) {
        btn.addEventListener('click', (e) => {
            if (!btn.href.includes('mailto:') && !btn.href.includes('tel:')) {
                btn.style.opacity = '0.7';
                btn.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }, 1000);
            }
        });
    }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Close any open FAQ items
        document.querySelectorAll('.faq-item.active').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Focus management for accessibility
document.querySelectorAll('.faq-question').forEach(question => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// Update aria-expanded for FAQ items
document.addEventListener('click', (e) => {
    if (e.target.closest('.faq-question')) {
        const question = e.target.closest('.faq-question');
        const isExpanded = question.parentElement.classList.contains('active');
        question.setAttribute('aria-expanded', isExpanded);
    }
});

console.log('FitControl website loaded successfully! 💪');