<script>
    //This is floating_card.svelte
    import { onMount } from "svelte";
    import { currentCardColor, selectedCard } from '$lib/stores/globalStores';

    export let data
    export let randomPosition;

    let isClicked = false;

    const addClickedClass = (event) => {
        event.preventDefault();
        if (data.category === 'image' || data.category === 'video' && data.media) {
                    const floaterContainer = event.target.closest('.floater_container');

            if (floaterContainer) {
                if (data.category === 'image' || data.category === 'video')
                    floaterContainer.style.flexDirection = 'column-reverse';

                floaterContainer.classList.add('clicked');
                isClicked = true;
                
            } else {
                console.warn('No floater container found for the clicked element');
            }
        }
    };

    const removeClickedClass = (event) => {
        const floaterContainer = event.target.closest('.floater_container');
        if (floaterContainer) {
            floaterContainer.classList.remove('clicked');
            isClicked = false;
            ////console.log('"clicked" class removed from:', floaterContainer);
        } else {
            console.warn('No floater container found for the clicked element');
        }
    };

    let holdTimeout;
    let isHolding = false;

    const handleMouseDown = () => {
        if (data.category === "document") {
            isHolding = true;

            const floaterContainer = event.target.closest('.floater_container');

            const darkerElement = floaterContainer.querySelector('.darker');

            if (darkerElement) {
                darkerElement.classList.add('open');
            }

            holdTimeout = setTimeout(() => {
                if (isHolding && data.file) {
                    // Trigger file download
                    const anchor = document.createElement('a');
                    anchor.href = data.file;
                    anchor.download = data.Title || 'default-file-name';
                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);

                    //console.log('File downloaded');
                }

                darkerElement.classList.remove('open');
            }, 3000); // 3 seconds

            
        }
    };

    const handleMouseUp = () => {
        isHolding = false;
        clearTimeout(holdTimeout);
        const floaterContainer = event.target.closest('.floater_container');
        
        if (floaterContainer) {
            // Find the .darker element within the scoped floater_container
            const darkerElement = floaterContainer.querySelector('.darker');
            if (darkerElement) {
                // Remove the "open" class to revert the transition
                darkerElement.classList.remove('open');
            }
        }
    };

    const handleKeyDown = (event) => {
        // Trigger click on Enter or Space key press
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            addClickedClass(event);
        }
    };

    onMount(() => {
        //cavoli
    })

