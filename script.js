document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileMenu.style.display =
                mobileMenu.style.display === "block"
                    ? "none"
                    : "block";
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.style.display = "none";
            });
        });

        document.addEventListener("click", () => {
            mobileMenu.style.display = "none";
        });
    }

    const contactForm = document.querySelector(".developer-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            try {
                const response = await fetch("/", {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    alert("Message sent successfully!");
                    contactForm.reset();
                } else {
                    alert("Form submission failed.");
                    console.error(await response.text());
                }
            } catch (error) {
                console.error(error);
                alert("Network error. Please try again.");
            }
        });
    }
});