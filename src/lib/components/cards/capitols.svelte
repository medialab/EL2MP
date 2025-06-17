<script>
import { onMount, setContext } from 'svelte';
import { cardsDb, alterEgosDb } from '$lib/database/global_db.js';
import { selectedCard, isAlterEgoMode, transitionTime, isDesktop, isMobileDevice, transitionCurve, currentFocus } from '$lib/stores/globalStores';

import {
	blur,
	crossfade,
	draw,
	fade,
	fly,
	scale,
	slide
} from 'svelte/transition';

export let data
export let alterEgoCard
export let bringToFront
export let simplebarContainer
export let swapCards

export let card
export let transitionDelay

import sharingTemplate from '$lib/media/template.svg'

let condensed_logo = data.condensed_logo
let condensed_logo_white = data.condensed_logo_white
let isProjCover = data.isProjCover

const shareContent = async (sharingTemplate, customData = {}) => {
    console.log("=== SHARE CONTENT START ===");
    console.log("Template:", sharingTemplate);
    console.log("Custom Data:", customData);
    
    try {
        // Step 1: Load fonts and convert to base64
        const loadFontAsBase64 = async (fontPath) => {
            const response = await fetch(fontPath);
            const buffer = await response.arrayBuffer();
            const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
            return `data:font/truetype;base64,${base64}`;
        };

        console.log("Loading fonts...");
        const [instrumentSerifBase64, instrumentSansBase64] = await Promise.all([
            loadFontAsBase64('/fonts/InstrumentSerif-Regular.ttf'),
            loadFontAsBase64('/fonts/InstrumentSans-Regular.ttf')
        ]);
        console.log("Fonts loaded successfully");

        // Step 2: Take SVG as template
        const response = await fetch(sharingTemplate);
        const svgText = await response.text();
        console.log("Original SVG loaded");
        
        // Step 3: Inject data into SVG
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        
        // Step 4: Add font definitions to SVG
        const defs = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const style = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style');
        style.textContent = `
            @font-face {
                font-family: 'Instrument Serif';
                src: url('${instrumentSerifBase64}') format('truetype');
                font-weight: normal;
                font-style: normal;
            }
            @font-face {
                font-family: 'Instrument Sans';
                src: url('${instrumentSansBase64}') format('truetype');
                font-weight: normal;
                font-style: normal;
            }
        `;
        defs.appendChild(style);
        
        // Insert defs as first child of SVG
        const svgRoot = svgDoc.documentElement;
        svgRoot.insertBefore(defs, svgRoot.firstChild);
        console.log("Font definitions added to SVG");
        
        // DEEP DEBUG: SVG structure analysis
        console.log("=== SVG STRUCTURE ANALYSIS ===");
        console.log("SVG Root attributes:", {
            width: svgRoot.getAttribute('width'),
            height: svgRoot.getAttribute('height'),
            viewBox: svgRoot.getAttribute('viewBox'),
            xmlns: svgRoot.getAttribute('xmlns'),
            transform: svgRoot.getAttribute('transform')
        });
        
        // Check all direct children of SVG
        const directChildren = Array.from(svgRoot.children);
        console.log("SVG Direct Children:", directChildren.map(child => ({
            tagName: child.tagName,
            id: child.id,
            transform: child.getAttribute('transform'),
            x: child.getAttribute('x'),
            y: child.getAttribute('y')
        })));
        
        console.log("Injecting data into SVG elements:");
        
        if (customData.title) {
            const titleElement = svgDoc.querySelector('#Title');
            if (titleElement) {
                console.log(`- Title: "${customData.title}" → #Title`);
                
                // DEEP DEBUG: Element hierarchy and positioning
                console.log("TITLE DEEP DEBUG:");
                console.log("- Parent element:", titleElement.parentElement?.tagName, titleElement.parentElement?.id);
                console.log("- Parent transform:", titleElement.parentElement?.getAttribute('transform'));
                console.log("- Element transform:", titleElement.getAttribute('transform'));
                console.log("- Element x,y:", titleElement.getAttribute('x'), titleElement.getAttribute('y'));
                
                console.log("BEFORE - Title element:", {
                    fontFamily: titleElement.getAttribute('font-family'),
                    fontSize: titleElement.getAttribute('font-size'),
                    fill: titleElement.getAttribute('fill'),
                    style: titleElement.getAttribute('style'),
                    transform: titleElement.getAttribute('transform'),
                    x: titleElement.getAttribute('x'),
                    y: titleElement.getAttribute('y'),
                    outerHTML: titleElement.outerHTML
                });
                
                // Clear all existing tspans and create a new one
                const firstTspan = titleElement.querySelector('tspan');
                if (firstTspan) {
                    console.log("BEFORE - First tspan:", {
                        x: firstTspan.getAttribute('x'),
                        y: firstTspan.getAttribute('y'),
                        dx: firstTspan.getAttribute('dx'),
                        dy: firstTspan.getAttribute('dy'),
                        transform: firstTspan.getAttribute('transform'),
                        textContent: firstTspan.textContent,
                        outerHTML: firstTspan.outerHTML
                    });
                    
                    // Preserve ALL positioning attributes from the first tspan
                    const x = firstTspan.getAttribute('x');
                    const y = firstTspan.getAttribute('y');
                    const dx = firstTspan.getAttribute('dx');
                    const dy = firstTspan.getAttribute('dy');
                    const transform = firstTspan.getAttribute('transform');
                    
                    // Clear all tspans
                    titleElement.innerHTML = '';
                    
                    // Create new tspan with ALL preserved attributes
                    const newTspan = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                    if (x) newTspan.setAttribute('x', x);
                    if (y) newTspan.setAttribute('y', y);
                    if (dx) newTspan.setAttribute('dx', dx);
                    if (dy) newTspan.setAttribute('dy', dy);
                    if (transform) newTspan.setAttribute('transform', transform);
                    newTspan.textContent = customData.title;
                    titleElement.appendChild(newTspan);
                } else {
                    titleElement.textContent = customData.title;
                }
                
                console.log("AFTER - Title element:", {
                    fontFamily: titleElement.getAttribute('font-family'),
                    fontSize: titleElement.getAttribute('font-size'),
                    fill: titleElement.getAttribute('fill'),
                    style: titleElement.getAttribute('style'),
                    transform: titleElement.getAttribute('transform'),
                    x: titleElement.getAttribute('x'),
                    y: titleElement.getAttribute('y'),
                    outerHTML: titleElement.outerHTML
                });
            }
        }
        
        if (customData.exTitle) {
            const exTitleElement = svgDoc.querySelector('#Ex_Title');
            if (exTitleElement) {
                console.log(`- Exercise Title: "${customData.exTitle}" → #Ex_Title`);
                console.log("EX_TITLE DEEP DEBUG:");
                console.log("- Parent element:", exTitleElement.parentElement?.tagName, exTitleElement.parentElement?.id);
                console.log("- Parent transform:", exTitleElement.parentElement?.getAttribute('transform'));
                console.log("- Element transform:", exTitleElement.getAttribute('transform'));
                
                console.log("BEFORE - Ex Title element:", {
                    fontFamily: exTitleElement.getAttribute('font-family'),
                    fontSize: exTitleElement.getAttribute('font-size'),
                    fill: exTitleElement.getAttribute('fill'),
                    style: exTitleElement.getAttribute('style'),
                    transform: exTitleElement.getAttribute('transform'),
                    outerHTML: exTitleElement.outerHTML
                });
                
                const firstTspan = exTitleElement.querySelector('tspan');
                if (firstTspan) {
                    console.log("BEFORE - Ex Title first tspan:", {
                        x: firstTspan.getAttribute('x'),
                        y: firstTspan.getAttribute('y'),
                        dx: firstTspan.getAttribute('dx'),
                        dy: firstTspan.getAttribute('dy'),
                        transform: firstTspan.getAttribute('transform'),
                        textContent: firstTspan.textContent
                    });
                    
                    const x = firstTspan.getAttribute('x');
                    const y = firstTspan.getAttribute('y');
                    const dx = firstTspan.getAttribute('dx');
                    const dy = firstTspan.getAttribute('dy');
                    const transform = firstTspan.getAttribute('transform');
                    
                    exTitleElement.innerHTML = '';
                    
                    const newTspan = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                    if (x) newTspan.setAttribute('x', x);
                    if (y) newTspan.setAttribute('y', y);
                    if (dx) newTspan.setAttribute('dx', dx);
                    if (dy) newTspan.setAttribute('dy', dy);
                    if (transform) newTspan.setAttribute('transform', transform);
                    newTspan.textContent = customData.exTitle;
                    exTitleElement.appendChild(newTspan);
                } else {
                    exTitleElement.textContent = customData.exTitle;
                }
                
                console.log("AFTER - Ex Title element:", {
                    fontFamily: exTitleElement.getAttribute('font-family'),
                    fontSize: exTitleElement.getAttribute('font-size'),
                    fill: exTitleElement.getAttribute('fill'),
                    style: exTitleElement.getAttribute('style'),
                    transform: exTitleElement.getAttribute('transform'),
                    outerHTML: exTitleElement.outerHTML
                });
            }
        }
        
        if (customData.exDescription) {
            const exDescElement = svgDoc.querySelector('#Ex_description');
            if (exDescElement) {
                console.log(`- Exercise Description: "${customData.exDescription}" → #Ex_description`);
                console.log("EX_DESCRIPTION DEEP DEBUG:");
                console.log("- Parent element:", exDescElement.parentElement?.tagName, exDescElement.parentElement?.id);
                console.log("- Parent transform:", exDescElement.parentElement?.getAttribute('transform'));
                
                console.log("BEFORE - Ex Description element:", {
                    fontFamily: exDescElement.getAttribute('font-family'),
                    fontSize: exDescElement.getAttribute('font-size'),
                    fill: exDescElement.getAttribute('fill'),
                    style: exDescElement.getAttribute('style'),
                    transform: exDescElement.getAttribute('transform'),
                    tspanCount: exDescElement.querySelectorAll('tspan').length,
                    outerHTML: exDescElement.outerHTML
                });
                
                const firstTspan = exDescElement.querySelector('tspan');
                if (firstTspan) {
                    console.log("BEFORE - Ex Description first tspan:", {
                        x: firstTspan.getAttribute('x'),
                        y: firstTspan.getAttribute('y'),
                        dx: firstTspan.getAttribute('dx'),
                        dy: firstTspan.getAttribute('dy'),
                        transform: firstTspan.getAttribute('transform'),
                        textContent: firstTspan.textContent
                    });
                    
                    const x = firstTspan.getAttribute('x');
                    const y = firstTspan.getAttribute('y');
                    const dx = firstTspan.getAttribute('dx');
                    const dy = firstTspan.getAttribute('dy');
                    const transform = firstTspan.getAttribute('transform');
                    
                    exDescElement.innerHTML = '';
                    
                    const newTspan = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                    if (x) newTspan.setAttribute('x', x);
                    if (y) newTspan.setAttribute('y', y);
                    if (dx) newTspan.setAttribute('dx', dx);
                    if (dy) newTspan.setAttribute('dy', dy);
                    if (transform) newTspan.setAttribute('transform', transform);
                    newTspan.textContent = customData.exDescription;
                    exDescElement.appendChild(newTspan);
                } else {
                    exDescElement.textContent = customData.exDescription;
                }
                
                console.log("AFTER - Ex Description element:", {
                    fontFamily: exDescElement.getAttribute('font-family'),
                    fontSize: exDescElement.getAttribute('font-size'),
                    fill: exDescElement.getAttribute('fill'),
                    style: exDescElement.getAttribute('style'),
                    transform: exDescElement.getAttribute('transform'),
                    tspanCount: exDescElement.querySelectorAll('tspan').length,
                    outerHTML: exDescElement.outerHTML
                });
            }
        }
        
        if (customData.imageUrl) {
            const imageElement = svgDoc.querySelector('#image0_761_18054');
            if (imageElement) {
                console.log(`- Image URL: "${customData.imageUrl}" → #image0_761_18054`);
                imageElement.setAttribute('href', customData.imageUrl);
            }
        }
        
        // Step 6: Apply card background color tinting
        if (customData.bgColor) {
            console.log(`- Applying background color: "${customData.bgColor}"`);
            
            // Main background (full canvas)
            const mainBackground = svgDoc.querySelector('rect[width="1512"][height="982"]');
            if (mainBackground) {
                mainBackground.setAttribute('fill', customData.bgColor);
                console.log('  ✓ Main background tinted');
            }
            
            // Card background 
            const cardBackground = svgDoc.querySelector('rect[x="415.882"][y="234.438"]');
            if (cardBackground) {
                cardBackground.setAttribute('fill', customData.bgColor);
                console.log('  ✓ Card background tinted');
            }
            
            // Alternative selector for card background if the first doesn't work
            const cardBgAlt = svgDoc.querySelector('#BECHMARK rect[rx="2.49898"]');
            if (cardBgAlt) {
                cardBgAlt.setAttribute('fill', customData.bgColor);
                console.log('  ✓ Alternative card background tinted');
            }
        }
        
        // Step 5: Convert SVG to PNG
        const modifiedSvg = new XMLSerializer().serializeToString(svgDoc.documentElement);
        console.log("Modified SVG created with embedded fonts");
        console.log("=== CONVERTING SVG TO PNG ===");
        
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Get SVG dimensions
        const svgWidth = parseFloat(svgRoot.getAttribute('width')) || 680;
        const svgHeight = parseFloat(svgRoot.getAttribute('height')) || 474;
        
        // Set canvas dimensions (you can scale up for higher quality)
        const scale = 2; // 2x scale for better quality
        canvas.width = svgWidth * scale;
        canvas.height = svgHeight * scale;
        
        console.log(`Canvas dimensions: ${canvas.width}x${canvas.height} (${scale}x scale)`);
        
        // Create image from SVG
        const img = new Image();
        
        // Convert SVG to data URL (this bypasses CSP blob restrictions)
        const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(modifiedSvg)));
        console.log("SVG converted to data URL");
        
        // Promise to handle image loading
        const convertToPng = new Promise((resolve, reject) => {
            img.onload = () => {
                try {
                    console.log("SVG image loaded successfully");
                    
                    // Set white background
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    // Scale context for higher quality
                    ctx.scale(scale, scale);
                    
                    // Draw the SVG image onto canvas
                    ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
                    
                    console.log("SVG drawn to canvas");
                    
                    // Convert canvas to PNG blob
                    canvas.toBlob((blob) => {
                        if (blob) {
                            console.log("PNG conversion successful");
                            resolve(blob);
                        } else {
                            reject(new Error("Failed to create PNG blob"));
                        }
                    }, 'image/png', 1.0); // Maximum quality
                    
                } catch (error) {
                    console.error("Error during canvas operations:", error);
                    reject(error);
                }
            };
            
            img.onerror = (error) => {
                console.error("Failed to load SVG image:", error);
                reject(new Error("Failed to load SVG image"));
            };
            
            // Add timeout to prevent hanging
            setTimeout(() => {
                reject(new Error("Image loading timeout"));
            }, 10000); // 10 second timeout
        });
        
        // Set image source to trigger loading (using data URL instead of blob)
        img.src = svgDataUrl;
        
        // Wait for conversion and download
        const pngBlob = await convertToPng;
        const pngUrl = URL.createObjectURL(pngBlob);
        
        const filename = `${customData.title || 'shared'}_${customData.exTitle || 'content'}.png`;
        console.log(`Saving PNG as: ${filename}`);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        setTimeout(() => URL.revokeObjectURL(pngUrl), 1000);
        
        console.log("=== SHARE CONTENT COMPLETE ===");
        return modifiedSvg;
        
    } catch (error) {
        console.error("Error in shareContent:", error);
    }
};

