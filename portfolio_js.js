// Initialize Typing Effects safely
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".texttype")) {
        var typed = new Typed(".texttype", { 
            strings: ["Software Developer", "AI ML ENGINEER"], 
            typeSpeed: 80, 
            backSpeed: 50,
            backDelay: 1000, 
            loop: true 
        });
    }

    // Dynamic Video Control Strategy (No hardcoded array crashes)
    const projectCards = document.querySelectorAll('.projectcard');

    projectCards.forEach(card => {
        const video = card.querySelector('.project-video');
        const hoverSign = card.querySelector('.hoversign');

        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play().catch(err => console.log("Video auto-play prevented:", err));
                if (hoverSign) hoverSign.classList.add("active");
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                if (hoverSign) hoverSign.classList.remove("active");
            });
        }
    });

    // ==========================================================================
    // ASYNC LIVE CONTACT FORM HANDLER (Pure JavaScript Fetch API)
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const responseDiv = document.getElementById('formResponse');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Browser ka default page reload behavior rok diya

            // 1. Loading UI state active karo
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            responseDiv.style.color = "#DF8908"; // Theme matching orange color
            responseDiv.innerText = "Processing your message...";

            // 2. Pure form ke inputs ka data auto-collect karo
            const formData = new FormData(contactForm);

            // 3. Background me bina dikhe API request hit karo
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status == 200) {
                    // Success Handle
                    responseDiv.style.color = "#2EC866"; // Success Green
                    responseDiv.innerText = "Success! Message sent successfully. ✔";
                    contactForm.reset(); // Saare field automatic clear!
                } else {
                    // Error Handle
                    responseDiv.style.color = "#ff1d15"; // Error Red
                    responseDiv.innerText = res.message || "Something went wrong!";
                }
            })
            .catch(error => {
                console.log("Submission network crash tracking:", error);
                responseDiv.style.color = "#ff1d15";
                responseDiv.innerText = "Network error! Please try again later.";
            })
            .finally(() => {
                // 4. Button ko wapas normal position par lao
                submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
                submitBtn.disabled = false;
                
                // 5 seconds ke baad notice text ko automatic gayab karne ka timer
                setTimeout(() => {
                    responseDiv.innerText = "";
                }, 5000);
            });
        });
    }
    // ==========================================================================
    // AUTOMATIC CV DOWNLOAD HANDLER
    // ==========================================================================
    const downloadBtn = document.getElementById('downloadCVBtn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // 1. Apni asli PDF file ka naam ya path yahan likho
            const cvUrl = 'Ashutosh_Kumar_Singh_Resume.pdf'; 
            
            // 2. Dynamic temporary link create karke user ko trigger dena
            const tempLink = document.createElement('a');
            tempLink.href = cvUrl;
            
            // 3. Jis naam se file user ke computer me save hogi woh yahan set karo
            tempLink.download = 'Ashutosh_Kumar_Singh_Resume.pdf'; 
            
            // 4. Background me link click karke element destroy karna
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        });
    }
});