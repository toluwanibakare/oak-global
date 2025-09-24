// OAK Global International Business Solutions - JavaScript
console.log('🌳 OAK Global - Professional Website Loading...');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM loaded, initializing website...');
    
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeCounters();
    initializeContactForm();
    initializeVideoControls();
    
    console.log('🚀 OAK Global website fully initialized');
});

// Enhanced Mobile Navigation
function initializeNavigation() {
    console.log('📱 Initializing navigation...');
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) {
        console.error('❌ Navigation elements not found');
        return;
    }
    
    // Toggle function
    function toggleMobileMenu() {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            navMenu.classList.add('active');
            navToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Event listeners
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking nav links
    navLinks.forEach((link) => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Escape key support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    console.log('✅ Navigation initialized');
}

// Scroll Effects
function initializeScrollEffects() {
    console.log('🎯 Initializing scroll effects...');
    
    const header = document.querySelector('.main-header');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for styling
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    console.log('✅ Scroll effects initialized');
}

// Scroll Animations
function initializeAnimations() {
    console.log('✨ Initializing scroll animations...');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('benefit-card')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .service-card, 
        .benefit-card, 
        .stat-item,
        .section-header,
        .content-text,
        .image-container,
        .process-step,
        .value-card,
        .expertise-item,
        .contact-item
    `);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease-out';
        observer.observe(element);
    });
    
    console.log(`✅ Observing ${animatedElements.length} elements for animation`);
}

// Counter Animations
function initializeCounters() {
    console.log('🔢 Initializing counter animations...');
    
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    console.log(`✅ ${counters.length} counters initialized`);
}

// Contact Form Handling
function initializeContactForm() {
    console.log('📧 Initializing contact form...');
    
    const contactForm = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-messages');
    
    if (!contactForm) {
        console.log('ℹ️ No contact form found on this page');
        return;
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Store in localStorage (simulating database)
            const contacts = JSON.parse(localStorage.getItem('oakglobal_contacts') || '[]');
            const newContact = {
                id: Date.now(),
                name: name,
                email: email,
                company: company,
                service: service,
                message: message,
                timestamp: new Date().toISOString(),
                read: false
            };
            contacts.push(newContact);
            localStorage.setItem('oakglobal_contacts', JSON.stringify(contacts));
            
            console.log('✅ Contact saved successfully:', newContact);
            
            // Show success message
            showMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Scroll to message
            if (messageDiv) {
                messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 1500);
    });
    
    function showMessage(text, type) {
        if (messageDiv) {
            messageDiv.innerHTML = '<div class="form-message ' + type + '"><i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i>' + text + '</div>';
            messageDiv.style.display = 'block';
        }
    }
    
    console.log('✅ Contact form initialized');
}

// Video Controls for About Page
function initializeVideoControls() {
    console.log('🎥 Initializing video controls...');
    
    const video = document.querySelector('.responsive-video');
    const overlay = document.getElementById('videoOverlay');
    const unmuteBtn = document.getElementById('unmuteBtn');
    
    if (!video || !overlay || !unmuteBtn) {
        console.log('ℹ️ Video elements not found on this page');
        return;
    }
    
    // Ensure video starts muted
    video.muted = true;
    
    // Handle unmute button click
    unmuteBtn.addEventListener('click', function() {
        console.log('🔊 Unmuting video...');
        
        // Unmute the video
        video.muted = false;
        
        // Play the video (in case it paused)
        video.play().catch(e => {
            console.warn('Video play failed:', e);
        });
        
        // Hide the overlay with animation
        overlay.classList.add('hidden');
        
        // Remove overlay from DOM after animation
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.style.display = 'none';
            }
        }, 300);
    });
    
    // Handle video ended (for non-looping scenarios)
    video.addEventListener('ended', function() {
        console.log('📹 Video ended');
    });
    
    // Handle video errors
    video.addEventListener('error', function(e) {
        console.error('❌ Video error:', e);
        // Hide overlay if video fails to load
        overlay.style.display = 'none';
    });
    
    console.log('✅ Video controls initialized');
}
// Performance monitoring
function logPerformance() {
    if (typeof window !== 'undefined' && window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
    } else {
        console.log('❌ Performance API not available');
    }
}

// Initialize performance monitoring
window.addEventListener('load', logPerformance);

// Global error handling
window.addEventListener('error', function(e) {
    console.error('❌ JavaScript Error:', e.error);
});

// Export for debugging
window.oakGlobal = {
    version: '4.0.0',
    type: 'Professional HTML Website',
    features: [
        'Enhanced Mobile Navigation',
        'Scroll Animations',
        'Counter Animations',
        'Contact Form',
        'Performance Monitoring',
        'Video Controls',
        'MSAT Assessment Tool Promo'
    ]
};

console.log('🌳 OAK Global Professional Website v4.0.0 Ready!');