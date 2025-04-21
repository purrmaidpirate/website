// While you mentioned you don't need interaction, this small script ensures 
// the grid background extends to cover the entire scrollable area

document.addEventListener('DOMContentLoaded', function() {
    const rightPanel = document.querySelector('.right-panel');
    const projectGrid = document.querySelector('.project-grid');
    
    // Function to adjust the grid background size
    function adjustGridBackground() {
        const gridBackground = document.querySelector('.grid-background');
        const contentHeight = projectGrid.offsetHeight + 80; // Add padding
        const contentWidth = projectGrid.offsetWidth + 80;
        
        // Make sure the grid background covers the entire content
        if (contentHeight > rightPanel.offsetHeight) {
            gridBackground.style.height = contentHeight + 'px';
        }
        
        if (contentWidth > rightPanel.offsetWidth) {
            gridBackground.style.width = contentWidth + 'px';
        }
    }
    
    // Adjust initially and on window resize
    adjustGridBackground();
    window.addEventListener('resize', adjustGridBackground);
    
    // Optional: Add hover effect for project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
});