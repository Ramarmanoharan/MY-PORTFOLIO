document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE NAVBAR TOGGLE MODULE ---
    // Controls the expandable dropdown menu navigation on smaller mobile screens
    const menuButton = document.getElementById('menu-btn');
    const mobileDropdownMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileDropdownMenu) {
        // Toggle menu visibility when clicking the burger/menu button
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileDropdownMenu.style.display === 'block';
            mobileDropdownMenu.style.display = isOpen ? 'none' : 'block';
        });

        // Automatically hide the dropdown menu when any navigation link is clicked
        mobileDropdownMenu.querySelectorAll('a').forEach(targetLink => {
            targetLink.addEventListener('click', () => {
                mobileDropdownMenu.style.display = 'none';
            });
        });

        // Hide the menu safely if a user clicks anywhere else on the screen background
        document.addEventListener('click', () => {
            mobileDropdownMenu.style.display = 'none';
        });
    }


    // --- 2. LIVE SPRING BOOT REST API PIPELINE ---
    // Intercepts the contact form submission and routes data over to port 8080
    const contactForm = document.querySelector('.developer-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            // Stop the standard old-school browser page refresh layout flash
            event.preventDefault(); 

            // Gather values from your input IDs and map them to variables matching your Java fields
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                // Fire an asynchronous HTTP POST request to your running Java app router portal
                const response = await fetch('http://localhost:8080/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Instructs Java to map this incoming string as a JSON template object
                    },
                    body: JSON.stringify(formData) // Flattens our JavaScript object key-values into a pure text string transfer payload
                });

                if (response.ok) {
                    // SUCCESS: Only ONE clean, professional thank-you notification displays now
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset(); // Safely clears out all text inputs on the screen template
                } else {
                    const serverErrorText = await response.text();
                    alert('Server Endpoint rejected payload parameters: ' + serverErrorText);
                }
            } catch (error) {
                console.error('Connection tracing error state:', error);
                alert('Could not bridge data pathways to the backend. Verify that your Spring Boot application is running smoothly on port 8080!');
            }
        });
    }
});