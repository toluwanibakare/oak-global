// OAK Global International Business Solutions - JavaScript
// Professional website initialization

// Backend API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM loaded, initializing website
    
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeCounters();
    initializeContactForm();
    initializeLoadingStates();
    initializeVisionMissionCards();
    
    // OAK Global website fully initialized
});

// Enhanced Mobile Navigation
function initializeNavigation() {
    // Initializing navigation
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) {
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
    
    // Navigation initialized
}

// Scroll Effects
function initializeScrollEffects() {
    // Initializing scroll effects
    
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
    
    // Scroll effects initialized
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
                    entry.target.classList.contains('benefit-card') ||
                    entry.target.classList.contains('value-card') ||
                    entry.target.classList.contains('process-step')) {
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
        .contact-item,
        .vision-card,
        .mission-card,
        .promo-content
    `);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease-out';
        observer.observe(element);
    });
    
    // Elements observed for animation
}

// Counter Animations
function initializeCounters() {
    // Initializing counter animations
    
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
    
    // Counters initialized
}

// Contact Form Handling with Node/Express Backend
function initializeContactForm() {
    // Initializing contact form
    
    const contactForm = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-messages');
    
    if (!contactForm) {
        // No contact form found on this page
        return;
    }
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const company = formData.get('company')?.trim();
        const service = formData.get('service');
        const message = formData.get('message')?.trim();
        
        // Validation
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
        
        // Message length validation
        if (message.length < 10) {
            showMessage('Please provide a more detailed message (at least 10 characters).', 'error');
            return;
        }
        
        const submitButton = this.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<span>Sending...</span><div class="spinner"></div>';
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        try {
            // Sending contact form to backend
            
            const response = await fetch(`${API_BASE_URL}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    company: company || null,
                    service: service || null,
                    message: message
                })
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit contact form');
            }
            
            // Contact submitted successfully
            showMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Track form submission
            trackFormSubmission(name, email, service);
            
        } catch (error) {
            showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            
            // Scroll to message
            if (messageDiv) {
                messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    function showMessage(text, type) {
        if (messageDiv) {
            const icon = type === 'success' ? 'check-circle' : 'exclamation-triangle';
            messageDiv.innerHTML = `
                <div class="form-message ${type}">
                    <i class="fas fa-${icon}"></i>
                    ${text}
                </div>
            `;
            messageDiv.style.display = 'block';
            
            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }
        }
    }
    
    // Track form submissions for analytics
    function trackFormSubmission(name, email, service) {
        try {
            // Update visit counter
            const visits = parseInt(localStorage.getItem('oakglobal_visits') || '0') + 1;
            localStorage.setItem('oakglobal_visits', visits.toString());
            
            // Form submission tracked
        } catch (error) {
        }
    }
    
    // Contact form initialized
}

// Loading States
function initializeLoadingStates() {
    console.log('⏳ Initializing loading states...');
    
    // Add loading states to all buttons
    const buttons = document.querySelectorAll('.cta-button, .learn-more-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't add loading state to external links
            if (this.getAttribute('href')?.startsWith('http') && this.getAttribute('target') === '_blank') {
                return;
            }
            
            // Add subtle loading effect for internal navigation
            if (this.getAttribute('href')?.endsWith('.html')) {
                this.style.opacity = '0.8';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 300);
            }
        });
    });
    
    // Loading states initialized
}

