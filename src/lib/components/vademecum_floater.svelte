<script>
    import { onMount, onDestroy } from "svelte";
    import { highestZIndex, isMobileDevice } from '$lib/stores/globalStores';
    // interact will be imported dynamically in onMount
    import { slide } from 'svelte/transition';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';

    export let randomPosition;
    export let title;
    export let fileRef;
    export let img;
    export let type;

    let floaterElement;
    let interactRef;
    let isDownloaded = writable(false); 
    let downloadTimeout;
    let isDragging = false; 
    let svgFill = writable("#FFFFFF");

    const downloadFile = (e) => {
        if ($isDownloaded || isDragging) return;

        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }

        //console.log("Starting download…");

        /* ---- Extract filename for reuse ---- */
        const filePath = fileRef.split("/").pop();
        const fileExt = filePath.split(".").pop().toLowerCase();

        /* ---- GA4 event ---- */
        if (typeof gtag === "function") {

            gtag("event", "file_download", {          // GA4’s standard event name
            file_name: filePath,                    // recommended parameter
            file_extension: fileExt,                // recommended parameter
            value: 1,                               // optional metric
            debug_mode: true                        // remove when done testing
            });
        } else {
            console.log("Google Analytics not available");
        }

        /* ---- start the actual download ---- */
        const link = document.createElement("a");
        link.href = fileRef;
        link.download = filePath;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        /* ---- UI state handling ---- */
        $isDownloaded = true;
        if (downloadTimeout) clearTimeout(downloadTimeout);
        downloadTimeout = setTimeout(() => { $isDownloaded = false; }, 6000);
    };

    const navigateTo = (e) => {
        if (isDragging) return;
        
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (fileRef) {
            goto(fileRef);
        }
    };

    const handleInteraction = (e) => {
        if (type === 'navigator') {
            navigateTo(e);
        } else if (type === 'download') {
            downloadFile(e);
        }
    }

    // Simplified KeyDown Handler
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
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

            // Get viewport size
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const paddingTop = 0;
            const paddingRight = 30; // Ensure consistent padding use
            const paddingBottom = 10; // Added bottom padding
            const paddingLeft = 10; // Added left padding

            // Get current transform values
            const currentX = parseFloat(floaterElement.getAttribute('data-x')) || 0;
            const currentY = parseFloat(floaterElement.getAttribute('data-y')) || 0;

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

            animationFrame = requestAnimationFrame(animateFloating);
        };

        // Ensure animationFrame is null before starting a new one
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        animationFrame = requestAnimationFrame(animateFloating);
    };

    onMount( async () => {
        const interact = (await import('interactjs')).default;
        interactRef = interact;
        if (floaterElement) {
            // Apply initial position from prop first
            let initialX = parseFloat(randomPosition.left) || 0;
            let initialY = parseFloat(randomPosition.top) || 0;

            // Get viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Define padding from viewport edges
            const padding = 30; // Adjust as needed

            // Clamp initial position
            initialX = Math.max(padding, Math.min(initialX, viewportWidth - padding));
            initialY = Math.max(padding, Math.min(initialY, viewportHeight - padding));

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
            
            setTimeout(() => {
                if (floaterElement) {
                    floaterElement.style.opacity = '1';
                }
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
                        isDragging = true;
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
                        
                        // Add a small delay before allowing clicks again to prevent accidental clicks after drag
                        setTimeout(() => {
                            isDragging = false;
                        }, 100);
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

        await $isMobileDevice;
        //console.log($isMobileDevice)

        if ($isMobileDevice) {
            $svgFill = "#000000";
        } else {
            $svgFill = "#FFFFFF";
        }

        //console.log($svgFill)
    });

    onDestroy(() => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null; // Ensure it's nullified
        }
        if (interactRef && floaterElement) {
            try {
                 interactRef(floaterElement).unset();
            } catch (e) {
                console.log("Could not cleanup vademecum floater interact handler", e);
            }
        }
        // Clear any pending timeout
        if (downloadTimeout) clearTimeout(downloadTimeout);
    });
</script>

{#if !$isMobileDevice}
<button 
    class="custom-floater-container"
    bind:this={floaterElement}
    style="top: {randomPosition.top};
        left: {randomPosition.left};
        z-index: {randomPosition.zIndex || $highestZIndex};"
    on:mousedown={bringToFront}
    on:click={(e) => handleInteraction(e)}
    on:keydown={handleKeyDown}
    aria-label="Draggable vademecum download button">

    <div class="vademecum-image-container">
        <enhanced:img src={img} alt="Vademecum cover" class="vademecum-image" />
    </div>

    {#if type === 'download'}
    <div 
        class="custom-floater-bottom"
        class:downloaded={$isDownloaded}
    >
        <span class="custom-floater-text" style="font-weight: 600;">
            {$isDownloaded ? "PDF DOWNLOADED" : title}
        </span>

        <span class="custom-floater-text-absolute" style="font-weight: 600;">
            {$isDownloaded ? "PDF DOWNLOADED" : title}
        </span>

        <div class="category-icon">
            <!-- Custom icon SVG -->
            {#if !$isDownloaded}
                <!-- Download Icon -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill={$svgFill}
                    in:slide={{ axis: 'y', y: -20, duration: 200 }}
                    out:slide={{ axis: 'y', y: 20, duration: 150 }}>
                    <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
                </svg>
            {:else}
                <!-- Checkmark Icon -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill={$svgFill}
                    in:slide={{ axis: 'y', y: -20, duration: 300, delay: 50 }}
                    out:slide={{ axis: 'y', y: 20, duration: 150 }}>
                    <path d="M382-320 155-547l57-57 170 170 366-366 57 57-423 423ZM200-160v-80h560v80H200Z"/>
                </svg>
            {/if}
        </div>
    
    </div>
    {:else if type === 'navigator'}
    <div 
        class="custom-floater-bottom"
    >

        <span class="custom-floater-text" style="font-weight: 600;">
            {title}
        </span>

        <span class="custom-floater-text-absolute" style="font-weight: 600;">
            {title}
        </span>

        <div class="category-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill={$svgFill}><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>
        </div>
    
    </div>
    {/if}
</button>
{/if}
{#if $isMobileDevice}

<div class="mobile_button_container">
    <button class="mobile_vd_container"
        on:click={(e) => downloadFile(e)}
        on:keydown={handleKeyDown}
        aria-label="Mobile vademecum download button"
        style="{!$isDownloaded ? 'background-color: #f0f0f0;' : 'background-color: #2ecc71 !important;'}">
        <p class="p3" style="font-weight: 700;">GET THE PDF</p>
        <div class="category-icon">
            <!-- Custom icon SVG -->
            {#if !$isDownloaded}
                <!-- Download Icon -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill={$svgFill}
                    in:slide={{ axis: 'y', y: -20, duration: 200 }}
                    out:slide={{ axis: 'y', y: 20, duration: 150 }}>
                    <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
                </svg>
            {:else}
                <!-- Checkmark Icon -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill={$svgFill}
                    in:slide={{ axis: 'y', y: -20, duration: 300, delay: 50 }}
                    out:slide={{ axis: 'y', y: 20, duration: 150 }}>
                    <path d="M382-320 155-547l57-57 170 170 366-366 57 57-423 423ZM200-160v-80h560v80H200Z"/>
                </svg>
            {/if}
        </div>
    </button>
    <button class="mobile_vd_container"
        on:click={(e) => navigateTo(e)}
        on:keydown={handleKeyDown}
        aria-label="Mobile vademecum download button"
        style="{!$isDownloaded ? 'background-color: #f0f0f0;' : 'background-color: #2ecc71 !important;'}">
        <p class="p3" style="font-weight: 700;">TEDIUM</p>
        <div class="category-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill={$svgFill}><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>
        </div>
    </button>
</div>


{/if}

<style>

    

    .mobile_vd_container {
        display: none;
    }    

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
        overflow: hidden;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        max-width: 300px;
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px); /* Safari support */
    }

    picture {
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100%;
        height: 100%;
    }

    .custom-floater-bottom {
        width: 250px;
        height: fit-content;
        display: flex;
        padding: var(--spacing-S) var(--spacing-M);
        justify-content: center;
        align-items: center;
        gap: 10px;
        background-color: #FF4444 !important;
        color: white;
        border: dashed 1px white;
        line-height: 1.2;
        z-index: 4;
        position: relative;
        overflow: hidden;
        transition: transform 1s ease-out, background-color 1s ease, filter 1s ease;
        border-radius: 2px;
    }

    .vademecum-image {
        width: 100%;
        height: auto;
        object-fit: contain;
        place-content: center;
        align-items: center;
    }

    .vademecum-image-container {
        width: auto;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        border: dashed 1px white;
        overflow: hidden;
        border-radius: 2px;
        max-width: 250px;
        transition: transform 1s ease-out, background-color 1s ease, filter 1s ease;
        transform-origin: bottom;
    }

    .custom-floater-container:active > .vademecum-image-container {
        transform: scale(0.97);
        transition: transform 0.1s ease-in-out;
        filter: brightness(0.9);
        transform-origin: bottom;
    }

    .custom-floater-container:active > .custom-floater-bottom {
        transform: scale(0.97);
        transition: transform 0.1s ease-in-out;
        filter: brightness(0.9);
        transform-origin: top;
    }


    .custom-floater-bottom.downloaded {
        background-color: #2ecc71 !important;
        transition: background-color 0.8s ease-in-out;
    }

    .category-icon {
        display: block;
        width: 20px;
        height: 20px;
        appearance: none;
        line-height: inherit;
        border: none;
        text-align: inherit;
        background-color: transparent;
        padding: 0;
        flex-shrink: 0;
        z-index: 7;
        position: relative;
    }

    .category-icon > svg {
        display: block;
    }

    .custom-floater-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.875em;
        padding-left: var(--spacing-S);
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
        z-index: 6;
        position: relative;
        color: white;
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
        z-index: 6;
        color: white;
    }

    /* Mobile display none to match other floaters */
    @media (max-width: 768px) {
        .custom-floater-container {
            display: none;
        }

        .mobile_button_container {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: fit-content;
            padding-bottom: var(--spacing-S);
            padding-right: var(--spacing-L);
            padding-left: var(--spacing-L);
            column-gap: var(--spacing-S);
        }

        .mobile_vd_container {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 50%;
            height: auto;
            pointer-events:visible;
            user-select: none;
            touch-action: none;
            transition: transform 0.135s ease-in-out, background-color 0.835s ease-in;
            transform-origin: left center !important;
            position: static;
            column-gap: var(--spacing-S);
        } 

        .mobile_vd_container > .p3 {
            hyphens: none;
            overflow: hidden;
        }

        :global(.mobile_vd_container:active) {
            transform: scale(0.95) translateX(-50%) !important;
            transition: transform 0.135s ease-in-out, background-color 0.135s ease-out;
            transform-origin: left center !important;
            background-color: #79e3a5 !important;
        }
    }
</style> 