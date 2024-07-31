document.addEventListener('DOMContentLoaded', () => {
    // Check for the presence of the target element periodically
    const intervalId = setInterval(() => {
        const targetElement = document.querySelector(".quick-input-widget");
        if (targetElement) {
            // Set up an observer to monitor attribute changes
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        if (targetElement.style.display === 'none') {
                            closeOverlay();
                        } else {
                            // If targetElement is in the DOM but visible, run the custom script
                            applyOverlay();
                        }
                    }
                });
            });

            observer.observe(targetElement, { attributes: true });

            // Stop checking once the observer is set up
            clearInterval(intervalId);
        } else {
            console.log("Target element not found. Rechecking...");
        }
    }, 500); // Interval for checking

    // Listen for keydown events to trigger actions
    document.addEventListener('keydown', event => {
        if ((event.metaKey || event.ctrlKey) && event.key === 'p') {
            event.preventDefault();
            applyOverlay();
        } else if (event.key === 'Escape' || event.key === 'Esc') {
            event.preventDefault();
            closeOverlay();
        }
    });

    // Listen for the escape key at the document level to remove the overlay
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            closeOverlay();
        }
    }, true);

    function applyOverlay() {
        const workspaceElement = document.querySelector(".monaco-workbench");

        // Remove existing overlay if present
        const existingOverlay = document.getElementById("overlay-blur");
        if (existingOverlay) {
            existingOverlay.remove();
        }

        // Create and configure the new overlay element
        const overlay = document.createElement("div");
        overlay.setAttribute('id', 'overlay-blur');

        overlay.addEventListener('click', () => {
            overlay.remove();
        });

        // Append the new overlay to the workspace element
        workspaceElement.appendChild(overlay);
    }

    function closeOverlay() {
        // Logic to remove the overlay
        const overlay = document.getElementById("overlay-blur");
        if (overlay) {
            overlay.click();
        }
    }
});
