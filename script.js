// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const spinner = document.getElementById('spinner');
    const container = document.querySelector('.container');
    const exitBtn = document.getElementById('exitBtn');
    const exitModal = document.getElementById('exitModal');
    const cancelExit = document.getElementById('cancelExit');
    const confirmExit = document.getElementById('confirmExit');
    const bookingForm = document.getElementById('bookingForm');
    const successMessage = document.getElementById('successMessage');
    const closeSuccess = document.getElementById('closeSuccess');
    const bookAgainBtn = document.getElementById('bookAgainBtn');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    // Ads variables
    const ads = document.querySelectorAll('.ad');
    const indicators = document.querySelectorAll('.indicator');
    const adPrevBtn = document.querySelector('.ad-prev');
    const adNextBtn = document.querySelector('.ad-next');
    let currentAdIndex = 0;
    let adInterval;
    
    // Show spinner for 2 seconds, then show content
    setTimeout(() => {
        spinner.style.display = 'none';
        container.style.display = 'block';
        document.body.style.backgroundColor = '#f5f5f5';
        startAdRotation(); // Start ads after page loads
    }, 2000);
    
    // ADS ROTATION FUNCTIONALITY
    function showAd(index) {
        // Hide all ads
        ads.forEach(ad => {
            ad.classList.remove('active');
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show selected ad
        ads[index].classList.add('active');
        indicators[index].classList.add('active');
        currentAdIndex = index;
    }
    
    function nextAd() {
        let nextIndex = currentAdIndex + 1;
        if (nextIndex >= ads.length) {
            nextIndex = 0;
        }
        showAd(nextIndex);
    }
    
    function prevAd() {
        let prevIndex = currentAdIndex - 1;
        if (prevIndex < 0) {
            prevIndex = ads.length - 1;
        }
        showAd(prevIndex);
    }
    
    function startAdRotation() {
        // Clear any existing interval
        if (adInterval) clearInterval(adInterval);
        
        // Start rotating ads every 20 seconds
        adInterval = setInterval(nextAd, 20000); // 20 seconds
        
        // Add click event to indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showAd(index);
                resetAdInterval(); // Reset timer when manually changing ad
            });
        });
        
        // Add click events to navigation buttons
        adNextBtn.addEventListener('click', () => {
            nextAd();
            resetAdInterval();
        });
        
        adPrevBtn.addEventListener('click', () => {
            prevAd();
            resetAdInterval();
        });
        
        // Add click events to CTA buttons
        document.querySelectorAll('.ad-cta').forEach(button => {
            button.addEventListener('click', function() {
                const adTitle = this.closest('.ad').querySelector('.ad-title').textContent;
                alert(`Thank you for your interest in "${adTitle}"! Our team will contact you shortly.`);
                bookingForm.scrollIntoView({ behavior: 'smooth' });
                resetAdInterval();
            });
        });
    }
    
    function resetAdInterval() {
        clearInterval(adInterval);
        adInterval = setInterval(nextAd, 20000); // Reset to 20 seconds
    }
    
    // Exit button functionality
    exitBtn.addEventListener('click', () => {
        exitModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        clearInterval(adInterval); // Pause ads when modal is open
    });
    
    // Cancel exit
    cancelExit.addEventListener('click', () => {
        exitModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetAdInterval(); // Resume ads
    });
    
    // Confirm exit
    confirmExit.addEventListener('click', () => {
        // Show exit message
        alert('Thank you for visiting Hairkanics Studio! We hope to see you soon at #10 Osongama Estate Rd.');
        exitModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetAdInterval(); // Resume ads
    });
    
    // WhatsApp button click animation
    whatsappBtn.addEventListener('click', function(e) {
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
        
        // Log WhatsApp click
        console.log('WhatsApp button clicked');
    });
    
    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('fullName').value,
            phone: document.getElementById('phoneInput').value,
            email: document.getElementById('email').value,
            date: document.getElementById('date').value,
            service: document.getElementById('service').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.service || !formData.time) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show loading state on submit button
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="btn-text">Processing...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call/processing
        setTimeout(() => {
            // Hide form and show success message
            bookingForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Log booking data (in real app, send to server)
            console.log('Booking Details:', formData);
            
        }, 1500);
    });
    
    // Close success message
    closeSuccess.addEventListener('click', () => {
        successMessage.style.display = 'none';
        bookingForm.style.display = 'block';
        bookingForm.reset();
        
        // Reset phone input to default
        document.getElementById('phoneInput').value = '0802 142 9974';
        
        // Scroll to form
        bookingForm.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Book again button
    bookAgainBtn.addEventListener('click', () => {
        successMessage.style.display = 'none';
        bookingForm.style.display = 'block';
        bookingForm.reset();
        
        // Reset phone input to default
        document.getElementById('phoneInput').value = '0802 142 9974';
        
        // Scroll to form
        bookingForm.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Set minimum date to today for date picker
    const dateInput = document.getElementById('date');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
    dateInput.min = tomorrowFormatted;
    
    // Format phone number input
    const phoneInput = document.getElementById('phoneInput');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        
        // Format as 0802 142 9974
        if (value.length >= 4) {
            value = value.replace(/(\d{4})(\d{0,3})(\d{0,4})/, '$1 $2 $3').trim();
        }
        
        e.target.value = value;
    });
    
    // Form validation feedback
    const formInputs = bookingForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            } else {
                this.style.borderColor = '#2ecc71';
                this.style.boxShadow = '0 0 0 3px rgba(46, 204, 113, 0.1)';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#c19a6b';
                this.style.boxShadow = '0 0 0 3px rgba(193, 154, 107, 0.1)';
            }
        });
    });
    
    // Add interactive animations
    const serviceItems = document.querySelectorAll('.service-list li');
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.4s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 800 + (index * 100));
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === exitModal) {
            exitModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetAdInterval(); // Resume ads
        }
    });
    
    // Add keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && exitModal.style.display === 'flex') {
            exitModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetAdInterval(); // Resume ads
        }
        
        // Keyboard navigation for ads (left/right arrows)
        if (e.key === 'ArrowRight') {
            nextAd();
            resetAdInterval();
        }
        if (e.key === 'ArrowLeft') {
            prevAd();
            resetAdInterval();
        }
    });
});