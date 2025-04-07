<script>
    import { selectedCard, isAlterEgoMode } from '$lib/stores/globalStores';
    // This prop might not be needed if bringToFront is handled solely by drag interactions
    export let bringToFront; 

    // Called via on:transitionend after the slide animation
    function handleTransitionEnd(event) {
        // Ensure we only act on the transform transition ending
        if (event.target && event.propertyName === 'transform') {

            event.target.style.transition = 'none';
        }
    }

    // Called right before changing the class to trigger the slide animation
    function enableSlideTransition(boxElement) {
        if (boxElement) {
            boxElement.style.transition = 'transform var(--transition-times) var(--transition-curve)';
        }
    }

    // This is the main logic, run whenever $isAlterEgoMode changes
    function updateBoxVisibility(boxElement, shouldBeVisible) {
        if (!boxElement) return;

        // Reset inline transform from dragging
        boxElement.style.transform = '';

        // Reset Interact.js data attributes ONLY when sliding OUT (becoming not visible)
        if (!shouldBeVisible) {
            boxElement.setAttribute('data-x', '0');
            boxElement.setAttribute('data-y', '0');
            // console.log(`Resetting position for ${boxElement.className}`); // Optional: for debugging
        }

        // Enable the slide transition before changing the class
        enableSlideTransition(boxElement);

        // Add/remove the 'closed' class to trigger animation
        if (shouldBeVisible) {
            boxElement.classList.remove('closed');
        } else {
            boxElement.classList.add('closed');
        }
    }

    // Reactive statement: watch for changes in alter ego mode
    $: if (typeof $isAlterEgoMode === 'boolean') { // Ensure it's initialized
        const boxes = document.querySelectorAll('.text-box-dx, .text-box-sx');
        // Update visibility based on the current mode (visible when true)
        boxes.forEach(box => updateBoxVisibility(box, $isAlterEgoMode));
    }
</script>

<button
    class="text-box-dx"
    data-x="0" 
    data-y="0" 
    class:closed={!$isAlterEgoMode} 
    on:transitionend={handleTransitionEnd}
    on:click={bringToFront} 
>
    <p class="p3">
        "The Ecologies of LLM Practices (EL2MP) project documents the role <br>of Large Language Models (LLMs) in various professional practice(s)<br> and the consequences of their use."
    </p>
</button>

<button
    class="text-box-sx"
    data-x="0" 
    data-y="0" 
    class:closed={!$isAlterEgoMode}
    on:transitionend={handleTransitionEnd}
    on:click={bringToFront}
>
    <p class="p2">
        "How can we reframe the role <br> of LLMs in ordinary work practices?"
    </p>
</button>

<style>
    .text-box-dx,
    .text-box-sx {
        /* Base styles */
        background-color: white;
        border: 1px solid black;
        border-radius: 1px;
        padding: var(--spacing-S);
        width: fit-content;
        box-sizing: border-box;
        position: absolute; 
        z-index: 5;
        user-select: none;
        
        /* Default visual state: open/visible */
        transform: translateX(0); 
        /* Start with transitions disabled; JS enables for sliding */
        transition: none; 
        text-align: left; 
    }

    .text-box-dx {
        bottom: 7vh; 
        right: 2vw;
        text-align: right; 
    }

    .text-box-sx {
        top: 2vw; 
        left: 2vw; 
    }

    @media (max-width: 768px) {
        .text-box-dx,
        .text-box-sx {
            display: none;
        }
    }

    /* State when closed (slid out) */
    :global(.text-box-sx.closed) {
        transform: translateX(-120%);
    }

    :global(.text-box-dx.closed) {
        transform: translateX(120%);
    }

    /* Styles for when being dragged (optional, cursor handled by JS) */
    .text-box-sx:focus,
    .text-box-dx:focus {
        cursor: grabbing;
    }

    p {
        margin: 0;
        line-height: 1.5;
        max-width: 60ch;
    }
</style>


