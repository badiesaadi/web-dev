// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);

    // Remove loading screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('hidden');
            document.querySelector('.hero').classList.add('loaded');
        }, 500);
    });
});

// Add scroll progress bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
const scrollProgressBar = document.createElement('div');
scrollProgressBar.className = 'scroll-progress-bar';
scrollProgress.appendChild(scrollProgressBar);
document.body.appendChild(scrollProgress);

// Update scroll progress
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgressBar.style.width = `${scrolled}%`;
});

// Navigation functionality
const nav = document.querySelector('nav');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

// Enhanced sticky navigation with hide/show on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Enhanced mobile menu toggle with animation
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.style.transform = navLinks.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
});

// Enhanced smooth scrolling with dynamic offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                mobileMenu.style.transform = 'rotate(0)';
            }
        }
    });
});

// Enhanced form handling with validation and animations
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    // Add focus effects
    input.addEventListener('focus', () => {
        input.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', () => {
        input.style.transform = 'translateY(0)';
    });

    // Enhanced real-time validation
    input.addEventListener('input', () => {
        validateInput(input);
    });
});

function validateInput(input) {
    const value = input.value.trim();
    
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    } else if (input.type === 'tel') {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (phoneRegex.test(value)) {
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    } else {
        if (value.length > 2) {
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    }
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button');
    const originalText = submitButton.textContent;
    
    // Validate all inputs before submission
    let isValid = true;
    formInputs.forEach(input => {
        validateInput(input);
        if (input.classList.contains('invalid')) {
            isValid = false;
        }
    });

    if (!isValid) {
        submitButton.textContent = 'Please check your inputs';
        submitButton.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--error-color');
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
        }, 3000);
        return;
    }
    
    // Show loading state with animation
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success feedback with animation
        submitButton.innerHTML = '✓ Message Sent!';
        submitButton.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--success-color');
        contactForm.reset();
        
        // Reset button after animation
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.backgroundColor = '';
            submitButton.disabled = false;
        }, 3000);
    } catch (error) {
        // Error feedback with animation
        submitButton.innerHTML = '✕ Error! Try Again';
        submitButton.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--error-color');
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.backgroundColor = '';
            submitButton.disabled = false;
        }, 3000);
    }
});

// Enhanced scroll-based animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '-50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            
            // Update navigation
            const id = entry.target.id;
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, observerOptions);

// Observe all sections and elements that need animation
document.querySelectorAll('section, .service-card, .features li').forEach(element => {
    observer.observe(element);
});

// Enhanced parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    hero.style.backgroundPositionY = `${rate}px`;
    hero.style.filter = `brightness(${100 - Math.min(scrolled / 10, 30)}%)`;
});

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, true);