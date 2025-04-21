document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const container = document.getElementById('container');
    const leftPanel = document.getElementById('left-panel');
    const divider = document.getElementById('divider');
    const rightPanel = document.getElementById('right-panel');
    const gridBackdrop = document.getElementById('grid-backdrop');
    
    // Fixed width for left panel
    const staticLeftWidth = 300;
    
    // Track divider position (initially set to left panel width)
    let dividerPos = staticLeftWidth;
    
    // Track dragging state
    let isDragging = false;
    
    // Track scroll position
    let rightScrollPosition = { x: 0, y: 0 };
    
    // Create grid cells
    function createGridCells() {
        gridBackdrop.innerHTML = '';
        
        const cellSize = 40;
        const gridColumns = 16;
        const gridRows = 16;
        
        for (let i = 0; i < gridColumns * gridRows; i++) {
            const cell = document.createElement('div');
            gridBackdrop.appendChild(cell);
        }
    }
    
    // Update layout based on divider position
    function updateLayout() {
        divider.style.left = `${dividerPos}px`;
        
        rightPanel.style.width = `calc(100% - ${dividerPos}px)`;
        rightPanel.style.marginLeft = `${dividerPos - staticLeftWidth}px`;
        
        // Restore scroll position
        rightPanel.scrollLeft = rightScrollPosition.x;
        rightPanel.scrollTop = rightScrollPosition.y;
    }
    
    // Start dragging
    divider.addEventListener('mousedown', function(e) {
        e.preventDefault();
        isDragging = true;
        
        // Store current scroll position
        rightScrollPosition = {
            x: rightPanel.scrollLeft,
            y: rightPanel.scrollTop
        };
        
        divider.classList.add('dragging');
    });
    
    // Handle touch start for mobile
    divider.addEventListener('touchstart', function(e) {
        e.preventDefault();
        isDragging = true;
        
        // Store current scroll position
        rightScrollPosition = {
            x: rightPanel.scrollLeft,
            y: rightPanel.scrollTop
        };
        
        divider.classList.add('dragging');
    });
    
    // Handle move events
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        dividerPos = e.clientX;
        updateLayout();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        dividerPos = e.touches[0].clientX;
        updateLayout();
    });
    
    // End dragging
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            divider.classList.remove('dragging');
        }
    });
    
    document.addEventListener('touchend', function() {
        if (isDragging) {
            isDragging = false;
            divider.classList.remove('dragging');
        }
    });
    
    // Create initial grid cells
    createGridCells();
    
    // Set initial layout
    updateLayout();
});