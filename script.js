// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                date: document.getElementById('date').value,
                message: document.getElementById('message').value
            };
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you for booking, ${formData.name}! We'll contact you at ${formData.phone} to confirm your appointment for ${formData.service} on ${formData.date}.`);
            
            // Reset form
            appointmentForm.reset();
        });
    }
    
    // Set minimum date for appointment booking to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Service card animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
    
    // MOBILE HOVER SUPPORT
    // Check if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Add mobile hover classes on touch
        enableMobileHoverEffects();
        
        // Handle map hover on mobile
        enableMapHoverMobile();
    }
    
    // Gallery hover effects for mobile
    enableGalleryHoverMobile();
    
    // Service card hover for mobile
    enableServiceCardHoverMobile();
});

// Functions for Mobile Hover Support
function enableMobileHoverEffects() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.add('mobile-hover');
        });
        
        link.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('mobile-hover');
            }, 300);
        });
    });
    
    // Buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .booking-link');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.add('mobile-hover');
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('mobile-hover');
            }, 300);
        });
    });
    
    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.add('mobile-hover');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('mobile-hover');
            }, 300);
        });
    });
    
    // Service links
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach(link => {
        link.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            this.classList.add('mobile-hover');
        });
        
        link.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('mobile-hover');
            }, 300);
        });
    });
    
    // Phone number hover
    const phoneNumber = document.querySelector('.phone-number');
    if (phoneNumber) {
        phoneNumber.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.add('mobile-hover');
        });
        
        phoneNumber.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('mobile-hover');
            }, 300);
        });
    }
}

function enableMapHoverMobile() {
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const markerTooltip = this.querySelector('.marker-tooltip');
            if (markerTooltip) {
                markerTooltip.style.opacity = '1';
                markerTooltip.style.visibility = 'visible';
            }
        });
        
        mapContainer.addEventListener('touchend', function() {
            setTimeout(() => {
                const markerTooltip = this.querySelector('.marker-tooltip');
                if (markerTooltip) {
                    markerTooltip.style.opacity = '0';
                    markerTooltip.style.visibility = 'hidden';
                }
            }, 2000);
        });
    }
}

function enableGalleryHoverMobile() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const overlay = this.querySelector('.gallery-overlay');
            const img = this.querySelector('img');
            
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            }
            
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('touchend', function() {
            setTimeout(() => {
                const overlay = this.querySelector('.gallery-overlay');
                const img = this.querySelector('img');
                
                if (overlay) {
                    overlay.style.opacity = '0';
                    overlay.style.transform = 'translateY(10px)';
                }
                
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            }, 2000);
        });
    });
}

function enableServiceCardHoverMobile() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const img = this.querySelector('.service-image img');
            
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
            
            // Add visual feedback
            this.style.borderColor = 'var(--primary-color)';
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                const img = this.querySelector('.service-image img');
                
                if (img) {
                    img.style.transform = 'scale(1)';
                }
                
                // Remove visual feedback
                this.style.borderColor = '';
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 1000);
        });
    });
}

// Double-tap detection for better mobile experience
let lastTap = 0;
document.addEventListener('touchend', function(event) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 300 && tapLength > 0) {
        // Double tap detected - prevent zoom
        event.preventDefault();
    }
    
    lastTap = currentTime;
});

// Prevent scrolling when interacting with hover elements on mobile
document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.service-card') || 
        e.target.closest('.gallery-item') || 
        e.target.closest('.nav-link') ||
        e.target.closest('.btn-primary') ||
        e.target.closest('.btn-secondary')) {
        // Allow default behavior for interactive elements
        return;
    }
}, { passive: true });