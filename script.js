// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
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

if (navbar) {
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
}

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

if (contactForm) {
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
            'water-softener': 'Water Softener',
            'water-plant': 'Water Treatment Plant',
            'installation': 'Installation',
            'maintenance': 'Maintenance & Repair',
            'amc': 'AMC (Annual Maintenance Contract)',
            'consultation': 'Consultation',
            'other': 'Other'
        };
        const serviceName = serviceOptions[service] || service;
        
        // Create WhatsApp message
        let whatsappMessage = `Hello S7 Aqua RO Water Solutions,\n\n`;
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
}

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

// ========== STATISTICS COUNTER - SIMPLE AND RELIABLE ==========
function animateCounter(element, target) {
    if (!element || !target) return;
    
    let current = 0;
    const increment = target / 50; // 50 steps
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            if (target === 24) {
                element.textContent = '24/7';
            } else if (target >= 1000) {
                // Format numbers >= 1000 with 'k' notation
                const kValue = (target / 1000).toFixed(0);
                element.textContent = kValue + 'k+';
            } else {
                element.textContent = target + '+';
            }
            clearInterval(timer);
        } else {
            if (target === 24) {
                element.textContent = Math.floor(current) + '/7';
            } else if (target >= 1000) {
                // Format numbers >= 1000 with 'k' notation during animation
                const kValue = Math.floor(current / 1000);
                if (kValue > 0) {
                    element.textContent = kValue + 'k+';
                } else {
                    element.textContent = Math.floor(current) + '+';
                }
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }
    }, 40);
}

function startStatisticsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (target && stat.textContent.trim() === '0') {
            animateCounter(stat, target);
        }
    });
}

// Start statistics animation when page loads
window.addEventListener('load', () => {
    setTimeout(startStatisticsAnimation, 500);
});

// Also start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(startStatisticsAnimation, 1000);
    });
} else {
    setTimeout(startStatisticsAnimation, 1000);
}

// Fallback: Start after 3 seconds no matter what
setTimeout(startStatisticsAnimation, 3000);

// ========== FAQ ACCORDION - SIMPLE AND RELIABLE ==========
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        // Ensure answer is hidden initially
        item.classList.remove('active');
        answer.style.maxHeight = '0';
        answer.style.padding = '0 1.5rem';
        answer.style.opacity = '0';
        answer.style.display = 'block';
        
        // Add click handler
        question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = item.classList.contains('active');
            
            // Close all items
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
        });
    });
}

// Initialize FAQ on multiple events
document.addEventListener('DOMContentLoaded', initFAQAccordion);
window.addEventListener('load', () => {
    setTimeout(initFAQAccordion, 100);
});
setTimeout(initFAQAccordion, 500);

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

// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    function filterGallery(category) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const galleryTabs = document.querySelectorAll('.gallery-tab');
        
        // Update active tab
        galleryTabs.forEach(tab => {
            if (tab.getAttribute('data-category') === category) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Filter items
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                item.style.display = '';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });
    }
    
    // Initialize gallery filter
    function initGalleryFilter() {
        const galleryTabs = document.querySelectorAll('.gallery-tab');
        
        if (galleryTabs.length === 0) {
            return;
        }
        
        // Ensure all items are visible initially
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.classList.remove('hidden');
            item.style.display = '';
        });
        
        // Add click handlers
        galleryTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.stopPropagation();
                const category = this.getAttribute('data-category');
                filterGallery(category);
            });
        });
    }
    
    // Initialize
    initGalleryFilter();
    
    // Also try after a short delay
    setTimeout(initGalleryFilter, 100);
});

// Also initialize on window load
window.addEventListener('load', function() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    if (galleryTabs.length > 0) {
        galleryTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.stopPropagation();
                const category = this.getAttribute('data-category');
                const galleryItems = document.querySelectorAll('.gallery-item');
                const allTabs = document.querySelectorAll('.gallery-tab');
                
                allTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (category === 'all' || itemCategory === category) {
                        item.classList.remove('hidden');
                        item.style.display = '';
                    } else {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});
