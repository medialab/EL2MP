<script>
import { onMount, setContext } from 'svelte';
import { cardsDb, alterEgosDb } from '$lib/database/global_db.js';
import { selectedCard, isAlterEgoMode, transitionTime, isDesktop, isMobileDevice, transitionCurve, currentFocus } from '$lib/stores/globalStores';
import templateMobileSvg from '$lib/media/template_mobile.svg?raw';
import templateDesktopSvg from '$lib/media/template_desktop.svg?raw';

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

let condensed_logo = data.condensed_logo
let condensed_logo_white = data.condensed_logo_white
let isProjCover = data.isProjCover

const generateShareContent = async (shareData) => {
    try {
        console.log('🚀 Starting unified share content generation');
        
        // Performance monitoring
        console.time('totalProcess'); // Overall timer
        
        // Choose template based on device type
        const svgText = $isMobileDevice 
            ? templateMobileSvg 
            : templateDesktopSvg;
        
        console.log(`Using template: ${$isMobileDevice ? 'mobile' : 'desktop'}`);
        
        // Load fonts as base64
        const loadFontAsBase64 = async (fontPath) => {
            const response = await fetch(fontPath);
            const buffer = await response.arrayBuffer();
            const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
            return `data:font/truetype;base64,${base64}`;
        };

        console.time('fontLoad'); // Font loading timer
        const [instrumentSerifBase64, instrumentSansBase64] = await Promise.all([
            loadFontAsBase64('/fonts/InstrumentSerif-Regular.ttf'),
            loadFontAsBase64('/fonts/InstrumentSans-Regular.ttf')
        ]);
        console.timeEnd('fontLoad');
        
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        
        // Add fonts to SVG
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
        
        const svgRoot = svgDoc.documentElement;
        svgRoot.insertBefore(defs, svgRoot.firstChild);
        
        const maxCharsPerLine = $isMobileDevice ? 50 : 75;
        const lineHeightConfig = {
            exTitle: 1.1,
            exDescription: 1.3,
            exText: 1.4
        };
        
        const stripHTML = (html) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            return tempDiv.textContent || tempDiv.innerText || '';
        };
        
        const wrapText = (text, customMaxChars = maxCharsPerLine) => {
            const words = text.split(' ');
            const lines = [];
            let currentLine = '';
            
            for (const word of words) {
                const testLine = currentLine ? `${currentLine} ${word}` : word;
                if (testLine.length <= customMaxChars) {
                    currentLine = testLine;
                } else {
                    if (currentLine) {
                        lines.push(currentLine);
                        currentLine = word;
                    } else {
                        lines.push(word);
                    }
                }
            }
            if (currentLine) {
                lines.push(currentLine);
            }
            return lines;
        };
        
        // Customize SVG with provided data
        if (shareData.title) {
            const titleElement = svgDoc.querySelector('#Title');
            if (titleElement) {
                console.log(`- Title: "${shareData.title}" → #Title`);
                const firstTspan = titleElement.querySelector('tspan');
                if (firstTspan) {
                    const x = firstTspan.getAttribute('x');
                    const y = firstTspan.getAttribute('y');
                    const dx = firstTspan.getAttribute('dx');
                    const dy = firstTspan.getAttribute('dy');
                    const transform = firstTspan.getAttribute('transform');
                    
                    titleElement.innerHTML = '';
                    const newTspan = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                    if (x) newTspan.setAttribute('x', x);
                    if (y) newTspan.setAttribute('y', y);
                    if (dx) newTspan.setAttribute('dx', dx);
                    if (dy) newTspan.setAttribute('dy', dy);
                    if (transform) newTspan.setAttribute('transform', transform);
                    newTspan.textContent = stripHTML(shareData.title);
                    titleElement.appendChild(newTspan);
                } else {
                    titleElement.textContent = stripHTML(shareData.title);
                }
            }
        }
        
        if (shareData.exTitle) {
            const exTitleElement = svgDoc.querySelector('#Ex_Title');
            if (exTitleElement) {
                console.log(`- Exercise Title: "${shareData.exTitle}" → #Ex_Title`);
                const firstTspan = exTitleElement.querySelector('tspan');
                if (firstTspan) {
                    const x = firstTspan.getAttribute('x');
                    const y = firstTspan.getAttribute('y');
                    const dx = firstTspan.getAttribute('dx');
                    const dy = firstTspan.getAttribute('dy');
                    const transform = firstTspan.getAttribute('transform');
                    
                    exTitleElement.innerHTML = '';
                    
                    // Split title on mobile using dash separator
                    if ($isMobileDevice && shareData.exTitle.includes('-')) {
                        const parts = shareData.exTitle.split('-');
                        const firstPart = parts[0].trim();
                        const secondPart = parts.slice(1).join('-').trim();
                        
                        const fontSize = parseFloat(exTitleElement.getAttribute('font-size')) || 24;
                        const lineHeight = fontSize * lineHeightConfig.exTitle;
                        
                        const firstSpan = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        if (x) firstSpan.setAttribute('x', x);
                        if (y) firstSpan.setAttribute('y', y);
                        if (dx) firstSpan.setAttribute('dx', dx);
                        if (dy) firstSpan.setAttribute('dy', dy);
                        if (transform) firstSpan.setAttribute('transform', transform);
                        firstSpan.textContent = stripHTML(firstPart);
                        exTitleElement.appendChild(firstSpan);
                        
                        const secondSpan = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        if (x) secondSpan.setAttribute('x', x);
                        if (y) {
                            const yPos = parseFloat(y) + lineHeight;
                            secondSpan.setAttribute('y', yPos.toString());
                        }
                        if (transform) secondSpan.setAttribute('transform', transform);
                        secondSpan.textContent = stripHTML(secondPart);
                        exTitleElement.appendChild(secondSpan);
                    } else {
                        const newTspan = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        if (x) newTspan.setAttribute('x', x);
                        if (y) newTspan.setAttribute('y', y);
                        if (dx) newTspan.setAttribute('dx', dx);
                        if (dy) newTspan.setAttribute('dy', dy);
                        if (transform) newTspan.setAttribute('transform', transform);
                        newTspan.textContent = stripHTML(shareData.exTitle);
                        exTitleElement.appendChild(newTspan);
                    }
                }
            }
        }
        
        if (shareData.exDescription) {
            const exDescElement = svgDoc.querySelector('#Ex_description');
            if (exDescElement) {
                console.log(`- Exercise Description: "${shareData.exDescription}" → #Ex_description`);
                const firstTspan = exDescElement.querySelector('tspan');
                if (firstTspan) {
                    const x = firstTspan.getAttribute('x');
                    const y = firstTspan.getAttribute('y');
                    const dx = firstTspan.getAttribute('dx');
                    const dy = firstTspan.getAttribute('dy');
                    const transform = firstTspan.getAttribute('transform');
                    
                    const fontSize = parseFloat(exDescElement.getAttribute('font-size')) || 16;
                    const lineHeight = fontSize * lineHeightConfig.exDescription;
                    
                    exDescElement.innerHTML = '';
                    const textLines = wrapText(stripHTML(shareData.exDescription));
                    
                    textLines.forEach((line, index) => {
                        const newTspan = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        if (x) newTspan.setAttribute('x', x);
                        if (y) {
                            const yPos = parseFloat(y) + (index * lineHeight);
                            newTspan.setAttribute('y', yPos.toString());
                        }
                        if (dx && index === 0) newTspan.setAttribute('dx', dx);
                        if (dy && index === 0) newTspan.setAttribute('dy', dy);
                        if (transform) newTspan.setAttribute('transform', transform);
                        newTspan.textContent = line;
                        exDescElement.appendChild(newTspan);
                    });
                }
            }
        }
        
        if (shareData.text) {
            const exTextElement = svgDoc.querySelector('#Ex_text');
            if (exTextElement) {
                console.log(`- Exercise Text: "${shareData.text.substring(0, 50)}..." → #Ex_text`);
                const firstTspan = exTextElement.querySelector('tspan');
                if (firstTspan) {
                    const x = firstTspan.getAttribute('x');
                    const y = firstTspan.getAttribute('y');
                    const dx = firstTspan.getAttribute('dx');
                    const dy = firstTspan.getAttribute('dy');
                    const transform = firstTspan.getAttribute('transform');
                    
                    const fontSize = parseFloat(exTextElement.getAttribute('font-size')) || 14;
                    const lineHeight = fontSize * lineHeightConfig.exText;
                    
                    exTextElement.innerHTML = '';
                    const textLines = wrapText(stripHTML(shareData.text));
                    
                    textLines.forEach((line, index) => {
                        const newTspan = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        if (x) newTspan.setAttribute('x', x);
                        if (y) {
                            const yPos = parseFloat(y) + (index * lineHeight);
                            newTspan.setAttribute('y', yPos.toString());
                        }
                        if (dx && index === 0) newTspan.setAttribute('dx', dx);
                        if (dy && index === 0) newTspan.setAttribute('dy', dy);
                        if (transform) newTspan.setAttribute('transform', transform);
                        newTspan.textContent = line;
                        exTextElement.appendChild(newTspan);
                    });
                }
            }
        }
        
        // Handle section image if provided
        if (shareData.exImage) {
            console.log("=== PROCESSING SECTION IMAGE ===");
            let imageUrl = null;
            if (shareData.exImage.img?.src) {
                console.time('imageEmbed'); // Image embedding timer
                imageUrl = new URL(shareData.exImage.img.src, window.location.origin).href;
                console.log("Image URL:", imageUrl);
                
                const targetImageId = $isMobileDevice ? '#image1_769_3387' : '#image1_768_3315';
                const targetImage = svgDoc.querySelector(targetImageId);
                
                if (targetImage) {
                    try {
                        const imageResponse = await fetch(imageUrl);
                        if (imageResponse.ok) {
                            const imageBlob = await imageResponse.blob();
                            const base64Promise = new Promise((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onload = () => resolve(reader.result);
                                reader.onerror = reject;
                                reader.readAsDataURL(imageBlob);
                            });
                            
                            const imageDataUrl = await base64Promise;
                            targetImage.setAttribute('href', imageDataUrl);
                            targetImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', imageDataUrl);
                            targetImage.setAttribute('preserveAspectRatio', 'xMidYMid slice');
                            
                            // Add grayscale filter
                            let defs = svgDoc.querySelector('defs');
                            if (!defs) {
                                defs = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'defs');
                                svgDoc.documentElement.appendChild(defs);
                            }
                            
                            const filter = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'filter');
                            filter.setAttribute('id', 'grayscale');
                            const colorMatrix = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
                            colorMatrix.setAttribute('type', 'saturate');
                            colorMatrix.setAttribute('values', '0');
                            filter.appendChild(colorMatrix);
                            defs.appendChild(filter);
                            targetImage.setAttribute('filter', 'url(#grayscale)');
                            
                            console.log("✓ Image embedded with B&W filter");
                            console.timeEnd('imageEmbed');
                        }
                    } catch (error) {
                        console.warn("Error processing image:", error);
                    }
                }
            }
        }
        
        // Handle background color if provided
        if (shareData.bgColor) {
            const targetColor = '#FBC797';
            const allElements = svgDoc.querySelectorAll('*');
            let replacedCount = 0;
            
            allElements.forEach(element => {
                const fillColor = element.getAttribute('fill');
                if (fillColor && (fillColor.toUpperCase() === targetColor.toUpperCase() || fillColor.toUpperCase() === 'FBC797')) {
                    element.setAttribute('fill', shareData.bgColor);
                    replacedCount++;
                }
            });
            
            console.log(`✓ Color replacement: ${replacedCount} elements updated`);
        }
        
        const modifiedSvg = new XMLSerializer().serializeToString(svgDoc.documentElement);
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const svgWidth = parseFloat(svgRoot.getAttribute('width')) || 680;
        const svgHeight = parseFloat(svgRoot.getAttribute('height')) || 474;
        const scale = 1;
        
        canvas.width = svgWidth * scale;
        canvas.height = svgHeight * scale;
        
        const slug = (str) => (str || '')
            .toString()
            .replace(/<[^>]+>/g, '') // strip HTML
            .replace(/[^a-z0-9]+/gi, '_')
            .replace(/^_+|_+$/g, '')
            .substring(0, 25); // limit fragment length

        const main = slug(shareData.title) || 'EL2MP';
        const ex   = slug(shareData.exTitle) || 'Exercise';
        const filename = `${main}_${ex}.jpg`;
        
        console.log("Starting SVG to JPEG conversion");
        console.time('svg2jpeg'); // SVG → JPEG timer

        const jpegFile = await new Promise((resolve, reject) => {
            console.log('Promise created');

            const img = new Image();

            console.time('svgBase64');
            const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(modifiedSvg)));
            console.timeEnd('svgBase64');

            img.onload = () => {
                try {
                    console.time('drawCanvas');
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.scale(scale, scale);
                    ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
                    console.timeEnd('drawCanvas');

                    console.time('toBlob');
                    canvas.toBlob((blob) => {
                        console.timeEnd('toBlob');
                        if (blob) {
                            const file = new File([blob], filename, {
                                type: 'image/jpeg',
                                lastModified: new Date().getTime()
                            });
                            console.log('✓ JPEG created:', {
                                size: `${(blob.size / 1024).toFixed(1)}KB`,
                                type: file.type,
                                name: file.name
                            });
                            resolve(file);
                            console.timeEnd('svg2jpeg');
                        } else {
                            reject(new Error('Failed to create JPEG'));
                        }
                    }, 'image/jpeg', 0.92);
                } catch (error) {
                    reject(error);
                }
            };

            img.onerror = () => reject(new Error('Failed to load SVG'));
            setTimeout(() => reject(new Error('Timeout')), 150000);

            // Kick-off decoding
            img.src = svgDataUrl;
        });
        
        // DEBUG block removed
        
        const exLabel = shareData.exTitle ? shareData.exTitle.replace(/<[^>]+>/g, '') : 'Exercise';
        const blockLabel = shareData.title ? shareData.title.replace(/<[^>]+>/g, '') : 'Block';
        const desc = shareData.text ? stripHTML(shareData.text) : '';
        const link = shareData.url || window.location.href;
        const socialMessage =
          `\n*Exercise ${exLabel} of block ${blockLabel}*\n\n` +
          `${desc}\n\n🔗`;
        
        const finalShareData = {
            //title: `*${shareData.title || 'EL2MP'} - ${shareData.exTitle || 'Content'}*`,
            text: socialMessage,
            url: link,
            files: [jpegFile]
        };
        
        console.log('✅ Share content generated successfully');
        console.timeEnd('totalProcess');

        const textOnlyPayload = {
            title: finalShareData.title,
            text: socialMessage
        };

        if (navigator.share) {
            const canShareFiles = navigator.canShare && navigator.canShare({ files: [jpegFile] });
            if (canShareFiles) {
                try {
                    await navigator.share(finalShareData);
                    console.log('✅ Content shared successfully with image');
                } catch (error) {
                    if (error.name === 'AbortError') {
                        console.log('ℹ User cancelled sharing');
                    } else {
                        console.warn('⚠ File sharing failed, trying without image');
                        await navigator.share(textOnlyPayload);
                        console.log('✅ Text-only share successful');
                    }
                }
            } else {
                await navigator.share(textOnlyPayload);
                console.log('✅ Text-only share successful');
            }
        } else {
            console.warn('⚠ Web Share API not supported');
        }
        
        return finalShareData;
        
    } catch (error) {
        console.error("Error in generateShareContent:", error);
        throw error;
    }
};

