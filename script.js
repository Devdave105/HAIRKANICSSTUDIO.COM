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
    
    // Show spinner for 2 seconds, then show content
    setTimeout(() => {
        spinner.style.display = 'none';
        container.style.display = 'block';
    }, 2000);
    
    // Exit button functionality
    exitBtn.addEventListener('click', () => {
        exitModal.style.display = 'flex';
    });
    
    // Cancel exit
    cancelExit.addEventListener('click', () => {
        exitModal.style.display = 'none';
    });
    
    // Confirm exit
    confirmExit.addEventListener('click', () => {
        // In a real app, this would redirect or close window
        // For demo, we'll just show an alert
        alert('Thank you for visiting Hairkanics Studio!');
        exitModal.style.display = 'none';
        
        // Optional: Redirect to homepage or close
        // window.location.href = 'https://google.com';
        // window.close(); // Only works if window was opened by script
    });
    
    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state on submit button
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call/processing
        setTimeout(() => {
            // Hide form and show success message
            bookingForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
    
    // Close success message
    closeSuccess.addEventListener('click', () => {
        successMessage.style.display = 'none';
        bookingForm.style.display = 'block';
        bookingForm.reset();
    });
    
    // Book again button
    bookAgainBtn.addEventListener('click', () => {
        successMessage.style.display = 'none';
        bookingForm.style.display = 'block';
        bookingForm.reset();
        
        // Scroll to form
        bookingForm.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Set minimum date to today for date picker
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Form validation feedback
    const formInputs = bookingForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = '#4caf50';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#d4a574';
            }
        });
    });
    
    // Add some interactive animations
    const serviceItems = document.querySelectorAll('.service-list li');
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.3s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 100));
    });
    
    // Add hover effect to service sections
    const serviceSections = document.querySelectorAll('.service-section');
    serviceSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });
});