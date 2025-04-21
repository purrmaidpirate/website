// Common initialization for all pages
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the index page or a project page
    const isIndexPage = !window.location.pathname.includes('/projects/');
    
    if (isIndexPage) {
        initIndexPage();
    } else {
        initProjectPage();
    }
});

// Project page functionality
function initProjectPage() {
    // Get the current project ID from the URL
    // Example: if URL is projects/project3.html, projectId will be 'project3'
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    const projectId = filename.split('.')[0];
    
    // Set up navigation links based on the current project
    setupNavigation(projectId);
    
    // Add fade-in animation for project images when they enter the viewport
    const projectImages = document.querySelectorAll('.project-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    imageObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        projectImages.forEach(image => {
            image.style.opacity = '0';
            image.style.transition = 'opacity 0.8s ease-in';
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        projectImages.forEach(image => {
            image.classList.add('visible');
        });
    }
}

// Function to set up the previous and next project navigation
function setupNavigation(currentProjectId) {
    // This is a simplified example - in a real implementation, 
    // you would need to define your projects order or fetch it from a data source
    const projectOrder = [
        'project1', 'project2', 'project3', 
        'project4', 'project5', 'project6',
        'project7', 'project8', 'project9'
    ];
    
    // Find the index of the current project
    const currentIndex = projectOrder.indexOf(currentProjectId);
    
    // If the project is not found, exit the function
    if (currentIndex === -1) return;
    
    // Get previous and next project IDs
    const prevProjectId = currentIndex > 0 ? projectOrder[currentIndex - 1] : projectOrder[projectOrder.length - 1];
    const nextProjectId = currentIndex < projectOrder.length - 1 ? projectOrder[currentIndex + 1] : projectOrder[0];
    
    // Update the navigation links
    const prevProjectLink = document.querySelector('.prev-project');
    const nextProjectLink = document.querySelector('.next-project');
    
    if (prevProjectLink) {
        prevProjectLink.href = `./${prevProjectId}.html`;
    }
    
    if (nextProjectLink) {
        nextProjectLink.href = `./${nextProjectId}.html`;
    }
}

// Index page functionality
function initIndexPage() {
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add click event listeners to each gallery item
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get the project identifier from the data attribute
            const projectId = item.getAttribute('data-project');
            
            // Navigate to the project page
            window.location.href = `projects/${projectId}.html`;
        });
    });
    
    // Add animation for gallery items on page load
    setTimeout(() => {
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
            }, 100 * index);
        });
    }, 300);
    
    // Add a simple hover effect for gallery items
    galleryItems.forEach(item => {
        const content = item.querySelector('.gallery-content');
        
        item.addEventListener('mouseenter', () => {
            content.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', () => {
            content.style.transform = 'translateY(70%)';
        });
    });
}