</script>

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
            style="transition: transform {transitionTime}s {transitionCurve} {transitionDelay}ms;"
        >

        <div class="block_num" style="right: {$isMobileDevice ? '10px' : '0px'};">
            <p class="h3">
                Block {card.IndexNum}
            </p>
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
                            $currentFocus = `${card.Title}_Ex_${section.exNum}`
                            console.log($currentFocus)
                        }}> 
                            {#if section.title}
                                <div class="flex_header">
                                    <h2>{@html section.title}</h2>

                                    <a id="share_button"
                                    href="#"
                                    onclick={async (event) => {
                                        event.preventDefault();
                                        
                                        console.log('🚀 Share button clicked - starting share process');
                                        
                                        const shareData = {
                                            title: card.Title,
                                            exTitle: section.title,
                                            exDescription: section.subtitle,
                                            text: section.text,
                                            exImage: section.picture,
                                            bgColor: card.bgColor,
                                            url: `${window.location.href}`
                                        };
                                        
                                        try {
                                            await generateShareContent(shareData);
                                        } catch (error) {
                                            console.error('❌ Share failed:', error);
                                        }
                                    }}
                                    tabindex="0"
                                    role="button"
                                    aria-label="Share content">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M264.62-80Q237-80 218.5-98.5 200-117 200-144.62v-390.76q0-27.62 18.5-46.12Q237-600 264.62-600h84.61v40h-84.61q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v390.76q0 9.24 7.69 16.93 7.69 7.69 7.69 16.93h430.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-390.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69h-84.61v-40h84.61q27.62 0 46.12 18.5Q760-563 760-535.38v390.76q0 27.62-18.5 46.12Q723-80 695.38-80H264.62ZM460-340v-435.46l-84 84L347.69-720 480-852.31 612.31-720 584-691.46l-84-84V-340h-40Z"/></svg>
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

        <div class="block_num">
            <p class="h3" style="color: white;">
                Card {card.IndexNum}
            </p>
        </div>

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

    .block_num {
        width: fit-content;
        height: fit-content;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 20;
        pointer-events: none;
        color: black;
    }

    .block_num > p {
        font-size: 0.9vw;
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
            gap: var(--spacing-XS)
        }

        .flex_header > h2 {
            width: fit-content ;
        }

        .flex_header > a > svg {
            height: 80%;
            width: 80%;
            place-self: center;
            align-self: center;
        }

        .flex_header > a {
            width: 30px;
            height: 30px;
            background-color: transparent;
            transform: scale(1) rotate(0deg);
            transition: transform 0.1s ease-in-out;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        .block_num > p {
            font-size: 3vw;
        }
    }
    

</style>