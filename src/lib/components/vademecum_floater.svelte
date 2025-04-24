<script>
    import { onMount, onDestroy } from "svelte";
    import { highestZIndex, selectedCard } from '$lib/stores/globalStores';
    import interact from 'interactjs';

    export let randomPosition;

    let floaterElement;
    let interactRef;

    // State for download interaction
    let isPressing = false;
    let pressStartTime = 0;
    let progressInterval = null;
    let progress = 0; // 0 to 100
    let buttonText = "DOWNLOAD THE VADEMECUM!";
    const HOLD_DURATION = 2000; // 2 seconds
    const VADEMECUM_PATH = 'Vademecum.pdf'; // <<< --- CONFIRM THIS PATH

    const downloadFile = () => {
        console.log("Starting download...");
        const link = document.createElement('a');
        link.href = VADEMECUM_PATH;
        link.download = VADEMECUM_PATH.split('/').pop() || 'vademecum.pdf'; // Suggest filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        progress = 0; // Reset progress bar
    };

    const startPress = () => {
        isPressing = true;
        pressStartTime = Date.now();
        progress = 0;
        
        // Use a smaller interval for smoother updates
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            const elapsedTime = Date.now() - pressStartTime;
            // Make the easing much more subtle
            const progressPercent = (elapsedTime / HOLD_DURATION);
           
            progress = Math.min(100, 100 * progressPercent * (1.1 - 0.03 * progressPercent));
            
            if (elapsedTime >= HOLD_DURATION) {
                clearInterval(progressInterval);
                progressInterval = null;
                // Optional: trigger download immediately upon reaching 100%
                // downloadFile(); 
            }
        }, 10); // More frequent updates: 10ms instead of 16ms
    };

    const endPress = () => {
        if (!isPressing) return;
        
        clearInterval(progressInterval);
        progressInterval = null;
        const pressDuration = Date.now() - pressStartTime;

        if (pressDuration >= HOLD_DURATION) {
            downloadFile();
        } else {
            // Reset if hold was too short
             progress = 0;
        }
        isPressing = false;
    };

    const cancelPress = () => {
        if (!isPressing) return;
        clearInterval(progressInterval);
        progressInterval = null;
        isPressing = false;
        progress = 0;
    };

    // Modified KeyDown Handler
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            // For accessibility, trigger download directly on key press
            downloadFile(); 
        }
    };

    const bringToFront = () => {
        $highestZIndex += 1;
        if (floaterElement) {
            floaterElement.style.zIndex = $highestZIndex;
        }
    };

    // Floating animation variables
    let floatX = 0;
    let floatY = 0;
    let directionX = Math.random() > 0.5 ? 1 : -1;
    let directionY = Math.random() > 0.5 ? 1 : -1;
    let animationFrame;

    const startFloatingAnimation = () => {
        const floatingSpeedBase = 0.0000001 + Math.random() * 0.0001;
        const oscillationFrequency = 0.001;
        const sineOffset = Math.random() * 2 * Math.PI;

        const animateFloating = () => {
            const time = Date.now();

            // Calculate oscillating speed
            const floatingSpeed = floatingSpeedBase * (1 + Math.sin(time * oscillationFrequency + sineOffset));

            const directionalOscillationX = Math.sin(time * 0.0001);
            const directionalOscillationY = Math.cos(time * 0.0001);

            // Update floating positions
            floatX += directionX * floatingSpeed * directionalOscillationX;
            floatY += directionY * floatingSpeed * directionalOscillationY;

            if (!floaterElement || !floaterElement.parentNode) { // Check if element still exists and is in DOM
                if (animationFrame) cancelAnimationFrame(animationFrame);
                animationFrame = null;
                return;
            }

            // Get floater dimensions and viewport size
            const floaterRect = floaterElement.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const paddingTop = 0;
            const paddingRight = 30; // Ensure consistent padding use
            const paddingBottom = 10; // Added bottom padding
            const paddingLeft = 10; // Added left padding


            // Get current transform values
            const currentX = parseFloat(floaterElement.getAttribute('data-x')) || 0;
            const currentY = parseFloat(floaterElement.getAttribute('data-y')) || 0;

            // Calculate next potential position including transform and float offsets
            const nextX = currentX + floatX;
            const nextY = currentY + floatY;

            // Use getBoundingClientRect for accurate position checking relative to viewport
            const currentRect = floaterElement.getBoundingClientRect();
            const nextLeft = currentRect.left + floatX;
            const nextRight = currentRect.right + floatX;
            const nextTop = currentRect.top + floatY;
            const nextBottom = currentRect.bottom + floatY;


            // Left and right boundaries check using next calculated position
            if (nextLeft < paddingLeft || nextRight > viewportWidth - paddingRight) {
                directionX *= -1;
                floatX = 0; // Reset float offset on collision to prevent sticking
            }

            // Top and bottom boundaries check using next calculated position
            if (nextTop < paddingTop || nextBottom > viewportHeight - paddingBottom) {
                directionY *= -1;
                floatY = 0; // Reset float offset on collision
            }

            // Apply potentially adjusted floating transform
            const finalX = currentX + floatX;
            const finalY = currentY + floatY;
            floaterElement.style.transform = `translate(${finalX}px, ${finalY}px)`;

            // Store updated base coordinates (without float offset for next frame calculation)
            // We only update data-x/data-y during drag, animation applies transform on top of these
            // This needs correction: data-x/data-y should store the total translated position
            // Let's correct this: We update data-x/data-y with the final position including float.
            floaterElement.setAttribute('data-x', finalX);
            floaterElement.setAttribute('data-y', finalY);
            // Reset floatX/Y for the next frame, as they represent the delta for this frame
            // floatX = 0; // <-- This reset was preventing continuous movement
            // floatY = 0; // <-- This reset was preventing continuous movement


            animationFrame = requestAnimationFrame(animateFloating);
        };

        // Ensure animationFrame is null before starting a new one
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        animationFrame = requestAnimationFrame(animateFloating);
    };

    onMount(() => {
        interactRef = interact;
        if (floaterElement) {
            // Apply initial position from prop first
            let initialX = parseFloat(randomPosition.left) || 0;
            let initialY = parseFloat(randomPosition.top) || 0;

            // Get viewport and element dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            // Force redraw to get accurate dimensions if needed, though usually not necessary here
            const floaterRect = floaterElement.getBoundingClientRect();
            const floaterWidth = floaterRect.width;
            const floaterHeight = floaterRect.height;

            // Define padding from viewport edges
            const padding = 30; // Adjust as needed

            // Clamp initial position
            initialX = Math.max(padding, Math.min(initialX, viewportWidth - floaterWidth - padding));
            initialY = Math.max(padding, Math.min(initialY, viewportHeight - floaterHeight - padding));

            // Apply clamped position via transform for consistency with drag/animation
            floaterElement.style.left = '0px'; // Reset direct positioning
            floaterElement.style.top = '0px';  // Reset direct positioning
            floaterElement.style.transform = `translate(${initialX}px, ${initialY}px)`;

            // Store clamped initial position in data attributes
            floaterElement.setAttribute('data-x', initialX);
            floaterElement.setAttribute('data-y', initialY);

            // Set initial z-index
            floaterElement.style.zIndex = randomPosition.zIndex || $highestZIndex;

            // Set initial opacity to 0 (should match CSS)
            floaterElement.style.opacity = '0';
            
            // Fade in after 1 second
            setTimeout(() => {
                floaterElement.style.opacity = '1';
            }, 1000);

            startFloatingAnimation();

            interact(floaterElement).draggable({
                inertia: {
                    resistance: 20,
                    minSpeed: 80,
                    endSpeed: 10,
                    smoothEndDuration: 400,
                },
                listeners: {
                    start(event) {
                        bringToFront();
                        if (animationFrame) { // Check if animation frame exists before cancelling
                            cancelAnimationFrame(animationFrame);
                            animationFrame = null;
                        }
                        event.target.classList.remove("grab");
                        event.target.style.cursor = "grabbing";
                    },
                    move(event) {
                        const x = (parseFloat(floaterElement.getAttribute("data-x")) || 0) + event.dx;
                        const y = (parseFloat(floaterElement.getAttribute("data-y")) || 0) + event.dy;

                        floaterElement.style.transform = `translate(${x}px, ${y}px)`;
                        floaterElement.setAttribute("data-x", x);
                        floaterElement.setAttribute("data-y", y);
                        
                        // Reset float offsets during drag to avoid jump on release
                        floatX = 0;
                        floatY = 0;
                    },
                    end(event) {
                        event.target.classList.remove("grabbing");
                        event.target.style.cursor = "grab";
                         // Reset float offsets before restarting animation
                        floatX = 0;
                        floatY = 0;
                        if (!animationFrame) { // Check before starting to prevent duplicates
                            startFloatingAnimation();
                        }
                    },
                },
                modifiers: [
                    interact.modifiers.restrict({
                        restriction: "parent",
                        endOnly: true,
                    }),
                ],
                inertia: true,
            });
        }
    });

    onDestroy(() => {
        clearInterval(progressInterval); // Cleanup interval on destroy
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
        if (interactRef && floaterElement) {
            try {
                 interactRef(floaterElement).unset();
            } catch (e) {
                console.log("Could not cleanup vademecum floater interact handler", e);
            }
        }
    });
