document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE NAVBAR TOGGLE MODULE ---
    const menuButton = document.getElementById('menu-btn');
    const mobileDropdownMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileDropdownMenu) {
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileDropdownMenu.style.display === 'block';
            mobileDropdownMenu.style.display = isOpen ? 'none' : 'block';
        });

        mobileDropdownMenu.querySelectorAll('a').forEach(targetLink => {
            targetLink.addEventListener('click', () => {
                mobileDropdownMenu.style.display = 'none';
            });
        });

        document.addEventListener('click', () => {
            mobileDropdownMenu.style.display = 'none';
        });
    }

    // --- 2. LIVE NETLIFY FORM API PIPELINE ---
    const contactForm = document.querySelector('.developer-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Compile into structural format required by Netlify Forms parsing engine
            const NetlifyPayload = new URLSearchParams();
            NetlifyPayload.append('form-name', 'contact');
            NetlifyPayload.append('firstName', firstName);
            NetlifyPayload.append('lastName', lastName);
            NetlifyPayload.append('email', email);
            NetlifyPayload.append('subject', subject);
            NetlifyPayload.append('message', message);

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: NetlifyPayload.toString()
                });

                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset(); 
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