</script>

    <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="floater_container closed"
            data-parent={data.parent}
            style="top: {randomPosition.top};
                left: {randomPosition.left};
                z-index: {randomPosition.zIndex};
                animation-delay: {randomPosition.animationDelay};" >
                

            {#if data.media}
                {#if isClicked}
                    <div class="floater_image">
                        {#if data.category === 'image'}
                            <enhanced:img src={data.media} alt="{data.Title} image"/>
                        {:else if data.category === 'video'}
                            <video autoplay muted loop playsinline>
                                <source src={data.media} type="video/mp4" />
                                Damn, it seems that your browser doesn't support this video tag.
                            </video>
                        {/if}
                    </div>

                <button
                        class="closer_container"
                        style="background-color: {$currentCardColor}"
                        on:click={removeClickedClass}
                        aria-label="Close"
                        tabindex="0"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m256-236-20-20 224-224-224-224 20-20 224 224 224-224 20 20-224 224 224 224-20 20-224-224-224 224Z"/></svg>
                </button>
                {/if}
            {/if}
            
            <a
                href="#" 
                class="floater_bottom"
                style="background-color: {$currentCardColor}"
                aria-label="Close"
                role="button"
                tabindex="0"
                on:click={addClickedClass}
                on:keydown={handleKeyDown}

                on:mousedown={handleMouseDown}
                on:mouseup={handleMouseUp}
                on:mouseleave={handleMouseUp}
            
                >

                {#if data.category === 'document'}
                    <div
                        class="category_icon"
                        id="document"
                        
                        href={data.file || data.href || undefined}
                        download={data.file ? data.Title : undefined}>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M330-250h300v-60H330v60Zm0-160h300v-60H330v60Zm-77.69 310Q222-100 201-121q-21-21-21-51.31v-615.38Q180-818 201-839q21-21 51.31-21H570l210 210v477.69Q780-142 759-121q-21 21-51.31 21H252.31ZM540-620v-180H252.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v615.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-620H540ZM240-800v180-180V-160v-640Z"/></svg>
                    </div>

                    <div class="darker">

                    </div>

                    {:else if data.category === 'image'}
                        <div class="category_icon" id="image">
                            <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 -960 960 960"><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM270-290h423.07L561.54-465.38 449.23-319.23l-80-102.31L270-290Zm-70 90v-560 560Z"/></svg>
                        </div>

                    

                    {:else if data.category === 'video'}
                        <div class="category_icon" id="video">
                            <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 -960 960 960"><path d="m172.31-780 70 140h120l-70-140h80l70 140h120l-70-140h80l70 140h120l-70-140h95.38Q818-780 839-759q21 21 21 51.31v455.38Q860-222 839-201q-21 21-51.31 21H172.31Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21ZM160-580v327.69q0 5.39 3.46 8.85t8.85 3.46h615.38q5.39 0 8.85-3.46t3.46-8.85V-580H160Zm0 0v340-340Z"/></svg>
                        </div>

                    {:else if data.category === 'link'}
                    <div class="category_icon" id="video">
                        <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 -960 960 960"><path d="M432.31-298.46H281.54q-75.34 0-128.44-53.1Q100-404.65 100-479.98q0-75.33 53.1-128.44 53.1-53.12 128.44-53.12h150.77v60H281.54q-50.39 0-85.96 35.58Q160-530.38 160-480q0 50.38 35.58 85.96 35.57 35.58 85.96 35.58h150.77v60ZM330-450v-60h300v60H330Zm197.69 151.54v-60h150.77q50.39 0 85.96-35.58Q800-429.62 800-480q0-50.38-35.58-85.96-35.57-35.58-85.96-35.58H527.69v-60h150.77q75.34 0 128.44 53.1Q860-555.35 860-480.02q0 75.33-53.1 128.44-53.1 53.12-128.44 53.12H527.69Z"/></svg>
                    </div>
                {/if}

                {#if data.Title}
                    <p class="s2" id="floater_text">
                        {data.Title}
                    </p>
                {/if}
                
            </a>
        </div>

<style>
    :global(.floater_container) {
        width: auto;
        height: auto;

        position: absolute;
        top: 50%;
        left: 80%;
        z-index: 500;

        display: flex;
        flex-direction: column;
        gap: 0;
        opacity: 0;

        overflow: hidden;
        
        will-change: transform, max-height; 
            
        cursor: grab; 
        touch-action: none;
        user-select: none;
        transform-origin: bottom left;

        transition: width 0.3s ease-in-out;

        @media (max-width: 768px) {
            display: none;
        }

    }
  
    :global(.floater_container > .floater_bottom > p) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    :global(.floater_container.closed > .floater_bottom > p) {
        display: block;
        width: 0px;
        transition: all var(--transition-times) var(--transition-curve);
        padding-left: 0;
    }

    :global(.floater_container.open > .floater_bottom > p) {
        display: block;
        width: fit-content;
        transition: all var(--transition-times) var(--transition-curve);
        padding-left: var(--spacing-S);
    }

    :global(.floater_container.open > .floater_bottom) {
        padding: var(--spacing-S);
        /* transition: width 0.3s ease-in-out; */
        width: 100%;
        z-index: 4;
        transform: none;
        transition: transform 0.1s ease-in-out;
    }
    
    :global(.floater_container.open > .floater_bottom:active) {
        filter: brightness(0.9);
        transform: scale(0.97);
        transition: transform 0.1s ease-in-out;
    }

    :global(.floater_container *), 
    :global(.floater_container a) {
        user-select: none;
    }

    :global(.floater_container.closed > .floater_image) {

        animation: showAndTranslate 1.5s ease-in-out reverse;
    }

    :global(.floater_image) {
        max-width: 300px;
        max-height: none;
        aspect-ratio: 21 / 9;
        width: 100%;
        height: 0px;
        overflow: hidden;
        filter: grayscale(1);
        z-index: 2;

        position: relative;

        border-left: none;
        border-right: none;
        border-bottom: none;
        
        opacity: 1; 

        display: block;
    }

    :global(.floater_image > picture) {
        display: block;
        height: 100%;
        width: 100%;
        overflow: hidden;
        object-fit: cover;
        object-position: center;
    }

    :global(.floater_image > picture > img) {
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    :global(.floater_bottom) {
        width: max-content;
        height: fit-content;
        display: inline-flex;
        
        padding-right: var(--spacing-L);
        padding-left: var(--spacing-L);
        padding-top: var(--spacing-S);
        padding-bottom: var(--spacing-S);

        justify-content: center;
        align-items: center;
        gap: 0px;

        background-color: white;
        color: black;
        border: dashed 1px black;
        line-height: 1.2;
        z-index: 4;

        word-wrap: none;

        transition: background-color var(--transition-times) var(--transition-curve);
    }

    :global(.floater_container.closed > .floater_bottom) {
        padding: var(--spacing-S);
        z-index: 4;
    }

    :global(.category_icon) {
        display: block;

        width: 20px;
        height: 20px;

        fill: black;

        appearance: none;
        font-family: none;
        line-height: inherit;
        color: transparent;
        border: none;
        border-radius: none;
        text-align: inherit;
        background-color: transparent;
        transition: none;
        position: static;
        padding: 0;
        flex-shrink: 0;
        z-index: 1;
    }

    :global(.category_icon:hover) {
        background-color: transparent;
    }

    .closer_container {
        display: none;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 4;
        width: 40px;
        height: 40px;
        border: dashed 1px black;
        align-items: center;
        justify-content: center;
        padding: 0;
    }

    .closer_container > svg {
        width: 30px;
        height: 30px;
        fill: black;
        place-self: center;
        place-content: center;
    }

    :global(.floater_container.open.clicked) {
        width: 20vw;
        aspect-ratio: 16 / 9;
        height: auto;

        animation-play-state: paused;
        transform-origin: bottom left;
        /* transition: width 5s ease-in-out; */
        
    }

    :global(.floater_container.open.clicked > .floater_image) {

        height: 85%;
        width: 100%;
        max-width: none;
        max-height: none;

        position: relative;
        display: block;
        border-left: dashed 1px black;
        border-right: dashed 1px black;
        border-bottom: dashed 1px black;
    }

    :global(.floater_container.open.clicked > .floater_image > video) {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: white;
    }

    :global(.floater_container.open.clicked > .closer_container) {
        display: flex;
    }

    :global(.floater_container.open.clicked > .closer_container:active) {
        filter: brightness(0.9);
    }

    :global(.floater_container.open.clicked > .floater_bottom) {
        border: dashed 1px black;
        /* transition:
            border 1s ease-in-out,
            width 1s ease-in-out; */
    }

    :global(.floater_container.open.clicked > .floater_bottom:active) {
        transform: none;
        filter: none;
    }

    :global(.darker) {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color: black;
        opacity: 0.9;
        mix-blend-mode: overlay;
        transform: translateX(-100%);
        transition: transform 0.2s ease-in-out;
    }

    :global(.darker.open) {
        transform: translateX(0%);
        transition: transform 3s ease-in-out;
    }

</style>