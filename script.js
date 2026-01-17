// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu-wrapper');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Close when clicking outside
        if (navMenu.classList.contains('active')) {
            document.addEventListener('click', closeMenuOnClickOutside);
        } else {
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    });
    
    function closeMenuOnClickOutside(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    }
    
    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.removeEventListener('click', closeMenuOnClickOutside);
        });
    });
    
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
    
    // Phone number click feedback
    const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
    phoneNumbers.forEach(phone => {
        phone.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // Add visual feedback on mobile
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });
    
    // Booking form submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                date: document.getElementById('date').value,
                message: document.getElementById('message').value
            };
            
            // Simple validation
            if (!formData.name || !formData.phone || !formData.service || !formData.date) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Format date for display
            const dateObj = new Date(formData.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Service names mapping
            const serviceNames = {
                'haircut': 'Hair Cut',
                'nails': 'Nail Service',
                'braids': 'Braids',
                'consultation': 'Consultation'
            };
            
            // Create success message
            const successMessage = `
                <div class="booking-success">
                    <h3>Appointment Requested!</h3>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Phone:</strong> ${formData.phone}</p>
                    <p><strong>Service:</strong> ${serviceNames[formData.service] || formData.service}</p>
                    <p><strong>Date:</strong> ${formattedDate}</p>
                    ${formData.message ? `<p><strong>Notes:</strong> ${formData.message}</p>` : ''}
                    <p class="success-note">We'll contact you shortly to confirm your appointment.</p>
                    <button class="btn-close-modal">Close</button>
                </div>
            `;
            
            // Create and show modal
            const modal = document.createElement('div');
            modal.className = 'booking-modal';
            modal.innerHTML = successMessage;
            
            const modalContent = modal.querySelector('.booking-success');
            modalContent.style.animation = 'fadeIn 0.3s ease';
            
            // Add modal styles
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 10, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                backdrop-filter: blur(10px);
            `;
            
            modalContent.style.cssText = `
                background: var(--dark-surface);
                padding: 40px;
                border-radius: 5px;
                border: 1px solid var(--border-color);
                max-width: 500px;
                width: 90%;
                text-align: center;
            `;
            
            modalContent.querySelector('h3').style.cssText = `
                color: var(--primary-gold);
                margin-bottom: 20px;
                font-family: 'Playfair Display', serif;
                font-size: 1.5rem;
            `;
            
            modalContent.querySelectorAll('p').forEach(p => {
                p.style.marginBottom = '10px';
                p.style.textAlign = 'left';
            });
            
            const closeBtn = modalContent.querySelector('.btn-close-modal');
            closeBtn.style.cssText = `
                margin-top: 20px;
                padding: 12px 30px;
                background: var(--primary-gold);
                color: var(--dark-bg);
                border: none;
                border-radius: 2px;
                font-weight: 600;
                cursor: pointer;
                transition: var(--transition);
            `;
            
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.transform = 'translateY(-2px)';
                closeBtn.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.3)';
            });
            
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.transform = '';
                closeBtn.style.boxShadow = '';
            });
            
            closeBtn.addEventListener('click', () => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    bookingForm.reset();
                    // Reset date to tomorrow
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    document.getElementById('date').value = tomorrow.toISOString().split('T')[0];
                }, 300);
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        bookingForm.reset();
                        // Reset date to tomorrow
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        document.getElementById('date').value = tomorrow.toISOString().split('T')[0];
                    }, 300);
                }
            });
            
            document.body.appendChild(modal);
            
            // Add CSS animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .success-note {
                    font-style: italic;
                    color: var(--medium-text);
                    margin-top: 20px !important;
                    text-align: center !important;
                }
            `;
            document.head.appendChild(style);
        });
    }
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Set default to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }
    
    // Gallery hover effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
    
    // Service card animation
    const serviceCards = document.querySelectorAll('.service-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Phone number copy feedback (mobile)
    if ('ontouchstart' in window) {
        const phoneLinks = document.querySelectorAll('.phone-number-display, .nav-phone, .footer-phone');
        phoneLinks.forEach(link => {
            link.addEventListener('touchstart', function(e) {
                if (e.touches.length === 1) {
                    this.style.transform = 'scale(0.95)';
                }
            });
            
            link.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            if (email && email.includes('@')) {
                this.querySelector('input').value = '';
                this.querySelector('input').placeholder = 'Subscribed!';
                setTimeout(() => {
                    this.querySelector('input').placeholder = 'Your email';
                }, 2000);
            }
        });
    }
    
    // Fix for mobile viewport height
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    
    // Add animation to WhatsApp float
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        setInterval(() => {
            whatsappFloat.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                whatsappFloat.style.transform = 'translateY(0)';
            }, 500);
        }, 3000);
    }
});

// Parallax effect for hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && window.innerWidth > 768) {
        const rate = scrolled * 0.5;
        hero.style.backgroundPositionY = `${rate}px`;
    }
});