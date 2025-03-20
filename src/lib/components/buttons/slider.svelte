<script>
    import { isAlterEgoMode } from '$lib/stores/alterEgoStore';
    export let switch_alterego;
    export let pillBgColor;
</script>

<div class="slider_container">
    <button 
        class="slider-button first {$isAlterEgoMode ? 'active' : ''}" 
        on:click={switch_alterego}
        disabled={$isAlterEgoMode}
        style="pointer-events: {$isAlterEgoMode ? 'none' : 'auto'};"
    >
        <p class="p3">Project</p>
    </button>
    <button 
        class="slider-button second {!$isAlterEgoMode ? 'active' : ''}" 
        on:click={switch_alterego}
        disabled={!$isAlterEgoMode}
        style="pointer-events: {!$isAlterEgoMode ? 'none' : 'auto'};"
    >
        <p class="p3" style="padding-left: 12%;">Exercises</p>
    </button>
    <div class="background_slider {$isAlterEgoMode ? 'project' : 'exercises'}
    " style="background-color: {!$isAlterEgoMode ? pillBgColor : 'black'};">
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
        transform: translateX(-50%);
        background-color: #f0f0f0;
        border-radius: 50px;
        padding: 5px;
        width: fit-content;

        border: solid 1px black;    
        z-index: 500;
    }

    .slider-button {
        position: relative;
        z-index: 2;
        padding: 10px 24px;
        border: none;
        background: transparent;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 50px;
        color: #333;
        transition: color var(--transition-times) var(--transition-curve);
    }

    .first {
        position: relative;
        z-index: 2;
        padding: 10px 24px;
        border: none;
        background: transparent;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 50px;
        color: #333;
        transition: color var(--transition-times) var(--transition-curve);
    }

    .second {
        position: relative;
        z-index: 2;
        padding: 10px 24px;
        border: none;
        background: transparent;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 50px;
        color: #333;
        transition: color var(--transition-times) var(--transition-curve);
    }

    .slider-button.first.active {
        color: white;
        transition: color var(--transition-times) var(--transition-curve);
    }

    .slider-button.second.active {
        color: black;
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
        
        border-radius: 50px;
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
</style>