// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize navbar scroll effects
    initializeNavbarEffects();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize smooth scrolling
    initializeSmoothScroll();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize AOS (Animate On Scroll)
    initializeAOS();
    
    // Initialize counter animations
    initializeCounters();
    
    // Initialize advanced animations
    initializeAdvancedAnimations();
    
    // Track page visits
    trackPageVisit();
});

// Initialize navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    console.log('Initializing navigation...', { 
        navToggle: !!navToggle, 
        navMenu: !!navMenu,
        navToggleId: navToggle?.id,
        navMenuId: navMenu?.id 
    });
    
    if (navToggle && navMenu) {
        console.log('Navigation elements found, adding event listeners');
        
        navToggle.addEventListener('click', () => {
            console.log('Nav toggle clicked - current state:', {
                menuActive: navMenu.classList.contains('active'),
                toggleActive: navToggle.classList.contains('active')
            });
            
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            console.log('Nav toggle after click - new state:', {
                menuActive: navMenu.classList.contains('active'),
                toggleActive: navToggle.classList.contains('active')
            });
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                console.log('Menu opened, body scroll disabled');
            } else {
                document.body.style.overflow = '';
                console.log('Menu closed, body scroll enabled');
            }
        });
        
        // Add touch event for better mobile support
        navToggle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log('Touch event on nav toggle');
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        console.log('Found nav links:', navLinks.length);
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Nav link clicked');
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                if (navToggle) {
                    navToggle.classList.remove('active');
                }
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                if (navToggle) {
                    navToggle.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('Navigation elements not found:', { 
            navToggle: !!navToggle, 
            navMenu: !!navMenu,
            allElementsWithNavToggleId: document.querySelectorAll('#nav-toggle'),
            allElementsWithNavMenuId: document.querySelectorAll('#nav-menu')
        });
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
            
            // Simulate form submission (in a real scenario, this would be sent to a server)
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
        
        // Log submission (for demonstration purposes)
        console.log('Contact form submitted:', formData);
        console.log('Total contacts:', contacts.length);
        
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
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed header
                
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
    // Enhanced scroll animations
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
    
    // Observe elements for animation
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
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
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

// Utility function to get all stored contacts (for demonstration)
function getStoredContacts() {
    return JSON.parse(localStorage.getItem('oakglobal_contacts') || '[]');
}

// Utility function to clear all stored contacts (for demonstration)
function clearStoredContacts() {
    localStorage.removeItem('oakglobal_contacts');
    console.log('All stored contacts cleared');
}

// Get page visit count
function getPageVisits() {
    return parseInt(localStorage.getItem('oakglobal_visits') || '0');
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
    
    // Floating animation for benefit icons
    const benefitIcons = document.querySelectorAll('.benefit-icon');
    benefitIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
        icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });
    
    // Typewriter effect for hero title (on homepage)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && window.location.pathname.includes('index')) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
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
// Add some console methods for development/demonstration
window.oakGlobal = {
    getContacts: getStoredContacts,
    clearContacts: clearStoredContacts,
    getVisits: getPageVisits,
    version: '1.0.0'
};

// Add CSS for animations
const animationCSS = `
.animate-ready {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

[data-aos] {
    opacity: 0;
    transition: opacity 0.6s ease, transform 0.6s ease;
}

[data-aos="fade-up"] {
    transform: translateY(30px);
}

[data-aos="fade-left"] {
    transform: translateX(30px);
}

[data-aos="fade-right"] {
    transform: translateX(-30px);
}

[data-aos="zoom-in"] {
    transform: scale(0.8);
}

[data-aos="flip-left"] {
    transform: rotateY(-90deg);
}

.aos-animate {
    opacity: 1 !important;
    transform: none !important;
}
`;

// Inject animation CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = animationCSS;
document.head.appendChild(styleSheet);

// Log initialization
console.log('OAK Global website initialized');
console.log('Available methods: oakGlobal.getContacts(), oakGlobal.clearContacts(), oakGlobal.getVisits()');
console.log('Enhanced animations and effects loaded');