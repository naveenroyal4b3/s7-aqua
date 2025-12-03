// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Contact Form Handling - Redirects to WhatsApp
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Get service display name
    const serviceOptions = {
        'ro-purifier': 'RO Water Purifier',
        'water-plant': 'Water Treatment Plant',
        'installation': 'Installation',
        'maintenance': 'Maintenance & Repair',
        'amc': 'AMC (Annual Maintenance Contract)',
        'consultation': 'Consultation',
        'other': 'Other'
    };
    const serviceName = serviceOptions[service] || service;
    
    // Create WhatsApp message
    let whatsappMessage = `Hello S7 Aqua,\n\n`;
    whatsappMessage += `I'm interested in: *${serviceName}*\n\n`;
    whatsappMessage += `*Name:* ${name}\n`;
    whatsappMessage += `*Phone:* ${phone}\n`;
    if (email) {
        whatsappMessage += `*Email:* ${email}\n`;
    }
    whatsappMessage += `\n*Message:*\n${message}`;
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp number: 8790616173 (with country code 91 for India)
    const whatsappNumber = '918790616173';
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Show success message
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const successMessage = contactForm.querySelector('.form-success');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Opening WhatsApp...';
    submitButton.style.background = '#25D366';
    
    if (successMessage) {
        successMessage.classList.add('show');
    }
    
    // Open WhatsApp link
    window.open(whatsappLink, '_blank');
    
    // Reset button and hide success message after 3 seconds
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = '';
        if (successMessage) {
            successMessage.classList.remove('show');
        }
        contactForm.reset();
    }, 3000);
});

// Intersection Observer for fade-in animations
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

// Observe service cards, product cards, testimonials, and FAQ items
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card, .product-card, .info-card, .testimonial-card, .stat-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Ensure sections are visible
    const statisticsSection = document.querySelector('.statistics');
    const testimonialsSection = document.querySelector('.testimonials');
    const faqSection = document.querySelector('.faq');
    
    if (statisticsSection) {
        statisticsSection.style.display = 'block';
        statisticsSection.style.visibility = 'visible';
        statisticsSection.style.opacity = '1';
    }
    
    if (testimonialsSection) {
        testimonialsSection.style.display = 'block';
        testimonialsSection.style.visibility = 'visible';
        testimonialsSection.style.opacity = '1';
    }
    
    if (faqSection) {
        faqSection.style.display = 'block';
        faqSection.style.visibility = 'visible';
        faqSection.style.opacity = '1';
    }
});

// Phone number click handler
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // On mobile devices, this will open the dialer
        // On desktop, it might not work, so we can show a message
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Desktop - could show a copy-to-clipboard option
            const phoneNumber = this.textContent.trim();
            if (navigator.clipboard) {
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                });
            }
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Statistics Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            if (target === 24) {
                element.textContent = '24/7';
            } else {
                element.textContent = target + '+';
            }
            clearInterval(timer);
        } else {
            if (target === 24) {
                element.textContent = Math.floor(start) + '/7';
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }
    }, 16);
}

// Statistics Counter - Initialize and animate
function initStatisticsCounter() {
    const statisticsSection = document.querySelector('.statistics');
    if (!statisticsSection) {
        console.log('Statistics section not found');
        return;
    }
    
    const statNumbers = statisticsSection.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) {
        console.log('No stat numbers found');
        return;
    }
    
    let hasAnimated = false;
    
    // Function to start animation
    const startAnimation = () => {
        if (hasAnimated) return;
        hasAnimated = true;
        console.log('Starting statistics animation');
        
        statNumbers.forEach((stat, index) => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (target) {
                console.log(`Animating stat ${index}: ${target}`);
                animateCounter(stat, target);
            }
        });
    };
    
    // Use Intersection Observer
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                console.log('Statistics section is intersecting');
                startAnimation();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '100px' });
    
    statsObserver.observe(statisticsSection);
    
    // Also try to start immediately if section is visible
    setTimeout(() => {
        const rect = statisticsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible && !hasAnimated) {
            console.log('Statistics section already visible, starting animation');
            startAnimation();
        }
    }, 500);
}

// Initialize on both DOMContentLoaded and window load
document.addEventListener('DOMContentLoaded', () => {
    initStatisticsCounter();
    
    // Fallback: Start animation after 2 seconds if still at 0
    setTimeout(() => {
        const statisticsSection = document.querySelector('.statistics');
        if (statisticsSection) {
            const statNumbers = statisticsSection.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const currentValue = parseInt(stat.textContent.trim());
                if (currentValue === 0 || isNaN(currentValue)) {
                    const target = parseInt(stat.getAttribute('data-target'));
                    if (target) {
                        console.log('Fallback: Starting statistics animation');
                        animateCounter(stat, target);
                    }
                }
            });
        }
    }, 2000);
});

window.addEventListener('load', () => {
    setTimeout(() => {
        const statisticsSection = document.querySelector('.statistics');
        if (statisticsSection) {
            const statNumbers = statisticsSection.querySelectorAll('.stat-number');
            let needsAnimation = false;
            statNumbers.forEach(stat => {
                const currentValue = parseInt(stat.textContent.trim());
                if (currentValue === 0 || isNaN(currentValue)) {
                    needsAnimation = true;
                }
            });
            if (needsAnimation) {
                initStatisticsCounter();
            }
        }
    }, 500);
});

// FAQ Accordion Functionality - Simple and reliable
(function() {
    let faqInitialized = false;
    
    function initFAQ() {
        if (faqInitialized) return;
        
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length === 0) return;
        
        faqInitialized = true;
        
        faqItems.forEach((item) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (!question || !answer) return;
            
            // Ensure FAQ answer is initially hidden
            item.classList.remove('active');
            answer.style.maxHeight = '0';
            answer.style.padding = '0 1.5rem';
            answer.style.opacity = '0';
            answer.style.display = 'block';
            
            // Add click handler - use onclick for reliability
            question.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const faqAnswer = faqItem.querySelector('.faq-answer');
                    if (faqAnswer) {
                        faqAnswer.style.maxHeight = '0';
                        faqAnswer.style.padding = '0 1.5rem';
                        faqAnswer.style.opacity = '0';
                    }
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    const scrollHeight = answer.scrollHeight;
                    answer.style.maxHeight = scrollHeight + 'px';
                    answer.style.padding = '0 1.5rem 1.5rem';
                    answer.style.opacity = '1';
                }
            };
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFAQ);
    } else {
        initFAQ();
    }
    
    // Also try on window load
    window.addEventListener('load', initFAQ);
})();

// Enhanced Form Validation
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = '✓ Message sent successfully! Redirecting to WhatsApp...';
        contactForm.insertBefore(successMessage, contactForm.firstChild);
        
        // Enhanced form validation
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '#e0e0e0';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(220, 53, 69)') {
                    this.style.borderColor = '#e0e0e0';
                }
            });
        });
    }
});

// Add subtle parallax effect to hero section (optional enhancement)
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero && window.pageYOffset < hero.offsetHeight) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

