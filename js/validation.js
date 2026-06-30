// ==========================================================================
// CONTACT FORM VALIDATION ENGINE (Miva Portfolio Theme)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');

    // Hide success message explicitly on load
    if (successMessage) {
        successMessage.style.display = 'none';
    }

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop standard form submission reload

        // 1. Gather form input elements
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const phoneInput = document.getElementById('contactPhone');
        const messageInput = document.getElementById('contactMessage');

        let isValid = true;

        // 2. Clear out old execution error treatments
        removeErrorStyles([nameInput, emailInput, phoneInput, messageInput]);

        // 3. Name Validation (must be at least 2 characters)
        if (nameInput.value.trim().length < 2) {
            applyErrorStyle(nameInput, "Please enter your full name (at least 2 characters)");
            isValid = false;
        }

        // 4. Email Validation (Regex Check)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            applyErrorStyle(emailInput, "Please enter a valid email address");
            isValid = false;
        }

        // 5. Phone Validation (Simple global numbers check: 7-15 digits)
        const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            applyErrorStyle(phoneInput, "Phone number must contain only valid digits (7-15 digits)");
            isValid = false;
        }

        // 6. Message Validation (must be at least 10 characters)
        if (messageInput.value.trim().length < 10) {
            applyErrorStyle(messageInput, "Message must be at least 10 characters long");
            isValid = false;
        }

        // 7. Success Action Block Handling
        if (isValid) {
            // Display the success success banner element
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            // Reset form fields cleanly
            contactForm.reset();

            // Clear success badge window banner after 5 seconds automatically
            setTimeout(() => {
                if (successMessage) successMessage.style.display = 'none';
            }, 5000);
        }
    });

    // Helper functions to create dynamic, accessible warning states
    function applyErrorStyle(inputElement, errorMessage) {
        if (!inputElement) return;
        
        inputElement.classList.add('error');
        
        // Dynamically append or enable a message below input if needed
        let errorSpan = inputElement.parentNode.querySelector('.form-error');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'form-error visible';
            errorSpan.style.color = '#e63946';
            errorSpan.style.fontSize = '0.85rem';
            errorSpan.style.marginTop = '0.25rem';
            errorSpan.style.display = 'block';
            inputElement.parentNode.appendChild(errorSpan);
        }
        errorSpan.textContent = errorMessage;
        errorSpan.style.display = 'block';
    }

    function removeErrorStyles(elementsArray) {
        elementsArray.forEach(element => {
            if (!element) return;
            element.classList.remove('error');
            const errorSpan = element.parentNode.querySelector('.form-error');
            if (errorSpan) {
                errorSpan.style.display = 'none';
            }
        });
    }
});