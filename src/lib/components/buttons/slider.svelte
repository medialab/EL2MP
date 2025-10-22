<script>
    import { selectedCard, isAlterEgoMode, currentCardColor, currentFocus } from '$lib/stores/globalStores';
    
    const handleProjectClick = () => {
        $isAlterEgoMode = true;
        $currentFocus = '';
        window.location.hash = $currentFocus;
    };
</script>

<div class="slider_container">
    <button 
        class="slider-button first {$isAlterEgoMode ? 'active' : ''}" 
        onclick={handleProjectClick}
        disabled={$isAlterEgoMode}
        style="pointer-events: {$isAlterEgoMode ? 'none' : 'auto'};"
    >
        <p class="p3">Project</p>
    </button>
    <button 
        class="slider-button second {!$isAlterEgoMode ? 'active' : ''}" 
        onclick={() => $isAlterEgoMode = false}
        disabled={!$isAlterEgoMode}
        style="pointer-events: {!$isAlterEgoMode ? 'none' : 'auto'};"
    >
        <p class="p3">Exercises</p>
    </button>
    <div class="background_slider {$isAlterEgoMode ? 'project' : 'exercises'}
    " style="background-color: {!$isAlterEgoMode ? $currentCardColor : 'black'};">
    </div>
</div>

<style>
    
    .slider_container {
        /* Vendor-prefixed flexbox fallbacks */
        display: -webkit-box;      /* OLD - iOS < 7.1, Android < 4.4 */
        display: -ms-flexbox;      /* IE 10 */
        display: flex;
        flex-direction: row;
        align-items: center;
        -webkit-box-align: center; /* OLD spec */
        -ms-flex-align: center;
        justify-content: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        position: fixed;
        top: 1vh;
        left: 50%;
        /* Cross-browser transform */
        -webkit-transform: translateX(-50%) scale(1);
        -ms-transform: translateX(-50%) scale(1);
        transform: translateX(-50%) scale(1);
        background-color: #f0f0f0;
        border-radius: var(--slider-radius);
        padding: 0.2vw;
        /* fit-content fallbacks */
        width: -moz-fit-content;
        width: -webkit-fit-content;
        width: fit-content;

        border: solid 1px black;    
        z-index: 350;
        /* Disallow text selection across engines */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none;    /* Firefox */
        -ms-user-select: none;     /* IE10+/Edge */
        user-select: none;

        /* Transition fallbacks */
        -webkit-transition: all 0.35s ease-in-out;
        -moz-transition: all 0.35s ease-in-out;
        transition: all 0.35s ease-in-out;

        /* one source of truth */
        --slider-radius: 4vw;
    }

    /* When any button is pressed, slightly scale the whole slider */
    .slider_container.scaled {
        -webkit-transform: translateX(-50%) scale(0.98);
        -ms-transform: translateX(-50%) scale(0.98);
        transform: translateX(-50%) scale(0.98);
        -webkit-transition: all 0.35s ease-in-out;
        -moz-transition: all 0.35s ease-in-out;
        transition: all 0.35s ease-in-out;
    }

    .slider_container:hover {
        /* Cross-browser box-shadow */
        -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
        -webkit-transition: box-shadow 0.35s ease-in-out;
        -moz-transition: box-shadow 0.35s ease-in-out;
        transition: box-shadow 0.35s ease-in-out;
    }

    .slider-button {
        position: relative;
        z-index: 2;
        padding: 0.5vw 1.40vw;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: var(--slider-radius);
        color: #333;
        -webkit-transition: color var(--transition-times) var(--transition-curve),
                            -webkit-transform 0.4s ease-in-out;
        -moz-transition: color var(--transition-times) var(--transition-curve),
                         transform 0.4s ease-in-out;
        transition: color var(--transition-times) var(--transition-curve),
                    transform 0.4s ease-in-out;
        width: 50%;
    }

    .slider-button:hover > p {
        -webkit-transform: scale(1.02);
        -ms-transform: scale(1.02);
        transform: scale(1.02);
        -webkit-transition: -webkit-transform 0.4s ease-in-out;
        -moz-transition: transform 0.4s ease-in-out;
        transition: transform 0.4s ease-in-out;
    }

    .first {
        color: white;
        mix-blend-mode: difference;
    }

    .second {
       padding-right: 2vw;
    }

    .slider-button.first:disabled,
    .slider-button.second:disabled {
        cursor: default;
    }

    .background_slider {
        position: absolute;
        width: 50%;
        height: 100%;
        z-index: 1;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%) scaleX(0.95) scaleY(0.9);
        -ms-transform: translate(-50%, -50%) scaleX(0.95) scaleY(0.9);
        transform: translate(-50%, -50%) scaleX(0.95) scaleY(0.9);
        background-color: black;
        
        border-radius: inherit;
        border: solid 1px black;
        margin: 0px;
        
        -webkit-transition: all calc(var(--transition-times)) var(--transition-curve);
        -moz-transition: all calc(var(--transition-times)) var(--transition-curve);
        transition: all calc(var(--transition-times)) var(--transition-curve);
    }

    .background_slider.project {
        -webkit-transform: translate(-100%, -50%) scaleX(0.95) scaleY(0.9);
        -ms-transform: translate(-100%, -50%) scaleX(0.95) scaleY(0.9);
        transform: translate(-100%, -50%) scaleX(0.95) scaleY(0.9);
    }

    .background_slider.exercises {
        -webkit-transform: translate(0%, -50%) scaleX(0.95) scaleY(0.9);
        -ms-transform: translate(0%, -50%) scaleX(0.95) scaleY(0.9);
        transform: translate(0%, -50%) scaleX(0.95) scaleY(0.9);
    }

    @media (max-width: 768px) {
        .slider_container {
            padding: 0px;
            width: 200px;
            height: 40px;
            border-radius: var(--slider-radius);
            
            left: 20px;
            transform: translateX(0%) scale(1);
        }

        .slider_container:hover {
            -webkit-box-shadow: none;
            box-shadow: none;
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
            border-radius: calc(var(--slider-radius) * 0.9);
        }

        .background_slider.project {
            -webkit-transform: translate(-100%, -50%) scaleX(0.95) scaleY(0.9);
            -ms-transform: translate(-100%, -50%) scaleX(0.95) scaleY(0.9);
            transform: translate(-100%, -50%) scaleX(0.95) scaleY(0.9);
        }

        .background_slider.exercises {
            -webkit-transform: translate(0%, -50%) scaleX(0.95) scaleY(0.9);
            -ms-transform: translate(0%, -50%) scaleX(0.95) scaleY(0.9);
            transform: translate(0%, -50%) scaleX(0.95) scaleY(0.9);
        }

        .p3 {
            font-size: 14px;
            margin: 0;
            padding: 0;
        }
    }
</style>