</script>
<!--
<div style="position:absolute; top: 250px; left: 250px; width: max-content; height: fit-content; background-color: black; color: white;">
    <p class="p2">Current focus: {$currentFocus}</p>
</div>
-->

        <div
            class="card_container"
            draggable="true"
            onclick={(event) => {
                if ($isDesktop) {
                    bringToFront(event);
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
        style="transition: transform {transitionTime}s {transitionCurve} {transitionDelay}ms;">

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
                            $currentFocus = `${card.Title}_Ex_${section.exNum}`
                            console.log($currentFocus)
                        }}> 
                            {#if section.title}
                                <div class="flex_header">
                                    <h2>{@html section.title}</h2>

                                    <a
                                    onclick={(event) => shareContent(sharingTemplate, { 
                                        title: card.Title,
                                        exTitle: section.title,
                                        exDescription: section.subtitle,
                                        bgColor: card.bgColor
                                    })}
                                    onkeydown={(event) => {
                                        if (event.key === 'Enter' || event.key === ' ') {
                                            event.preventDefault();
                                            shareContent(`${card.Title}_Ex_${section.exNum}`, { exTitle: section.title });
                                        }
                                    }}
                                    tabindex="0"
                                    role="button"
                                    aria-label="Share content">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h120v80H240v440h480v-440H600v-80h120q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-280v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z"/></svg>
                                    </a>
                                    
                                    
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

    </div>

<style>

    :root {
        --card-transition-duration: 1s;
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
        
        transition: border 3s ease-in-out;
        border: 1.5px solid white;
        
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

    .flex_header > a > svg {
        height: 100%;
        width: 100%;
        fill: #1f1f1f;
        opacity: 0.5;
    }

    .flex_header > a {
        width: 30px;
        height: 30px;
        background-color: transparent;
        transform: scale(1) rotate(0deg);
        transition: transform 0.1s ease-in-out;
    }

    .flex_header > a:active {
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
        }

        .double_column_text_article {
            column-count: 1;
            column-gap: 0px;

        }

        .section_container {
            margin-top: 15px;
        }

        .flex_header {
            gap: var(--spacing-S)
        }

        .flex_header > a > svg {

        }

        .flex_header > h2 {
            width: 80%;
        }

        .flex_header > a {
            width: 30px;
            height: 30px;
            background-color: transparent;
            transform: scale(1) rotate(0deg);
            transition: transform 0.1s ease-in-out;
        }
    }
    

</style>