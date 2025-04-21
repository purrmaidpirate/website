// This is a minimal JavaScript file that can be expanded for future functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully');
    
    // Get references to main elements
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const projectItems = document.querySelectorAll('.project-item');
    
    // Optional: Add simple hover effect for project items
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.opacity = '0.9';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
    
    // This function ensures the grid background covers the entire content area
    function adjustGridBackground() {
        const gridContent = document.querySelector('.project-grid');
        const minHeight = gridContent.offsetHeight + 80; // Add some padding
        
        if (minHeight > rightPanel.offsetHeight) {
            rightPanel.style.minHeight = minHeight + 'px';
        }
    }
    
    // Adjust grid on page load and window resize
    adjustGridBackground();
    window.addEventListener('resize', adjustGridBackground);
});