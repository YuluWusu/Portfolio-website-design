// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    
    // Mobile Menu Toggle
    menuToggle.addEventListener('click', function() {
    navbar.classList.toggle('active');
    
    // Thay vì thay đổi HTML, toggle class
    menuToggle.classList.toggle('active');
});
    
    // Smooth scroll function
    function smoothScrollTo(targetElement, duration = 800) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        // Easing function - tạo hiệu ứng mượt mà
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Đóng menu mobile nếu đang mở
                navbar.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                
                // Scroll mượt đến section
                smoothScrollTo(targetSection);
            }
        });
    });
    
    // Debounce function for performance
    function debounce(func, wait = 10) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
    
    // Highlight active navigation link based on scroll position
    function highlightNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        // Find current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize
    highlightNavLink();
    
    // Listen for scroll events with debounce
    window.addEventListener('scroll', debounce(highlightNavLink, 15));
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && !menuToggle.contains(e.target) && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Adjust scroll position on page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    });
});
