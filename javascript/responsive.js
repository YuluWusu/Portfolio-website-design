// Thêm vào portfolio.js
document.addEventListener('DOMContentLoaded', function() {
    // Fix cho mobile viewport
    function fixMobileViewport() {
        if (window.innerWidth <= 480) {
            document.querySelector('meta[name="viewport"]').setAttribute('content', 
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            
            // Force repaint
            document.body.style.display = 'none';
            document.body.offsetHeight; // Trigger reflow
            document.body.style.display = '';
        }
    }
    
    // Chạy khi load và khi resize
    fixMobileViewport();
    window.addEventListener('resize', fixMobileViewport);
    
    // Prevent zoom on double tap (iOS)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});