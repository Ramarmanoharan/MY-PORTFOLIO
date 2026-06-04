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


    // --- 2. LIVE NETLIFY FORM API PIPELINE ---
    // Intercepts submission, formats fields, and routes data directly to Netlify Cloud Storage
    const contactForm = document.querySelector('.developer-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            // Stop the standard old-school browser page refresh layout flash
            event.preventDefault(); 

            // Gather values safely from text input elements
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Formulate data structure parameters as required by x-www-form-urlencoded protocol
            const NetlifyPayload = new URLSearchParams();
            NetlifyPayload.append('form-name', 'contact');
            NetlifyPayload.append('firstName', firstName);
            NetlifyPayload.append('lastName', lastName);
            NetlifyPayload.append('email', email);
            NetlifyPayload.append('subject', subject);
            NetlifyPayload.append('message', message);

            try {
                // Post directly back to root location endpoint where Netlify interceptors stand guard
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: NetlifyPayload.toString()
                });

                if (response.ok) {
                    // SUCCESS: Only ONE clean thank-you popup displays
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset(); // Safely clear out form input values
                } else {
                    alert('Oops! Netlify server cloud portal rejected submission parameters.');
                }
            } catch (error) {
                console.error('Netlify post pathway pipeline failed:', error);
                alert('Could not establish connection protocols. Verify your local internet configuration.');
            }
        });
    }
});