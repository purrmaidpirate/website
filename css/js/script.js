document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const divider = document.getElementById('divider');
    const rightPanel = document.getElementById('right-panel');
    const gridBackdrop = document.getElementById('grid-backdrop');
    
    // Fixed width for the left panel
    const staticLeftWidth = 300;
    
    // Default divider position
    let dividerPos = staticLeftWidth;
    
    // Store right panel scroll position
    let rightScrollPosition = { x: 0, y: 0 };
    
    // Update the layout based on divider position
    function updateLayout() {
        divider.style.left = `${dividerPos}px`;
        rightPanel.style.width = `calc(100% - ${dividerPos}px)`;
        rightPanel.style.marginLeft = `${dividerPos - staticLeftWidth}px`;
        
        // Restore scroll position
        rightPanel.scrollLeft = rightScrollPosition.x;
        rightPanel.scrollTop = rightScrollPosition.y;
    }
    
    // Handle divider drag start
    divider.addEventListener('mousedown', (e) => {
        e.preventDefault();
        divider.classList.add('dragging');
        
        // Capture current scroll position
        rightScrollPosition = {
            x: rightPanel.scrollLeft,
            y: rightPanel.scrollTop
        };
        
        // Add event listeners for dragging
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', stopDrag);
    });
    
    // Handle touch start for mobile
    divider.addEventListener('touchstart', (e) => {
        e.preventDefault();
        divider.classList.add('dragging');
        
        // Capture current scroll position
        rightScrollPosition = {
            x: rightPanel.scrollLeft,
            y: rightPanel.scrollTop
        };
        
        // Add event listeners for touch dragging
        document.addEventListener('touchmove', handleTouchDrag);
        document.addEventListener('touchend', stopDrag);
    });
    
    // Handle drag movement
    function handleDrag(e) {
        // Update divider position based on mouse position
        dividerPos = Math.max(
            staticLeftWidth, 
            Math.min(e.clientX, window.innerWidth - 400)
        );
        updateLayout();
    }
    
    // Handle touch movement
    function handleTouchDrag(e) {
        // Update divider position based on touch position
        dividerPos = Math.max(
            staticLeftWidth, 
            Math.min(e.touches[0].clientX, window.innerWidth - 400)
        );
        updateLayout();
    }
    
    // Stop dragging
    function stopDrag() {
        divider.classList.remove('dragging');
        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('touchmove', handleTouchDrag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Ensure divider stays within bounds when window is resized
        dividerPos = Math.min(dividerPos, window.innerWidth - 400);
        updateLayout();
    });
    
    // Create grid cells programmatically
    const cellSize = 40;
    const gridColumns = 16;
    const gridRows = 16;
    
    // Clear existing grid cells
    gridBackdrop.innerHTML = '';
    
    // Create the grid cells
    for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridColumns; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.style.left = `${col * cellSize}px`;
            cell.style.top = `${row * cellSize}px`;
            gridBackdrop.appendChild(cell);
        }
    }
    
    // Initialize layout
    updateLayout();
});