// Vision Mission Cards
function initializeVisionMissionCards() {
    // Initializing vision mission cards
    
    const cards = document.querySelectorAll('.swipeable-cards .card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevCard');
    const nextBtn = document.getElementById('nextCard');
    
    if (cards.length === 0) {
        // No vision mission cards found on this page
        return;
    }
    
    let currentCard = 0;
    let autoPlayInterval = null;
    
    function showCard(index) {
        // Hide all cards first
        cards.forEach(card => {
            card.classList.remove('active', 'prev');
            card.style.opacity = '0';
            card.style.transform = 'translateX(100%)';
        });
        
        // Show the current card with animation
        setTimeout(() => {
            const currentCardElement = cards[index];
            if (currentCardElement) {
                currentCardElement.classList.add('active');
                currentCardElement.style.opacity = '1';
                currentCardElement.style.transform = 'translateX(0)';
                console.log('Card activated:', index, currentCardElement.querySelector('h3')?.textContent);
            }
        }, 100);
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentCard = index;
    }
    
    function nextCard() {
        const next = (currentCard + 1) % cards.length;
        showCard(next);
    }
    
    function prevCard() {
        const prev = (currentCard - 1 + cards.length) % cards.length;
        showCard(prev);
    }
    
    function startAutoPlay() {
        stopAutoPlay();
        console.log('Starting auto-play...');
        autoPlayInterval = setInterval(() => {
            console.log('Auto-play: advancing to next card');
            nextCard();
        }, 15000);
    }
    
    function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            stopAutoPlay();
            nextCard();
            startAutoPlay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Previous button clicked');
            stopAutoPlay();
            prevCard();
            startAutoPlay();
        });
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            stopAutoPlay();
            showCard(index);
            startAutoPlay();
        });
    });
    
    // Initialize first card
    showCard(0);
    
    // Start auto-play
    startAutoPlay();
    
    // Pause auto-play on hover
    const cardsContainer = document.querySelector('.cards-container');
    if (cardsContainer) {
        cardsContainer.addEventListener('mouseenter', () => {
            stopAutoPlay();
        });
        
        cardsContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    if (cardsContainer) {
        console.log('Adding touch event listeners');
        cardsContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        cardsContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                stopAutoPlay();
                if (diff > 0) {
                    console.log('Swiped left - next card');
                    nextCard();
                } else {
                    console.log('Swiped right - previous card');
                    prevCard();
                }
                startAutoPlay();
            }
        }, { passive: true });
    }
    
    // Vision mission cards initialized
}

// Performance monitoring
function logPerformance() {
    if (typeof window !== 'undefined' && window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        // Page load time tracked
        
        // Track page views
        try {
            const visits = parseInt(localStorage.getItem('oakglobal_visits') || '0') + 1;
            localStorage.setItem('oakglobal_visits', visits.toString());
        } catch (error) {
            // Visit tracking failed
        }
    } else {
        // Performance API not available
    }
}

// Initialize performance monitoring
window.addEventListener('load', logPerformance);

// Global error handling
window.addEventListener('error', function(e) {
    // Error caught
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Video play functionality
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.company-video');
    const videoContainer = document.querySelector('.video-container');
    const playBtn = document.querySelector('.video-play-btn');
    
    if (playBtn && video) {
        playBtn.addEventListener('click', function() {
            video.play();
            videoContainer.classList.add('playing');
        });
        
        video.addEventListener('play', function() {
            videoContainer.classList.add('playing');
        });
        
        video.addEventListener('pause', function() {
            videoContainer.classList.remove('playing');
        });
        
        video.addEventListener('ended', function() {
            videoContainer.classList.remove('playing');
        });
    }
});

// Export for debugging
window.oakGlobal = {
    version: '5.0.0',
    type: 'Professional HTML Website',
    theme: 'Green & Blue Professional',
    features: [
        'Enhanced Mobile Navigation',
        'Scroll Animations',
        'Counter Animations',
        'Supabase Contact Form',
        'Performance Monitoring',
        'MSAT Assessment Tool Integration',
        'Vision & Mission Display',
        'Professional Green/Blue Theme',
        'Loading States',
        'Error Handling'
    ],
    // typeof supabase !== 'undefined' ? 'Connected' : 'Not Available'

};

  document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if (!category) return;

    const tabs = document.querySelectorAll(".category-tab");
    const contents = document.querySelectorAll(".category-content full-width services");

    tabs.forEach(tab => {
      tab.classList.remove("active");
      if (tab.dataset.category === category) {
        tab.classList.add("active");
      }
    });

    contents.forEach(content => {
      content.classList.remove("active");
      if (content.dataset.category === category) {
        content.classList.add("active");
      }
    });
  });

