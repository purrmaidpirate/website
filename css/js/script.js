document.addEventListener('DOMContentLoaded', function() {
    const gridBackdrop = document.getElementById('grid-backdrop');
    
    // Create grid cells
    function createGridBackdrop() {
        // Clear existing grid
        gridBackdrop.innerHTML = '';
        
        // Get the right panel dimensions
        const rightPanel = document.querySelector('.right-panel');
        const panelWidth = Math.max(rightPanel.offsetWidth, window.innerWidth);
        const panelHeight = Math.max(rightPanel.offsetHeight, window.innerHeight);
        
        // Calculate how many cells we need
        const cellSize = 40;
        const cols = Math.ceil(panelWidth / cellSize) + 5; // Add extra columns
        const rows = Math.ceil(panelHeight / cellSize) + 5; // Add extra rows
        
        // Create the cells
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.style.left = (x * cellSize) + 'px';
                cell.style.top = (y * cellSize) + 'px';
                gridBackdrop.appendChild(cell);
            }
        }
    }
    
    // Create initial grid
    createGridBackdrop();
    
    // Update grid on window resize
    window.addEventListener('resize', createGridBackdrop);
    
    // Simple divider drag functionality
    const divider = document.querySelector('.divider');
    let isDragging = false;
    
    divider.addEventListener('mousedown', function(e) {
        isDragging = true;
        document.body.style.cursor = 'col-resize';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const layout = document.querySelector('.layout');
        const leftPanel = document.querySelector('.left-panel');
        
        // Calculate new width with constraints
        let newWidth = e.clientX;
        newWidth = Math.max(250, Math.min(newWidth, window.innerWidth - 400));
        
        leftPanel.style.width = newWidth + 'px';
        createGridBackdrop(); // Update grid when resizing
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = '';
        }
    });
});