<script>
    export let data
    export let switch_alterego 
    export let simplebarContainer
    export let selectedCardTitle
    export let currentScrollLevel
    export let logoImage

    import PositionMarkerButton from "./position_marker_button.svelte"; 
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_missing_attribute -->

<button class="closing_icon" on:click={switch_alterego}>
    <img src={logoImage} alt="EL2MP Logo">
</button>

 <!-- <div class="translation_container closed" id="sidebar">
    <div class="logo_button">
        <a class="header_container" on:click={switch_alterego}>
            <img class="logo_container" src={data.logoImage} alt="Expanded logo version of EL2MP">   
        </a>

        
        <div class="description_scroll"
                bind:this={simplebarContainer}
                data-simplebar
                data-simplebar-auto-hide="false"
                data-section={data.Title}>
            
            <p class="p1">
                {@html data.projectDescription}
            </p>
    
            <div class="credits_container">
                <a>
                    <p class="h4"> Privacy </p>
                </a>
    
                <a>
                    <p class="h4"> Cookie </p>
                </a>
            </div>
        </div>
    </div> -->

    

    <!--<div class="side_column">
        <button class="closing_icon" on:click={switch_alterego}>
            <svg
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960">
                <path d="M480-154.15 328.62-305.54l26.3-26.31L480-206.77l125.08-125.08 26.3 26.31L480-154.15ZM354.92-628.46l-26.3-26.31L480-806.15l151.38 151.38-26.3 26.31L480-753.54 354.92-628.46Z"/>
            </svg>
        </button>
    
        <PositionMarkerButton
            data = {data}
            selectedCardTitle = {selectedCardTitle}
            currentScrollLevel = {currentScrollLevel}
        />
    </div>
    
    
 </div>-->

