<script>
import { onMount, setContext, tick } from 'svelte';
import { cardsDb, alterEgosDb } from '$lib/database/global_db.js';
import { selectedCard, finalShareData, sharingTextMobile, isAlterEgoMode, transitionTime, isDesktop, isMobileDevice, transitionCurve, currentFocus, showSharer, shareInfo, sharerVisibility, shareData } from '$lib/stores/globalStores';

import {
	blur,
	crossfade,
	draw,
	fade,
	fly,
	scale,
	slide
} from 'svelte/transition';
  import { text } from '@sveltejs/kit';
  import { writable } from 'svelte/store';

export let data
export let alterEgoCard
export let bringToFront
export let simplebarContainer
export let swapCards
export let card
export let transitionDelay

const isSecureContext = writable(false);

    onMount( () => {
        $isSecureContext = window.isSecureContext;
        //console.log("isSecureContext", $isSecureContext);
    });

</script>

        <div
            class="card_container"
            draggable="true"
            onclick={(event) => {
                if ($isDesktop) {
                    bringToFront(event);
                    $selectedCard = card.Title;
                } else {
                    swapCards(event.currentTarget);
                }
            }}
            onkeydown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    if ($isDesktop) {
                        bringToFront(event);
                    } else {
                        swapCards(event.currentTarget);
                    }
                }
            }}
            tabindex="0"
            role="button"
            data-flush-order="{card.IndexNum}"
            id="{card.IndexNum}"
            aria-label="Draggable Card"
            data-section={card.Title}
        >


        <div
            class="card_container_inner"
            style="transition: transform {transitionTime}s {transitionCurve} {transitionDelay}ms;"
        >

        <div class="block_num" style="right: {$isMobileDevice ? '10px' : '0px'};">
            <!--<p class="h3">
                Block {card.IndexNum}
            </p>-->
            <button id="share_button"
                
                onclick={(event) => {
                    event.preventDefault();
                    
                    $shareData = ({
                        title: card.Title,
                        exTitle: card.Question,
                        exText: '',
                        exDescription: card.Description,
                        exImage: card.CoverImg,
                        bgColor: card.bgColor,
                        url: `${window.location.href}`
                    });

                    console.log($shareData)
                }}

                tabindex="0"
                role="button"
                class="share_button"
                aria-label="Share content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M264.62-80Q237-80 218.5-98.5 200-117 200-144.62v-390.76q0-27.62 18.5-46.12Q237-600 264.62-600h84.61v40h-84.61q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v390.76q0 9.24 7.69 16.93 7.69 7.69 7.69 16.93h430.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-390.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69h-84.61v-40h84.61q27.62 0 46.12 18.5Q760-563 760-535.38v390.76q0 27.62-18.5 46.12Q723-80 695.38-80H264.62ZM460-340v-435.46l-84 84L347.69-720 480-852.31 612.31-720 584-691.46l-84-84V-340h-40Z"/></svg>
            </button>
        </div>

        

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
                        <div
                        role="region"
                        class="section_container"
                        data-sveltekit-preload-data
                        data-section={`Ex_${section.exNum}`}
                        onmouseenter={() => {
                            if (!$isMobileDevice) {
                                $currentFocus = `${card.Title}_Ex_${section.exNum}`
                                console.log($currentFocus)
                            }
                        }}
                        ontouchstart={() => {
                            if ($isMobileDevice) {
                                $currentFocus = `${card.Title}_Ex_${section.exNum}`
                                console.log($currentFocus)
                            }
                        }}
                        onfocus={() => {
                            $currentFocus = `${card.Title}_Ex_${section.exNum}`
                            console.log($currentFocus)
                        }}> 
                            {#if section.title}
                                <div class="flex_header">
                                    <h2>{@html section.title}</h2>

                                    {#if $isSecureContext}
                                        <button id="share_button"
                                            
                                            onclick={(event) => {
                                                event.preventDefault();
                                                
                                                $shareData = ({
                                                    title: card.Title,
                                                    exTitle: section.title,
                                                    exDescription: section.subtitle,
                                                    exText: section.text,
                                                    exImage: section.picture,
                                                    bgColor: card.bgColor,
                                                    url: `${window.location.href}`
                                                });
                                            }}

                                            tabindex="0"
                                            role="button"
                                            aria-label="Share content"
                                            class="share_button">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M264.62-80Q237-80 218.5-98.5 200-117 200-144.62v-390.76q0-27.62 18.5-46.12Q237-600 264.62-600h84.61v40h-84.61q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v390.76q0 9.24 7.69 16.93 7.69 7.69 7.69 16.93h430.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-390.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69h-84.61v-40h84.61q27.62 0 46.12 18.5Q760-563 760-535.38v390.76q0 27.62-18.5 46.12Q723-80 695.38-80H264.62ZM460-340v-435.46l-84 84L347.69-720 480-852.31 612.31-720 584-691.46l-84-84V-340h-40Z"/></svg>
                                        </button>
                                    {/if}
                                    
                                </div>
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

        </div>

        <!-- From this over is the alter ego card -->

        <div
            class="altergo_container_inner {$isAlterEgoMode ? 'open' : ''}"
            style="background-color: {alterEgoCard.bgColor} !important; transition: transform {transitionTime}s {transitionCurve} {transitionDelay}ms;"
        >

        <div class="block_num" id="altergo_block_num">
            <!-- <p class="h3" style="color: white;">
                Card {card.IndexNum}
            </p>-->
            <button id="share_button"
                
                onclick={(event) => {
                    event.preventDefault();
                    
                    $shareData = ({
                        title: alterEgoCard.Title,
                        exTitle: alterEgoCard.Question,
                        exText: '',
                        exDescription: alterEgoCard.Description,
                        exImage: '',
                        bgColor: alterEgoCard.bgColor,
                        url: `${window.location.href}`
                    });

                    console.log($shareData)
                }}

                tabindex="0"
                role="button"
                class="share_button"
                aria-label="Share content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M264.62-80Q237-80 218.5-98.5 200-117 200-144.62v-390.76q0-27.62 18.5-46.12Q237-600 264.62-600h84.61v40h-84.61q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v390.76q0 9.24 7.69 16.93 7.69 7.69 7.69 16.93h430.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-390.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69h-84.61v-40h84.61q27.62 0 46.12 18.5Q760-563 760-535.38v390.76q0 27.62-18.5 46.12Q723-80 695.38-80H264.62ZM460-340v-435.46l-84 84L347.69-720 480-852.31 612.31-720 584-691.46l-84-84V-340h-40Z"/></svg>
            </button>
        </div>

            <div class="description_container" style="background-color: {alterEgoCard.bgColor}; border: 5px solid {alterEgoCard.bgColor};"
            > 
                <h1 class="h1" style="z-index: 7; line-height: 1;">
                    {@html alterEgoCard.Title}
                </h1>
            </div>

            <div class="card_scrollable_container"
                >
                
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

    </div>
    
<style>

    :root {
        --card-transition-duration: 1s;
    }

    .block_num {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 20;
        color: black;
        background-color: transparent;
        border: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        fill: #1f1f1f;
    }

    #altergo_block_num {
        fill: white;
    }

    .block_num > .share_button {
        width: 100%;
        height: 100%;
    }

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
        pointer-events: visibleFill;
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

        user-select:text;
        overflow: hidden;
        opacity: 0;
        
        transition: border 3s ease-in-out;
        border: 1.5px solid white;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 94%);

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

    .flex_header {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--spacing-M);
    }


    .share_button > svg {
        height: 100%;
        width: 100%;
        opacity: 0.5;
    }

    .share_button {
        width: 30px;
        height: 30px;
        background-color: transparent;
        transform: scale(1) rotate(0deg);
        transition: transform 0.1s ease-in-out;
        background-color: transparent;
        border: none;
        transform: scale(1) rotate(0deg);
        transition: transform 0.1s ease-in-out;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;
        border-radius: 0%;
        padding: 0;
        cursor: pointer;
    }

    .share_button:active {
        width: 30px;
        height: 30px;
        transform: scale(0.9) rotate(5deg);
        transition: transform 0.1s ease-in-out;
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
            width: 90vw !important;
            max-height: none;
            border-radius: 20px;
            padding-right: 0px !important;
            transition: transform var(--card-transition-duration) ease-in-out;
        }

        :global(.card_container.down) {
            transition: transform var(--card-transition-duration) ease-in-out;
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
            margin-bottom: 1vw;
        }

        .double_column_text_article {
            column-count: 1;
            column-gap: 0px;

        }

        .section_container {
            margin-top: 15px;
        }

        .flex_header {
            gap: var(--spacing-XS)
        }

        .flex_header > h2 {
            width: fit-content ;
        }
        

        .share_button > svg {
            height: 100%;
            width: 100%;
            place-self: center;
            align-self: center;
            padding-bottom: 5px;
        }

        .share_button {
            width: 30px;
            height: 30px;
            background-color: transparent;
            border: none;
            transform: scale(1) rotate(0deg);
            transition: transform 0.1s ease-in-out;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            position: relative;
            border-radius: 0%;
            padding: 0;
        }

        .block_num { 
            width: 40px;
            height: 40px;
            top: 10px;
        }
    }
    

</style>