</script>

<div 
    class="custom-floater-container"
    bind:this={floaterElement}
    style="top: {randomPosition.top};
        left: {randomPosition.left};
        z-index: {randomPosition.zIndex || $highestZIndex};"
    on:mousedown={bringToFront}>
    
    <a
        href="#" 
        class="custom-floater-bottom"
        class:pressing={isPressing}
        aria-label="Custom Floater"
        role="button"
        tabindex="0"
        on:mousedown={startPress}
        on:mouseup={endPress}
        on:mouseleave={cancelPress}
        on:touchstart={startPress}
        on:touchend={endPress}
        on:touchcancel={cancelPress}
        on:keydown={handleKeyDown}
        on:click={(e) => e.preventDefault()}
    >
        <span class="custom-floater-text" style="font-weight: 600;">
            {buttonText}
        </span>

        <span class="custom-floater-text-absolute" style="font-weight: 600;">
            {buttonText}
        </span>

        <div class="category-icon" id="custom">
            <!-- Custom icon SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#1f1f1f"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
        </div>

        <!-- Progress Bar -->
        <div class="progress-bar" style="width: {progress}%;"></div>
    </a>
</div>

<style>
    .custom-floater-container {
        width: auto;
        height: auto;
        position: absolute;
        display: flex;
        flex-direction: column;
        opacity: 0;
        will-change: transform, opacity;
        cursor: grab;
        touch-action: none;
        user-select: none;
        transform-origin: top left;
        z-index: 999;
    }

    .custom-floater-bottom {
        width: max-content;
        height: fit-content;
        display: inline-flex;
        padding: var(--spacing-S) var(--spacing-M);
        justify-content: center;
        align-items: center;
        gap: 10px;
        background-color: #FF4444 !important;
        color: white;
        border: dashed 1px black;
        line-height: 1.2;
        z-index: 4;
        position: relative; /* Needed for absolute positioning of progress bar */
        overflow: hidden; /* Hide progress bar overflow */
        transition: transform 0.2s ease-out, background-color 0.3s ease; /* Add transition for transform */
    }

    .custom-floater-bottom:hover {
        transform: scale(1.05);
    }

    /* New pressing state style */
    .custom-floater-bottom.pressing {
        transform: scale(0.95); /* Scale down to 95% of original size */
    }

    /* Modified active state to not conflict */
    .custom-floater-bottom:active:not(.pressing) {
        filter: brightness(0.9);
        transform: scale(0.97);
        transition: transform 0.1s ease-in-out;
    }

    .category-icon {
        display: block;
        width: 20px;
        height: 20px;
        fill: white;
        appearance: none;
        line-height: inherit;
        border: none;
        text-align: inherit;
        background-color: transparent;
        position: static;
        padding: 0;
        flex-shrink: 0;
        z-index: 7; /* Ensure icon is above progress bar */
        position: relative; /* Needed for z-index */
    }



    .category-icon svg {
        fill: white;
    }

    .custom-floater-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.875em;
        padding-left: var(--spacing-S);
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
        z-index: 6; /* Ensure text is above progress bar for blend mode */
        position: relative; /* Needed for z-index */
        color: white; /* Explicitly set text color */
        transform: translateY(0);
        transition: transform 0.6s ease-in-out;

    }

    .custom-floater-bottom:hover .custom-floater-text-absolute {
        transform: translateY(0);
        transition: transform 0.6s ease-in-out;
    }

    .custom-floater-bottom:hover .custom-floater-text {
        transform: translateY(-200%);
        transition: transform 0.6s ease-in-out;

    }

    .custom-floater-text-absolute {
        position: absolute;
        left: calc(var(--spacing-S) * 3);
        transform: translateY(200%);
        transition: transform 0.6s ease-in-out;
        padding-left: 0;
        margin-left: 0;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.875em;
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
        z-index: 6; /* Ensure text is above progress bar for blend mode */
        color: white; /* Explicitly set text color */
    }



    .progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: white;
        mix-blend-mode: difference; /* This will invert colors below it */
        transition: width 0.15s cubic-bezier(0.4, 0.0, 0.2, 1); /* Smoother transition with material design curve */
        pointer-events: none; /* Don't interfere with clicks */
        z-index: 5; /* Above text but below icon potentially */
        will-change: width; /* Hint to browser to optimize this animation */
    }

    /* Mobile display none to match other floaters */
    @media (max-width: 768px) {
        .custom-floater-container {
            display: none;
        }
    }
</style> 