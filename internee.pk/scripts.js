document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = documendocument.addEventListener("DOMContentLoaded", function() {
        // Lazy loading images
        let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    
        if ("IntersectionObserver" in window) {
            let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.remove("lazy");
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });
    
            lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });
        } else {
            // Fallback for older browsers
            let lazyLoad = function() {
                for (let i = 0; i < lazyImages.length; i++) {
                    if (lazyImages[i].getBoundingClientRect().top <= window.innerHeight && lazyImages[i].getBoundingClientRect().bottom >= 0 && getComputedStyle(lazyImages[i]).display !== "none") {
                        lazyImages[i].src = lazyImages[i].dataset.src;
                        lazyImages[i].classList.remove("lazy");
                        lazyImages.splice(i, 1);
                        i--;
                    }
                }
                if (lazyImages.length === 0) {
                    document.removeEventListener("scroll", lazyLoad);
                    window.removeEventListener("resize", lazyLoad);
                    window.removeEventListener("orientationchange", lazyLoad);
                }
            };
    
            document.addEventListener("scroll", lazyLoad);
            window.addEventListener("resize", lazyLoad);
            window.addEventListener("orientationchange", lazyLoad);
        }
    
        // Carousel functionality
        let slideIndex = 0;
        let slides = document.querySelectorAll(".carousel-slide");
        let next = document.querySelector(".carousel-control.next");
        let prev = document.querySelector(".carousel-control.prev");
    
        function showSlides(n) {
            slides.forEach((slide, index) => {
                slide.style.display = (index === n) ? "block" : "none";
            });
        }
    
        function nextSlide() {
            slideIndex = (slideIndex + 1) % slides.length;
            showSlides(slideIndex);
        }
    
        function prevSlide() {
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            showSlides(slideIndex);
        }
    
        next.addEventListener("click", nextSlide);
        prev.addEventListener("click", prevSlide);
        showSlides(slideIndex);
    
        // Form validation
        let form = document.getElementById("contact-form");
        let formMessage = document.getElementById("form-message");
    
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let message = document.getElementById("message").value;
    
            if (name === "" || email === "" || message === "") {
                formMessage.textContent = "All fields are required.";
                formMessage.style.color = "red";
            } else if (!validateEmail(email)) {
                formMessage.textContent = "Invalid email format.";
                formMessage.style.color = "red";
            } else {
                formMessage.textContent = "Message sent successfully!";
                formMessage.style.color = "green";
            }
        });
    
        function validateEmail(email) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.[^<>()[\]\\.,;:\s@"]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    });
    t.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    const slideInterval = 2000; // Auto-play interval in milliseconds

    const showSlide = index => {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        carousel.style.transform = `translateX(${-index * 100}%)`;
        currentIndex = index;
    };

    const nextSlide = () => showSlide(currentIndex + 1);
    const prevSlide = () => showSlide(currentIndex - 1);

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    let autoPlay = setInterval(nextSlide, slideInterval);

    const stopAutoPlay = () => clearInterval(autoPlay);
    const startAutoPlay = () => {
        autoPlay = setInterval(nextSlide, slideInterval);
    };

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    showSlide(currentIndex);

    // Navbar toggle functionality
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
});
