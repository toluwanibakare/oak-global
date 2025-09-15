// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize navigation first
    initializeNavigation();
    
    // Initialize other features
    initializeNavbarEffects();
    initializeContactForm();
    initializeSmoothScroll();
    initializeAnimations();
    initializeAOS();
    initializeCounters();
    initializeAdvancedAnimations();
    trackPageVisit();
});

// Initialize navigation functionality - SIMPLIFIED VERSION
function initializeNavigation() {
    console.log('Starting navigation initialization...');
    
    // Use more specific selectors and add fallbacks
    const navToggle = document.querySelector('.nav-toggle') || document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu') || document.getElementById('nav-menu');
    
    console.log('Navigation elements found:', {
        navToggle: !!navToggle,
        navMenu: !!navMenu,
        navToggleClasses: navToggle ? navToggle.className : 'not found',
        navMenuClasses: navMenu ? navMenu.className : 'not found'
    });
    
    if (navToggle && navMenu) {
        console.log('Both elements found, setting up event listeners...');
        
        // Simple click handler
        function toggleMenu() {
            console.log('Toggle menu called');
            const isActive = navMenu.classList.contains('active');
            console.log('Current state - Menu active:', isActive);
            
            if (isActive) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Menu closed');
            } else {
                navMenu.classList.add('active');
                navToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('Menu opened');
            }
        }
        
        // Add multiple event listeners for better compatibility
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Click event triggered');
            toggleMenu();
        });
        
        navToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Touch event triggered');
            toggleMenu();
        });
        
        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        console.log('Found nav links:', navLinks.length);
        
        navLinks.forEach((link, index) => {
            link.addEventListener('click', function() {
                console.log('Nav link clicked:', index);
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    console.log('Clicked outside, closing menu');
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                console.log('Escape pressed, closing menu');
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        console.log('Navigation setup complete');
    } else {
        console.error('Navigation elements not found!');
        console.log('Available elements with nav-toggle class:', document.querySelectorAll('.nav-toggle'));
        console.log('Available elements with nav-menu class:', document.querySelectorAll('.nav-menu'));
        console.log('Available elements with id nav-toggle:', document.querySelectorAll('#nav-toggle'));
        console.log('Available elements with id nav-menu:', document.querySelectorAll('#nav-menu'));
    }
    
    // Set active navigation link
    setActiveNavLink();
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize navbar scroll effects
function initializeNavbarEffects() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class when scrolling down
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Add hover effects to nav items
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
}

// Initialize contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                company: document.getElementById('company').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim(),
                timestamp: new Date().toISOString()
            };
            
            // Basic validation
            if (!formData.name || !formData.email || !formData.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            submitContactForm(formData);
        });
    }
}

// Simulate form submission and store in localStorage
function submitContactForm(formData) {
    try {
        // Get existing contacts from localStorage
        let contacts = JSON.parse(localStorage.getItem('oakglobal_contacts') || '[]');
        
        // Add new contact
        contacts.push({
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            company: formData.company || '',
            service: formData.service || '',
            message: formData.message,
            timestamp: formData.timestamp,
            read: false
        });
        
        // Save back to localStorage
        localStorage.setItem('oakglobal_contacts', JSON.stringify(contacts));
        
        // Show success message
        showFormMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        console.log('Contact form submitted:', formData);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showFormMessage('There was an error sending your message. Please try again.', 'error');
    }
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Initialize smooth scrolling for anchor links
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize animations and scroll effects
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.service-card, .benefit-item, .value-item, .service-detail, .stat-item');
    animatedElements.forEach(element => {
        element.classList.add('animate-ready');
        observer.observe(element);
    });
}

// Initialize AOS-like animations
function initializeAOS() {
    const aosElements = document.querySelectorAll('[data-aos]');
    
    const aosObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    aosElements.forEach(element => {
        aosObserver.observe(element);
    });
}

// Initialize counter animations
function initializeCounters() {
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
}

// Track page visits for admin dashboard
function trackPageVisit() {
    const visits = parseInt(localStorage.getItem('oakglobal_visits') || '0');
    localStorage.setItem('oakglobal_visits', (visits + 1).toString());
}

// Initialize advanced animations
function initializeAdvancedAnimations() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Staggered animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-ready');
    });
    
    // Mouse follow effect for buttons
    const buttons = document.querySelectorAll('.cta-button, .secondary-button');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--mouse-x', x + 'px');
            button.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

// Utility functions
function getStoredContacts() {
    return JSON.parse(localStorage.getItem('oakglobal_contacts') || '[]');
}

function clearStoredContacts() {
    localStorage.removeItem('oakglobal_contacts');
    console.log('All stored contacts cleared');
}

function getPageVisits() {
    return parseInt(localStorage.getItem('oakglobal_visits') || '0');
}

// Global object for debugging
window.oakGlobal = {
    getContacts: getStoredContacts,
    clearContacts: clearStoredContacts,
    getVisits: getPageVisits,
    version: '1.0.0'
};

console.log('OAK Global website script loaded');
console.log('Available methods: oakGlobal.getContacts(), oakGlobal.clearContacts(), oakGlobal.getVisits()');