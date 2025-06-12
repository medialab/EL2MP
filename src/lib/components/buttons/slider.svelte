<script>
    import { selectedCard, isAlterEgoMode, currentCardColor } from '$lib/stores/globalStores';
    export let switch_alterego;

    // State used to add a pressed feedback on the whole slider
    let isPressed = false;

    // Helpers to toggle the pressed state for both mouse and touch interactions
    const handlePointerDown = () => (isPressed = true);
    const handlePointerUp = () => (isPressed = false);
</script>

<div class="slider_container {isPressed ? 'scaled' : ''}">
    <button 
        class="slider-button first {$isAlterEgoMode ? 'active' : ''}" 
        on:click={switch_alterego}
        disabled={$isAlterEgoMode}
        style="pointer-events: {$isAlterEgoMode ? 'none' : 'auto'};"
        on:mousedown={handlePointerDown}
        on:mouseup={handlePointerUp}
        on:mouseleave={handlePointerUp}
        on:touchstart={handlePointerDown}
        on:touchend={handlePointerUp}
    >
        <p class="p3">Project</p>
    </button>
    <button 
        class="slider-button second {!$isAlterEgoMode ? 'active' : ''}" 
        on:click={switch_alterego}
        disabled={!$isAlterEgoMode}
        style="pointer-events: {!$isAlterEgoMode ? 'none' : 'auto'};"
        on:mousedown={handlePointerDown}
        on:mouseup={handlePointerUp}
        on:mouseleave={handlePointerUp}
        on:touchstart={handlePointerDown}
        on:touchend={handlePointerUp}
    >
        <p class="p3" style="padding-left: 12%;">Exercises</p>
    </button>
    <div class="background_slider {$isAlterEgoMode ? 'project' : 'exercises'}
    " style="background-color: {!$isAlterEgoMode ? $currentCardColor : 'black'};">
    </div>
</div>

<style>
    
    .slider_container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 1vh;
        left: 50%;
        transform: translateX(-50%) scale(1);
        background-color: #f0f0f0;
        border-radius: 10vw;
        padding: 0.2vw;
        width: fit-content;

        border: solid 0.05vw black;    
        z-index: 500;
        user-select: none;

        /* Smooth animation for the pressed feedback */
        transition: all 0.35s ease-in-out;
    }

    /* When any button is pressed, slightly scale the whole slider */
    .slider_container.scaled {
        transform: translateX(-50%) scale(0.98);
        transition: all 0.35s ease-in-out;
    }

    .slider_container:hover {
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
        transition: box-shadow 0.35s ease-in-out;
    }

    .slider-button {
        position: relative;
        z-index: 2;
        padding: 0.5vw 1.25vw;
        border: none;
        background: transparent;
        font-size: 0.94vw;
        font-weight: 600;
        cursor: pointer;
        border-radius: 10vw;
        color: #333;
        transition: color var(--transition-times) var(--transition-curve);
        transition: transform 0.4s ease-in-out;
    }

    .slider-button:hover > p {
        transform: scale(1.02);
        transition: transform 0.4s ease-in-out;
    }

    .first {
        position: relative;
        z-index: 2;
        padding: 0.52vw 1.25vw;
        border: none;
        background: transparent;
        font-size: 0.94vw;
        font-weight: 600;
        cursor: pointer;
        border-radius: 10vw;
        color: white;
        mix-blend-mode: difference;
        transition: color var(--transition-times) var(--transition-curve);
    }

    .second {
        position: relative;
        z-index: 2;
        padding: 0.32vw 1.5vw;
        border: none;
        background: transparent;
        font-size: 0.94vw;
        font-weight: 600;
        cursor: pointer;
        border-radius: 10vw;
        color: #333;
        transition: color var(--transition-times) var(--transition-curve);
    }

    .slider-button.first:disabled,
    .slider-button.second:disabled {
        cursor: default;
    }

    .background_slider {
        position: absolute;
        width: 50%;
        max-width: 100%;
        height: 100%;
        z-index: 1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scaleX(0.95) scaleY(0.9);
        background-color: black;
        
        border-radius: 10vw;
        border: solid 1px black;
        margin: 0px;
        
        transition: all calc(var(--transition-times) * 1.5) var(--transition-curve);
    }

    .background_slider.project {
        transform: translate(-100%, -50%) scaleX(0.95) scaleY(0.9);
    }

    .background_slider.exercises {
        transform: translate(0%, -50%) scaleX(0.95) scaleY(0.9);
    }

    @media (max-width: 768px) {

        .slider_container {
            padding: 4px;
            width: 200px;
            height: 48px;
            border-radius: 24px;
        }

        .slider-button {
            padding: 0;
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .first {
            padding: 0;
            font-size: 14px;
        }

        .second {
            padding: 0;
            font-size: 14px;
        }

        .background_slider {
            width: 50%;
            height: 100%;
            border-radius: 20px;
        }

        .background_slider.project {
            transform: translate(-100%, -50%) scaleX(0.95) scaleY(0.9);
        }

        .background_slider.exercises {
            transform: translate(0%, -50%) scaleX(0.95) scaleY(0.9);
        }

        .p3 {
            font-size: 14px;
            margin: 0;
            padding: 0;
        }
    }
</style>