<style>

    .side_column {
        height: 100%;
        width: fit-content;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
    }

    .translation_container {
        display: flex;
        flex: 1;
        flex-direction: row;
        gap: 0px;
        position: absolute;
        top: 0;
        left: 0;

        width: fit-content;
        height: 100%;

        align-items: flex-start;
        justify-items: flex-start;

        transform: translateX(0px);
        transition: all var(--transition-times) var(--transition-curve);
        z-index: 6000;
        transform-origin: top left;
    }

    :global(.translation_container.open) {
        transform: translateX(0px);
        transition: all var(--transition-times) var(--transition-curve);
        transform-origin: top left;
    }

    :global(.translation_container.closed) {
        transform: translateX(-28vw);
        transition: all var(--transition-times) var(--transition-curve);
        transform-origin: top left;
    }

    :global(:root) {
        --transition-times: 1s;
        --transition-curve: ease-in-out
    }

    :global(.header_container) {
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        justify-content: space-between;
        width:90%;
        opacity: 1;

        transform: translateX(0%);
        transition: all var(--transition-times) var(--transition-curve);
    }

    :global(.logo_container) {
        width: 100%;
    }

    :global(.logo_button) {
        border-radius: 0;
        top: 0;
        left: 0;
        border: 0 solid black;
        border-right: 1px solid black;
        height: 100%;
        z-index: 200;
        display: flex;
        flex-direction: column;
        padding: var(--spacing-S);
        align-items: flex-start;
        gap: var(--spacing-M);
        text-align: left;
        position: relative;
        background-color: #EAEAEA;
        transition: all var(--transition-times) var(--transition-curve);
        width: 28vw;
    }

    :global(.logo_button.open) {
        width: 28vw;
        padding-right: 0; 
    }

    :global(.logo_button.closed) {
        width: 0vw;
        padding-right: 0; 
    }

    :global(.description_scroll) {
        display: flex;
        position: static !important;
        flex-direction: column;
        align-items: flex-start;
        
        gap: var(---spacing-L, 30px);

        overflow-y: scroll;
        overflow-x: hidden;
        
        padding-right: var(--spacing-M);
        padding-left: var(--spacing-XS);

        height: 100%;
        width: 100%;

        text-align: justify;
        line-height: 1.5;
        word-wrap: break-word;
        hyphens: auto;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;

        orphans: 5;
        widows: 5;
        
        transform: translateX(0vw);
        transition: all var(--transition-times) var(--transition-curve);
    }

    :global(.description_scroll .p1) {
        width: 95%;
    }

    :global(.credits_container){
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        align-self: stretch;

        height: auto;
        width: 100%;
    }    

    :global(.closing_icon) {
        width: 20vw;
        height: fit-content;

        fill: black;
        padding: var(--spacing-XS);
        padding-right: var(--spacing-S);
        opacity: 1;
        /* transform: translateX(-1px) rotate(90deg) ;*/

        cursor: pointer;

        background-color: #EAEAEA;

        position: relative;

        border-radius: 0px 0px 5px 0px;
        border-left: solid 0px black;
        border-top: solid 0px black;

        z-index: 500;

    }

    :global(.closing_icon:active) {
        background-color: var(--full-black);
        color: var(--demi-white);
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }

    @media only screen and (max-width: 768px) {

        .translation_container {
            height: fit-content;
            position: static;
        }

        .translation_container.open {
            height: fit-content;
            position: static;
            flex: 0;
        }
        
        .logo_button {
            position: static;
            top: 0;
            width: 100%;
            border-radius: 0px;
            border-right: 0px;
            border-top: 0px;
            border-bottom: solid 1px black;
            height: max-content; /* Adjust height as needed */
        }

        .description_scroll {
            display: none;
        }

        .header_container {
            width: 80%;
            place-content: center;
            place-self: center;
            padding-top: var(--spacing-S);
            padding-bottom: var(--spacing-S);
        }

        .side_column {
            display: none;
        }
    }

    /* Scrollbar stuff */

    :global(.description_scroll [data-simplebar]) {
        position: absolute;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        align-items: flex-start;
        overflow: hidden;
    }

    :global(.description_scroll .simplebar-wrapper){
        overflow: hidden;
        width: inherit;
        height: inherit;
        max-width: inherit;
        max-height: inherit;
    }

    :global(.description_scroll .simplebar-mask) {
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

    :global(.description_scroll .simplebar-offset) {
        direction: inherit !important;
        box-sizing: inherit !important;
        resize: none !important;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        padding: 0;
        margin: 0;
        -webkit-overflow-scrolling: touch;
    }

    :global(.description_scroll .simplebar-content-wrapper) {
        direction: inherit;
        box-sizing: border-box !important;
        position: relative;
        display: block;
        height: 100%; /* Required for horizontal native scrollbar to not appear if parent is taller than natural height */
        width: 100%;
        max-width: 100%; /* Not required for horizontal scroll to trigger */
        max-height: 100%; /* Needed for vertical scroll to trigger */
        overflow: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        appearance: none; /* Improves compatibility in some browsers */
        -moz-appearance: none;
        -webkit-overflow-scrolling: touch;
        padding: 0px;
    }

    :global(.description_scroll .simplebar-content-wrapper::-webkit-scrollbar),
    :global(.description_scroll .simplebar-hide-scrollbar::-webkit-scrollbar) {
        display: none;
        width: 0;
        height: 0;
    }

    :global(.description_scroll [data-simplebar]::-webkit-scrollbar) {
        display: none; 
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    :global(.description_scroll .simplebar-content:before),
    :global(.description_scroll .simplebar-content:after) {
        content: ' ';
        display: table;
    }

    :global(.description_scroll .simplebar-placeholder) {
        max-height: 100%;
        max-width: 100%;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    :global(.description_scroll .simplebar-height-auto-observer-wrapper) {
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

    :global(.description_scroll .simplebar-height-auto-observer) {
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

    :global(.description_scroll [data-simplebar].simplebar-dragging) {
        pointer-events: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    :global(.description_scroll [data-simplebar].simplebar-dragging .simplebar-content) {
        pointer-events: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    :global(.description_scroll [data-simplebar].simplebar-dragging .simplebar-track) {
        pointer-events: all;
    }

    :global(.description_scroll .simplebar-scrollbar) {
        position: absolute;
        left: 0;
        right: 0;
        min-height: 0px !important;
    }

    :global(.description_scroll .simplebar-track){
        z-index: 10;
        height: 100% !important;
        position: absolute;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: visible;
        margin-left: 0;

        /* dovrebbe definire la traccia */
    }

    :global(.description_scroll .simplebar-scrollbar:before) {
        position: absolute;
        content: '';
        background: white;
        border: solid 1px black;

        border-radius: 0px;
        opacity: 1;

        /* questo verosimilmente controlal la pillola */
    }

    :global(.description_scroll .simplebar-scrollbar.simplebar-visible:before) {
        opacity: 1;
        height: 100%;
        transition-delay: 0s;
        transition-duration: 0s;
        transform: translateX(6px);

        /* THIS */
    }
    
    :global(.description_scroll .simplebar-track.simplebar-vertical) {
        top: 0px;
        height: 100%;
        width: var(--spacing-S);
    }

    :global(.description_scroll .simplebar-track.simplebar-horizontal .simplebar-scrollbar) {
        right: auto;
        left: 0;
        top: 0;
        bottom: 0;
        min-height: 0;
        min-width: 10px;
        width: auto;
    }

    :global(.description_scroll .simplebar-scrollbar:before) {
        top: 0px;
        bottom: 0px;
        left: -10px;
        right: var(--spacing-XS);
        transform: translateY(0px);
    }

    :global(.description_scroll .simplebar-track.simplebar-horizontal) {
        left: 0;
        height: 0px;
    }

    

    /* Rtl support */
    :global(.description_scroll [data-simplebar-direction='rtl'] .simplebar-track.simplebar-vertical) {
        right: auto;
        height: 100%;
        left: 0;
    }

    :global(.description_scroll .simplebar-dummy-scrollbar-size) {
        direction: rtl;
        height: 500px;
        position: fixed;
        opacity: 0;
        visibility: hidden;
        width: 500px;
        overflow-y: hidden;
        overflow-x: scroll;
        -ms-overflow-style: scrollbar !important;
    }

    :global(.description_scroll .simplebar-dummy-scrollbar-size > div) {
        width: 200%;
        height: 200%;
        margin: 10px 0;
    }

    :global(.description_scroll .simplebar-hide-scrollbar) {
        position: fixed;
        left: 0;
        visibility: hidden;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    
        
</style>