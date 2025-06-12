<script>
import { onMount, setContext } from 'svelte';
import { cardsDb, alterEgosDb } from '$lib/database/global_db.js';
import { selectedCard, isAlterEgoMode, transitionTime, isDesktop, isMobileDevice } from '$lib/stores/globalStores';

import {
	blur,
	crossfade,
	draw,
	fade,
	fly,
	scale,
	slide
} from 'svelte/transition';

// Instead, use a simple boolean
export let data
export let alterEgoCard
export let bringToFront
export let simplebarContainer
export let swapCards

export let card
export let transitionDelay

let condensed_logo = data.condensed_logo
let condensed_logo_white = data.condensed_logo_white
let isProjCover = data.isProjCover

</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    
        <section
            class="card_container"
            draggable="true"
            on:click={(event) => {
                if ($isDesktop) {
                    bringToFront(event);
                } else {
                    swapCards(event.currentTarget);
                }
            }}
            data-flush-order="{card.IndexNum}"
            id="{card.IndexNum}"
            aria-label="Draggable Card"
            data-section={card.Title}
        >

        <div
        class="card_container_inner"
        style="transition: transform {transitionTime}s var(--transition-curve) {transitionDelay}ms;">

            <!--<img data-sveltekit-preload-data
                class="card_corner_logo"
                src={condensed_logo}
                style="z-index: 5;"
                alt="EL2MP Logo"
            >-->

            <div class="description_container" style="background-color: {card.bgColor}; border: 5px solid {card.bgColor};"> 

                    <h1 class="h1" style="z-index: 7;">
                        {@html card.Title}
                    </h1>

            </div>

            <div class="card_scrollable_container"
                bind:this={simplebarContainer}
                data-simplebar
                data-simplebar-auto-hide="false"
                data-section={card.Title}>
                
                <div class="card_scroll_flex" data-section={card.Title}>
                    
                    <p class="p1" id="description">
                        {@html card.Question}
                    </p>

                    {#if card.Description}
                        <p class="p3" id="description">{@html card.Description}</p>
                    {/if}
                    
                    {#if card.CoverImg}
                        <div class="cover_image_container">
                            <div class="overlay_filter" style="background-color: {card.bgColor};"></div>
                            <enhanced:img
                                data-sveltekit-preload-data
                                src={card.CoverImg}
                                alt="CoverImg"
                                class="cover_image"
                            />
                        </div>  
                    {/if}
                    
                    <!-- Programmatic creation of sections -->
                    {#each card.Content ?? [] as section, index}
                        <!-- We assing a programmatic name for the each block sections -->
                        <div class="section_container" data-sveltekit-preload-data data-section={`Ex ${index+1}`}> 
                            {#if section.title}
                                <h2>{@html section.title}</h2>
                            {/if}
                            
                            {#if section.subtitle }
                                <p class="p3" exercise-description >{@html section.subtitle}</p>
                            {/if}

                            {#if section.picture}
                                <div class="cover_image_container">
                                    <div class="overlay_filter" style="background-color: {card.bgColor};"></div>
                                    <enhanced:img data-sveltekit-preload-data class="article_image" src={section.picture} alt="People"/>
                                </div>   
                            {/if}

                            {#if section.text}
                                <div class="double_column_text_article">
                                    <p class="p3">{@html section.text}</p>
                                </div>
                            {/if}
                        </div>
                            
                        {:else}
                            <p>If you see this we are encountering issues</p>
                    {/each}
                </div>
            </div>
            
            <!-- <img data-sveltekit-preload-data
                class="card_corner_logo"
                src={condensed_logo}
                alt="EL2MP Logo"
            >-->

        </div>

        <!-- From this over is the alter ego card -->

        <div
            class="altergo_container_inner {$isAlterEgoMode ? 'open' : ''}"
            style="background-color: {alterEgoCard.bgColor} !important; transition: transform {transitionTime}s var(--transition-curve) {transitionDelay}ms;"
        >

            <!-- <img data-sveltekit-preload-data
                class="card_corner_logo"
                src={condensed_logo_white}
                alt="EL2MP Logo"
                style="z-index: 10;"
            >-->

            <div class="description_container" style="background-color: {alterEgoCard.bgColor}; border: 5px solid {alterEgoCard.bgColor};"> 
                <h1 class="h1" style="z-index: 7; line-height: 1;">
                    {@html alterEgoCard.Title}
                </h1>
            </div>

            <div class="card_scrollable_container"
                bind:this={simplebarContainer}
                data-simplebar
                data-simplebar-auto-hide="false"
                data-section={alterEgoCard.Title}>
                
                <div class="card_scroll_flex" data-section={alterEgoCard.Title}> 

                    <p class="p1" id="description">
                        {@html alterEgoCard.Question}
                    </p>

                    {#if alterEgoCard.Description}
                        <p
                        class="p3"
                        id="description">{@html alterEgoCard.Description}</p>
                    {/if}

                    {#if alterEgoCard.CoverImg}
                        <enhanced:img
                            data-sveltekit-preload-data
                            src={alterEgoCard.CoverImg}
                            alt="CoverImg"
                            class="cover_image_alterego"
                        />
                    {/if}

                </div>
            </div>
        </div>

    </section>

<style>


    .description_container {
        width: 100%;
        height: fit-content;
        position: relative;
        display: flex;
        flex-direction: column;
        row-gap: 0;

        grid-column: 1 / 8;
        
        top: 0;
        left: 0;

        z-index: 5;
        pointer-events: none;
        grid-row: 1;
        margin-bottom: 3vw;
    }

    .description_container > h1 {
        width: fit-content;
        height: fit-content;
        font-family: 'Instrument Serif';
        white-space: normal; /* Changed from nowrap to allow text wrapping */
        user-select: none;
        pointer-events: none;
        overflow: visible; /* Changed from hidden to show overflow content */
        line-height: 1;
        display: inline-block;
        padding: 0;
        margin: 0;
        margin-bottom: -0.2em;
        margin-top: -0.18em;
        transform: translateX(-0.08em);

        @media (min-width: 1920px) {
            font-size: 6.5vw;
            margin-top: -0.14em;
    }}

    [exercise-description] {
        width: 95%;
        font-family: 'Instrument Sans';
    }

    .card_container {
        width: 60vw;
        max-width: 1100px;
        height: auto;
        aspect-ratio: 1.5 / 1;
        
        display: block;
        
        /* padding-left: var(--spacing-M); */
        padding-right: var(--spacing-M);
        gap: var(--spacing-M);
        background-color: '';
        
        cursor: grab;

        top: 0;
        left: 0;
        position: absolute;

        user-select: none;
        overflow: hidden;
        opacity: 0;
        
        border: solid 1.5px white;
        transition: border 3s ease-in-out;
        
    }

    .card_container_inner {
        display: grid;
        position: relative;
        align-content: flex-start;
        top: 0;
        left: 0;
        grid-template-columns: repeat(7, 1fr);
        overflow: hidden;
        
        width: 100%;
        height: 100%;
        min-height: 100%;
        transform: translateX(0%);
    }


    .cover_image_container {
        width: 100%;
        display: block;
        position: relative;
        z-index: 1;
        opacity: 0.85;
        mix-blend-mode: overlay;
    }
    
    :global(.cover_image) {
        opacity: 1;
        display: block;
        z-index: 1;
        width: 100%;
        height: auto;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }

    .cover_image_alterego {
        opacity: 1;
        display: block;
        z-index: 1;
        width: 50%;
        height: auto;
        object-fit: contain;
        margin-bottom: var(--spacing-L);
    }

    .card_container:active {
        cursor: grabbing;
    }


    .card_scrollable_container {
        display: block;

        width: 100%;
        height: calc(100% - 2px);

        grid-column: 2 / 8;
        grid-row: 2;

        background-color: transparent;

        margin-top: 0.1%;
        
        padding-top: 1%;
        padding-right: var(--spacing-XS);

        overflow-y: scroll !important;  
        overflow-x: hidden;

        z-index: 1;
    }

    .double_column_text_article {
        display: block;
        column-count: 2;
        column-gap: var(--spacing-L);
        width: 100%;
        height: 100%;
    }

    .double_column_text_article > p {
        width: 100%;
        text-align: justify;
        text-justify: inter-word;
        hyphens: auto;
        word-break: break-word;
        overflow-wrap: break-word;
    }

    .card_scroll_flex {
        padding-right: 20px;
        display: flex;
        width: 100%;
        height: fit-content;
        align-items: flex-start;
        flex-direction: column;
        gap: var(--spacing-M);

        margin-bottom: var(--spacing-XL);
        z-index: 0;
    }

    .card_scroll_flex > .p3 {
        width: 95%;
    }

    .section_container {
        display: flex;
        width: 100%;
        height: fit-content;
        align-items: flex-start;
        flex-direction: column;
        margin-top: var(--spacing-S);
        gap: var(--spacing-S);
        
    }

    .altergo_container_inner {
        display: grid;
        position: absolute;
        align-content: flex-start;
        top: 0;
        left: 0;
        grid-template-columns: repeat(7, 1fr);
        overflow: hidden;

        transform: translateX(-100%);
        z-index: 10;
        
        width: 100%;
        height: 100%;
        min-height: 100%;
        color: white;
    }

    :global(.altergo_container_inner.open) {
        transform: translateX(0%);
    }

    /* This should work for siblings - when card_container has a child with class "altergo_container_inner.open" */
    :global(.card_container:has(.altergo_container_inner.open)) .card_container_inner {
        transform: translateX(100%);
    }

    .article_image {
        opacity: 80%;
        width: 100%;
        aspect-ratio: 21 / 9;
        object-fit: cover;
        filter: grayscale(100%);
        mix-blend-mode: overlay;
    }

    .overlay_filter {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: '';
        z-index: 1;
        opacity: 1;
        mix-blend-mode: color;
    }

    /* Scrollbar stuff */

    :global([data-simplebar]) {
        position: absolute;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        align-items: flex-start;
        overflow: hidden;
    }

    :global(.simplebar-wrapper) {
        overflow: hidden;
        width: inherit;
        height: inherit;
        max-width: inherit;
        max-height: inherit;
    }

    :global(.simplebar-mask) {
        direction: inherit;
        position: absolute;
        overflow: hidden;
        padding: 0;
        margin: 0;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: auto !important;
        height: auto !important;
        z-index: 0;
    }

    :global(.simplebar-offset) {
        direction: inherit !important;
        box-sizing: inherit !important;
        resize: none !important;
        position: absolute;
        top: 0;
        left: 0;
        bottom: -5vh !important; 
        right: 0;
        padding: 0;
        margin: 0;
        -webkit-overflow-scrolling: touch;
    }

    :global(.simplebar-content-wrapper) {
        direction: inherit;
        box-sizing: border-box !important;
        position: relative;
        display: block;
        height: 100%; /* Required for horizontal native scrollbar to not appear if parent is taller than natural height */
        width: auto;
        max-width: 100%; /* Not required for horizontal scroll to trigger */
        max-height: 100%; /* Needed for vertical scroll to trigger */
        overflow: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        appearance: none; /* Improves compatibility in some browsers */
        -moz-appearance: none;
        -webkit-overflow-scrolling: touch;
    }

    :global(.simplebar-content-wrapper::-webkit-scrollbar),
    :global(.simplebar-hide-scrollbar::-webkit-scrollbar) {
        display: none;
        width: 0;
        height: 0;
    }

    :global([data-simplebar]::-webkit-scrollbar) {
        display: none; 
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    :global(.simplebar-content:before),
    :global(.simplebar-content:after) {
        content: ' ';
        display: table;
    }

    :global(.simplebar-placeholder) {
        max-height: 100%;
        max-width: 100%;
        width: 100%;
        pointer-events: none;
    }

    :global(.simplebar-height-auto-observer-wrapper) {
        box-sizing: inherit !important;
        height: 100%;
        width: 100%;
        max-width: 1px;
        position: relative;
        float: left;
        max-height: 1px;
        overflow: hidden;
        z-index: -1;
        padding: 0;
        margin: 0;
        pointer-events: none;
        flex-grow: inherit;
        flex-shrink: 0;
        flex-basis: 0;
    }

    :global(.simplebar-height-auto-observer) {
        box-sizing: inherit;
        display: block;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        height: 1000%;
        width: 1000%;
        min-height: 1px;
        min-width: 1px;
        overflow: hidden;
        pointer-events: none;
        z-index: -1;
    }

    :global(.simplebar-track){
        z-index: 10;
        position: absolute;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: visible;
    }

    :global([data-simplebar].simplebar-dragging) {
        pointer-events: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    :global([data-simplebar].simplebar-dragging .simplebar-content) {
        pointer-events: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    :global([data-simplebar].simplebar-dragging .simplebar-track) {
        pointer-events: all;
    }

    :global(.simplebar-scrollbar) {
        position: absolute;
        left: 0;
        right: 0;
        min-height: 10px;
    }

    :global(.simplebar-scrollbar:before) {
        position: absolute;
        content: '';
        background: white;
        border: solid 1px black;

        border-radius: 0px;
        left: 2px;
        right: 2px;
        opacity: 1;
    }

    :global(.simplebar-scrollbar.simplebar-visible:before) {
        opacity: 1;
        transition-delay: 0s;
        transition-duration: 0s;
    }

    :global(.simplebar-track.simplebar-vertical) {
        top: 2px;
        bottom: 2px;
        height: 100%;
        width: var(--spacing-S);
    }

    :global(.simplebar-scrollbar:before) {
        top: 0px;
        bottom: 0px;
        left: -10px;
        right: var(--spacing-XS);
        transform: translateY(5px);
    }

    :global(.simplebar-track.simplebar-horizontal) {
        left: 0;
        height: 11px;
    }

    :global(.simplebar-track.simplebar-horizontal .simplebar-scrollbar) {
        right: auto;
        left: 0;
        top: 0;
        bottom: 0;
        min-height: 0;
        min-width: 10px;
        @media (max-width: 768px) {
            min-width: 5px !important;
        }
        width: auto;
    }

    /* Rtl support */
        :global([data-simplebar-direction='rtl'] .simplebar-track.simplebar-vertical) {
        right: auto;
        left: 0;
    }

    :global(.simplebar-dummy-scrollbar-size) {
        direction: rtl;
        position: fixed;
        opacity: 0;
        visibility: hidden;
        height: 200px;
        width: 200px;
        overflow-y: hidden;
        overflow-x: scroll;
        -ms-overflow-style: scrollbar !important;
    }

    :global(.simplebar-dummy-scrollbar-size > div) {
        width: 100%;
        height: 100%;
        margin: 10px 0;
    }

    :global(.simplebar-hide-scrollbar) {
        position: fixed;
        left: 0;
        visibility: hidden;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    @media (max-width: 768px) {
        :global(.card_container){
            height: 55% !important;
            min-height: none !important;
            width: 90vw !important;
            border-radius: 20px;
            padding-right: 0px !important;
            transition: transform 1.6s ease-in-out;
        }

        :global(.card_container.down) {
            transition: transform 1.6s ease-in-out;
        }

        
        .card_scrollable_container {
            grid-column: 1 / 2;
            grid-row: 2;
        }

        .altergo_container_inner {
            grid-template-columns: repeat(1, 1fr);
        }

        .card_container_inner {
            grid-template-columns: repeat(1, 1fr);
        }

        .card_scroll_flex {
            padding-right: 15px;
            padding-left: 15px;
            row-gap: 10px;
        }

        .card_scroll_flex > .p1 {
            width: 95%;
        }

        .description_container {
            grid-column: 1 / 2;
            grid-row: 1;
            padding: 15px;
        }

        .double_column_text_article {
            column-count: 1;
            column-gap: 0px;

        }

        .section_container {
            margin-top: 15px;
        }
    }
    

</style>