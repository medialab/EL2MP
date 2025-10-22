<script>
    export let data

    import Capitols from "$lib/components/cards/capitols.svelte"; 
    import LogoButton from "$lib/components/buttons/logo_button.svelte";
    import Floater from "$lib/components/floaters.svelte";
    import Textbox from "$lib/components/textboxes.svelte";
    import Slider from "$lib/components/buttons/slider.svelte";
    import VademecumFloater from "$lib/components/vademecum_floater.svelte";
    import Sharer from '$lib/components/buttons/sharer.svelte';
    import { onMount, onDestroy, tick } from "svelte";
    import { writable } from "svelte/store";
    import { fade } from "svelte/transition";
    import templateMobileSvg from '$lib/media/template_mobile.svg?raw';
    import templateDesktopSvg from '$lib/media/template_desktop.svg?raw';

    import vademecumImage from '$lib/media/photos/Vad_cover.png?enhanced';
    import tediumImage from '$lib/media/photos/tedium.png?enhanced';

    // Here we start to implement more stores
    import { currentHash, selectedCard, isAlterEgoMode, currentCardColor, highestZIndex, lastCardColor, isDesktop, isMobileDevice, startX, startY, transitionTime, transitionCurve, currentFocus, isPageLoaded, showSharer, shareInfo, sharingTextMobile, sharerVisibility, finalShareData, shareData } from '$lib/stores/globalStores';

    let interact, vademecumFloater, tediumFloater;
    let totalBlockWidth, totalBlockHeight, x, y, topLeftCornerX, topLeftCornerY, windowWidth, windowHeight, initialsY, topYCorner, bottomYCorner, initialX;

    let width = 0;
    let height = 0;

    let isBurgerMenuOpen = writable(false);

    let contentContainer;

    let containers;
    let textBoxes;
    let scrollContainers;
    let floaters;

    let initialPositions = [];
    let floaterPositions = [];

    let scrollableElements;

    let currentObserver;
    let sections = [];

    let hostElement;
    let simplebarContainer;

    let holdTimeout;
    let interval;
    let cardWidth, cardHeight, offset;

    let lastDeviceType = null; 
    let isSwapping = false;
    let isInteractionLocked = false;

    const areCardsLoaded = writable(false);

    const waitForHash = writable(false);

    // Flag that becomes true once updateWindowSize has populated viewport dimensions
    const windowSizeReady = writable(false);

    const getCardFlushOrder = (card) => {
        if (typeof document !== 'undefined') {
            const currentCard = document.querySelector(`[data-section="${card.Title}"]`)
            //console.log("currentCard", currentCard)
            if (currentCard) {
                const currentFlushOrder = currentCard.getAttribute('data-flush-order')
                //console.log("currentFlushOrder", currentFlushOrder)
                return currentFlushOrder
            }
        }

        return 0
    }   

    const updateWindowSize = () => {
        windowWidth  = window.innerWidth;
        windowHeight = window.innerHeight;
       
        isMobileDevice.set(windowWidth <= 768);
        isDesktop.set(windowWidth > 768);
        //console.log("updateWindowSize", windowWidth, windowHeight);

        // Notify that viewport dimensions are now known
        windowSizeReady.set(true);
    };

    const bringToFront = (eventOrElement) => {
        const frontingTarget = eventOrElement.currentTarget || eventOrElement;
        $highestZIndex += 1;
        frontingTarget.style.zIndex = $highestZIndex;

        if ($isAlterEgoMode) {
            const idxStr = frontingTarget.getAttribute('id');
            if (idxStr) {
                const ae = data.alterEgosDb[`Card${idxStr}`];
                if (ae && ae.Title) {
                    $currentFocus = ae.Title;
                }
            }
        } else {
            const blockTitle = frontingTarget.getAttribute('data-section');
            if (blockTitle) {
                $currentFocus = `${blockTitle}_`;
            }
        }
    };

    const calculateRandomPosition = (floater) => {
        if (typeof window === 'undefined') {
            return {
                top: '0px',
                left: '0px',
                zIndex: 0,
            };
        }

        const safetyInset = 20;

        //This fallback is primarly for the vademecum floater
        let estimatedWidth  = 250;
        let estimatedHeight = 150;

        if (floater) {
            const selector = `[data-identifier="${floater.parent}_${floater.id}"]`;
            const maybeElem = document.querySelector(selector);
            
            
            if (maybeElem) {
                const rect = maybeElem.getBoundingClientRect();
                if (rect.width && rect.height) {
                    estimatedWidth  = rect.width;
                    estimatedHeight = rect.height;
                }
            }
        }

        const maxLeft = Math.max(window.innerWidth  - estimatedWidth  - safetyInset, safetyInset);
        const maxTop  = Math.max(window.innerHeight - estimatedHeight - safetyInset, safetyInset);

        const left = Math.random() * (maxLeft - safetyInset) + safetyInset;
        const top  = Math.random() * (maxTop  - safetyInset) + safetyInset;

        return {
            top: `${Math.round(top)}px`,
            left: `${Math.round(left)}px`,
            zIndex: Math.floor(Math.random() * 1000),
            animationDelay: Number(Math.random().toFixed(2)),
        };
    };

    const alignColor = ($selectedCard) => {
        const selected = Object.values(data.cardsDb).find(card => card.Title === $selectedCard);

        if ($isAlterEgoMode) {
            $currentCardColor = 'white';
            return;

        } else {
            if (selected) {
                $currentCardColor = selected.bgColor;
                $lastCardColor = selected.bgColor;
            } else {
                $currentCardColor = $lastCardColor;
            }
        }
        
        
    };

    const openFloaters = (floaters) => {
        if ($isAlterEgoMode) {
            return;
        } else {
            //console.log("openFloaters");
            floaters.forEach(floater => {
            if (floater.classList.contains('closed')) {
                floater.classList.remove('closed');
                floater.classList.add('open');
            }
        }); 
        }
    };

    const closeFloaters = (floaters) => {
        floaters.forEach(floater => {
            if (floater.classList.contains('open')) {
            floater.classList.remove('open');
            floater.classList.add('closed');
        }
        });
    };

    const hideFloaters = () => {
        if (!floaters) return;
        console.log("hideFloaters");
        
            floaters.forEach((floater) => {
                floater.classList.remove('clicked');
                floater.classList.add('open');
            });
    };

    $: if ($isAlterEgoMode !== undefined) alignColor($selectedCard);
    $: if (!$isAlterEgoMode) hideFloaters();
    $: if ($isAlterEgoMode) {$currentHash = ''};
    //$: console.log("Current hash is",$currentHash)
    $: if ($shareData && $shareData.title && svgDoc) generateShareContent();
    
    //Floaters filtering
    $: if (!$isAlterEgoMode && $selectedCard && floaters) {
        //console.log("Filtering floaters for card", $selectedCard);

        floaters.forEach((floater) => {
            if ($selectedCard !== 'all' && floater.dataset.parent !== $selectedCard) {
                floater.style.display = 'none';
            } else if (floater.dataset.parent === $selectedCard) {
                floater.style.display = 'flex';
            }
        });
    }
    
    const placeCards = async (containers) => {
        
        setTimeout(async () => {
            await containers;

            if (containers) {

                const firstCard = containers[0];

                if ($isMobileDevice) {
                    containers.forEach(container => {
                        container.style.height = '65%';
                    });
                }

                cardWidth = firstCard.getBoundingClientRect().width;
                cardHeight = firstCard.getBoundingClientRect().height;
                const opticalCorrection = -50;

                if ($isDesktop) {

                        offset = -30;

                        totalBlockWidth = cardWidth + ((containers.length - 1) * Math.abs(offset));
                        totalBlockHeight = cardHeight + ((containers.length - 1) * Math.abs(offset));

                        $startX = ((windowWidth - totalBlockWidth) / 2) - offset * (containers.length) + opticalCorrection;
                        $startY = ((windowHeight - totalBlockHeight) / 2) - offset * (containers.length) + opticalCorrection;


                    } else if ($isMobileDevice) {
                        offset = -35;
                        const correction = 20;
                        totalBlockWidth = cardWidth;
                        totalBlockHeight = cardHeight + ((containers.length - 1) * Math.abs(offset));
                        $startX = ((windowWidth - totalBlockWidth) / 2);
                        $startY = ((windowHeight - totalBlockHeight) / 2) + (correction) - offset * (containers.length -1 );
                    }

                containers.forEach(async (container, index) => {

                    if ($isDesktop) {
                        x = $startX + index * offset;
                        y = $startY + index * offset;
                    } else if ($isMobileDevice) {
                        x = $startX;
                        y = $startY + index * offset;
                    }

                    initialPositions[index] = { x, y };
                    container.style.transition = 'transform 0.3s ease-in-out';
                    container.style.transformOrigin = 'top left';
                    container.style.transform = `translateX(${x}px) translateY(${y}px)`;
                    container.setAttribute('data-x', x);
                    container.setAttribute('data-y', y);
                    container.style.zIndex = -index + 4;

                    container.setAttribute('data-index', index);

                    const cardData = Object.values(data.cardsDb)[index];
                    if (cardData && cardData.bgColor) {
                        container.style.backgroundColor = cardData.bgColor;
                    }
                    
                    setTimeout(() => {
                        container.style.transition = '';
                    }, 300);

                
                    if ($waitForHash) {
                        //If we arrive with a hash value, so a sharing link, we need to focus the correct card
                        setTimeout(() => {
                            setTimeout(() => {
                                container.style.opacity = '1';
                            }, index * 125);
                            areCardsLoaded.set(true);
                        }, 1000);
                    } else {
                        //If not the functioning is normal
                        setTimeout(() => {
                            setTimeout(() => {
                                container.style.opacity = '1';
                            }, index * 125);
                            areCardsLoaded.set(true);
                        }, 500);
                    }
                    });

                    $isPageLoaded = true;
                }

        }, 10);
        
    }

    const swapCards = (event) => {
        alignColor(event.getAttribute("data-section"));

        const swapDuration = transitionTime * 300;
        const clickedCard = event;
        const clickedFlushOrder = Number(clickedCard.dataset.flushOrder);
        const topCard = Array.from(containers).find(container => container.dataset.flushOrder === "1");
        const cubicBezier = ".1,.0,.0,.1";

        if (!topCard || isSwapping) {
            // console.log("Swap not possible - either no top card or swap in progress");
            return;
        }

        if (clickedCard.dataset.flushOrder === "1") {
            return;
        }

        isSwapping = true;
        isInteractionLocked = true;

        const clickedCardY = Number(clickedCard.dataset.y);
        const clickedCardX = Number(clickedCard.dataset.x);
        
        const topCardY = Number(topCard.dataset.y);
        const topCardX = Number(topCard.dataset.x);

        // Disable pointer events during animation
        containers.forEach(container => {
            container.style.pointerEvents = 'none';
            container.style.touchAction = 'none';
        });

        clickedCard.style.transition = `transform ${swapDuration}ms ${transitionCurve}`;
        topCard.style.transition = `transform ${swapDuration}ms ${transitionCurve} 100ms`;

        // Stage 1: Move cards to top/bottom positions
        clickedCard.style.transform = `translateX(${clickedCardX + 450}px) translateY(${topCardY}px) rotate(15deg)`;
        topCard.style.transform = `translateX(${topCardX - 450}px) translateY(${clickedCardY}px) rotate(-15deg)`;

        // Stage 2: After first movement, exchange flush orders
        setTimeout(() => {
            clickedCard.dataset.flushOrder = "1";
            topCard.dataset.flushOrder = clickedFlushOrder.toString();
            
            const currentTopZ = parseInt(topCard.style.zIndex || 0);
            const currentClickedZ = parseInt(clickedCard.style.zIndex || 0);
            
            clickedCard.style.zIndex = currentTopZ;
            topCard.style.zIndex = currentClickedZ;

            setTimeout(() => {
                clickedCard.style.transform = `translateX(${clickedCardX}px) translateY(${topCardY}px)`;
                topCard.style.transform = `translateX(${topCardX}px) translateY(${clickedCardY}px)`;

                // Final cleanup after animation
                setTimeout(() => {
                    clickedCard.setAttribute('data-y', topCardY);
                    topCard.setAttribute('data-y', clickedCardY);

                    // Re-enable pointer events
                    containers.forEach(container => {
                        container.style.pointerEvents = '';
                        container.style.touchAction = '';
                    });

                    isSwapping = false;
                    isInteractionLocked = false;
                    // console.log("Card swap animation complete");
                }, swapDuration);
            }, 100); // Small delay before final movement
        }, swapDuration);
    };

    const navigateToExercise = (exercise) => {
        $currentHash = window.location.hash;

        if (!$currentHash) {
            $waitForHash = false;
            return;
        }

        const cleanHash = $currentHash.replace('#', '');
        const isExerciseHash = cleanHash.includes('_');

        if (isExerciseHash) {
            $waitForHash = true;
            $isAlterEgoMode = false;

            const hashContainer = cleanHash.split('_')[0];
            const definedContainer = document.querySelector(`[data-section="${hashContainer}"]`);

            const hashSection = cleanHash.split('_').slice(1).join('_');
            const definedSection = document.querySelector(`[data-section="${hashSection}"]`);

            if (definedContainer) {
                $selectedCard = definedContainer.dataset.section;
            }

            if (definedContainer) {
                setTimeout(() => {
                    if ($isMobileDevice && $areCardsLoaded) {
                        swapCards(definedContainer);
                    } else if (!$isMobileDevice && $areCardsLoaded) {
                        definedContainer.style.zIndex = $highestZIndex + 1;
                        $highestZIndex = $highestZIndex + 1;
                    }
                    if (definedSection) {
                        definedSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 1100);
            }
        } else {
            /* ------------------------------ ALTER-EGO FLOW ------------------------------ */
            $waitForHash = true;
            $isAlterEgoMode = true;

            const alterEgosArr = Object.values(data.alterEgosDb);
            const cardsArr     = Object.values(data.cardsDb);
            const aeIndex = alterEgosArr.findIndex((ae) => ae.Title === cleanHash);

            if (aeIndex !== -1) {
                const hostCardTitle = cardsArr[aeIndex]?.Title;
                const definedContainer = document.querySelector(`[data-section="${hostCardTitle}"]`);
                const alterSection     = document.querySelector(`[data-section="${cleanHash}"]`);

                if (hostCardTitle) {
                    $selectedCard = hostCardTitle;
                }

                if (definedContainer) {
                    setTimeout(() => {
                        if ($isMobileDevice && $areCardsLoaded) {
                            swapCards(definedContainer);
                        } else if (!$isMobileDevice && $areCardsLoaded) {
                            definedContainer.style.zIndex = $highestZIndex + 1;
                            $highestZIndex = $highestZIndex + 1;
                        }
                        // Scroll to the alter-ego content if found
                        if (alterSection) {
                            alterSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 1100);
                }
            }
        }
    };

    let svgDoc = null;
    let svgText = null;
    let svgRoot = null;

    let instrumentSerifBase64;
    let instrumentSansBase64;
    let maxCharsPerLine;
    let lineHeightConfig;
    let defs;
    let style;
    let fontCache = {};
    let canvas;
    let ctx;
    let svgWidth; 
    let svgHeight;
    let svgScale = 2;
    let modifiedSvg;


    const loadFontAsBase64Cached = async (fontPath) => {
        if (fontCache[fontPath]) return fontCache[fontPath];

        const response = await fetch(fontPath);
        const buffer   = await response.arrayBuffer();
        const base64   = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        const dataUrl  = `data:font/truetype;base64,${base64}`;

        fontCache[fontPath] = dataUrl;
        return dataUrl;
    };

    let preloadFonts;
    
    const prepareSVG = async () => {
        
        if (!preloadFonts) {
            preloadFonts = Promise.all([
                loadFontAsBase64Cached('/fonts/InstrumentSerif-Regular.ttf'),
                loadFontAsBase64Cached('/fonts/InstrumentSans-Regular.ttf')
            ]).catch((e) => console.warn('Font pre-load failed:', e));
        }
        await preloadFonts;
        svgText = $isMobileDevice ? templateMobileSvg : templateDesktopSvg;

        instrumentSerifBase64 = fontCache['/fonts/InstrumentSerif-Regular.ttf'];
        instrumentSansBase64  = fontCache['/fonts/InstrumentSans-Regular.ttf'];
            
        const parser = new DOMParser();
        svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

        defs = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'defs');
        style = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style');
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

        svgRoot = svgDoc.documentElement;
        svgRoot.insertBefore(defs, svgRoot.firstChild);

        maxCharsPerLine = $isMobileDevice ? 50 : 75;
        
        const textLimits = {
            default: maxCharsPerLine,
            exDescription: $isMobileDevice ? 50 : 70,
            exText: $isMobileDevice ? 65 : 70,
            exTitle: $isMobileDevice ? 35 : 45
        };
            
        // Store text limits globally for use in other functions
        window.svgTextLimits = textLimits;
        
        lineHeightConfig = {
            exTitle: $isMobileDevice ? 1.05 : 1.1,      // Tighter line height on mobile
            exDescription: $isMobileDevice ? 1.25 : 1.3, // Slightly tighter on mobile
            exText: $isMobileDevice ? 1.35 : 1.4         // Slightly tighter on mobile
        };

        modifiedSvg = new XMLSerializer().serializeToString(svgDoc.documentElement);
            
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        
        svgWidth = parseFloat(svgRoot.getAttribute('width')) || 680;
        svgHeight = parseFloat(svgRoot.getAttribute('height')) || 474;
        
        canvas.width = svgWidth * svgScale;
        canvas.height = svgHeight * svgScale;
    }

    const stripHTML = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    // Helper function to calculate content height before rendering
    const calculateContentHeight = (title, description, text, baseFontSize = 16) => {
        if (!description && !text) return 0;

        let titleOffset = 0;
        if (title) {
            const titleLines = wrapText(stripHTML(title), 'exTitle').length;
            const titleLineHeight = baseFontSize * lineHeightConfig.exTitle;
            const singleLineHeight = titleLineHeight;
            const totalTitleHeight = titleLines * titleLineHeight;
            const extraTitleHeight = Math.max(0, totalTitleHeight - singleLineHeight);
            
            // Apply mobile scaling to reduce excessive spacing
            const mobileOffsetScale = $isMobileDevice ? 0.4 : 1.0;
            titleOffset = extraTitleHeight * mobileOffsetScale;
        }

        const descriptionLines = description ? wrapText(stripHTML(description), 'exDescription').length : 0;
        const textLines = text ? wrapText(stripHTML(text), 'exText').length : 0;
        
        const descriptionLineHeight = baseFontSize * lineHeightConfig.exDescription;
        const textLineHeight = baseFontSize * lineHeightConfig.exText;
        
        const descriptionHeight = descriptionLines * descriptionLineHeight;
        const textHeight = textLines * textLineHeight;
        const spacingHeight = (descriptionLines > 0 && textLines > 0) ? descriptionLineHeight * 0.5 : 0;
        // Eliminate additional spacing on mobile due to large font sizes
        const spacingMultiplier = $isMobileDevice ? 0 : 0.3;
        const additionalSpacing = titleOffset > 0 ? baseFontSize * spacingMultiplier : 0;
        
        return {
            titleOffset,
            descriptionLines,
            textLines,
            totalHeight: titleOffset + additionalSpacing + descriptionHeight + textHeight + spacingHeight,
            descriptionHeight,
            textHeight,
            spacingHeight,
            additionalSpacing
        };
    };

    const wrapText = (textToWrap, textType = 'default') => {
        // Validate input
        if (!textToWrap || typeof textToWrap !== 'string') {
            return [];
        }
        
        const textLimits = window.svgTextLimits
        const customMaxChars = textLimits[textType] || textLimits.default;
        
        const words = textToWrap.trim().split(' ');
        const lines = [];
        let currentLine = '';

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine ? `${currentLine} ${word}` : word;

            if (testLine.length <= customMaxChars) {
                currentLine = testLine;
            } else {
                if (currentLine) {
                    lines.push(currentLine);
                    currentLine = word;
                } else {
                    // Handle case where a single word is longer than the limit
                    lines.push(word);
                    currentLine = '';
                }
            }
        }

        if (currentLine) {
            lines.push(currentLine);
        }
        

        return lines;
    };

    const generateShareContent = async () => {
    // Helper function to determine if a color is dark
    const isColorDark = (hexColor) => {
        // Remove # if present
        const hex = hexColor.replace('#', '');
        
        // Convert to RGB
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Calculate brightness using luminance formula
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        // Return true if dark (brightness < 128)
        return brightness < 128;
    };

    $showSharer = true;
        
        setTimeout(() => {
            $sharingTextMobile = "Click here to share...";
            $sharerVisibility = true;
            console.log("sharerVisibility", $sharerVisibility)
        }, 1500);

    const workingSvgDoc = svgDoc.cloneNode(true);

    // Track title height for positioning adjustments
    let titleHeightOffset = 0;

    if ($shareData.title) {
        const titleElement = workingSvgDoc.querySelector('#Title');
        if (titleElement) {
            const firstTspan = titleElement.querySelector('tspan');
            if (firstTspan) {
                const x = firstTspan.getAttribute('x');
                const y = firstTspan.getAttribute('y');
                const dx = firstTspan.getAttribute('dx');
                const dy = firstTspan.getAttribute('dy');
                const transform = firstTspan.getAttribute('transform');

                titleElement.innerHTML = '';
                const newTspan = workingSvgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                if (x) newTspan.setAttribute('x', x);
                if (y) newTspan.setAttribute('y', y);
                if (dx) newTspan.setAttribute('dx', dx);
                if (dy) newTspan.setAttribute('dy', dy);
                if (transform) newTspan.setAttribute('transform', transform);
                newTspan.textContent = stripHTML($shareData.title);
                titleElement.appendChild(newTspan);
            } else {
                titleElement.textContent = stripHTML($shareData.title);
            }
        }
    }
        
    if ($shareData.exTitle) {
        const exTitleElement = workingSvgDoc.querySelector('#Ex_Title');
        
        if (exTitleElement) {
            const firstTspan = exTitleElement.querySelector('tspan');
            
            if (firstTspan) {
                const x = firstTspan.getAttribute('x');
                const y = firstTspan.getAttribute('y');
                const dx = firstTspan.getAttribute('dx');
                const dy = firstTspan.getAttribute('dy');
                const transform = firstTspan.getAttribute('transform');

                const fontSize = parseFloat(exTitleElement.getAttribute('font-size')) || 24;
                const lineHeight = fontSize * lineHeightConfig.exTitle;

                exTitleElement.innerHTML = '';

                // Strip HTML from title
                const strippedTitle = stripHTML($shareData.exTitle);

                // Use wrapText function for consistent wrapping
                const titleLines = wrapText(strippedTitle, 'exTitle');

                let currentY = parseFloat(y);

                // Create tspan for each line
                titleLines.forEach((line, index) => {
                    const tspan = workingSvgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                    if (x) tspan.setAttribute('x', x);
                    tspan.setAttribute('y', currentY.toString());
                    if (dx && index === 0) tspan.setAttribute('dx', dx); // Only first line gets dx
                    if (dy && index === 0) tspan.setAttribute('dy', dy); // Only first line gets dy
                    if (transform) tspan.setAttribute('transform', transform);
                    tspan.textContent = line;
                    exTitleElement.appendChild(tspan);

                    currentY += lineHeight;
                });

                const totalTitleHeight = currentY - parseFloat(y);
                const singleLineHeight = lineHeight;
                const extraTitleHeight = Math.max(0, totalTitleHeight - singleLineHeight);
                
                // Apply mobile scaling to reduce excessive spacing
                const mobileOffsetScale = $isMobileDevice ? 0.4 : 1.0; // Reduce to 40% on mobile
                titleHeightOffset = extraTitleHeight * mobileOffsetScale;
                

            }
        }
    }
        
    if ($shareData.exText !== null && $shareData.exDescription !== null) {
        const exDescElement = workingSvgDoc.querySelector('#Ex_description');
        const firstTspan = exDescElement.querySelector('tspan');

        if (exDescElement) {
            const x = firstTspan.getAttribute('x');
            const y = firstTspan.getAttribute('y');
            const dx = firstTspan.getAttribute('dx');
            const dy = firstTspan.getAttribute('dy');
            const transform = firstTspan.getAttribute('transform');
            
            const fontSize = parseFloat(exDescElement.getAttribute('font-size')) || 16;
            const descriptionLineHeight = fontSize * lineHeightConfig.exDescription;
            const textLineHeight = fontSize * lineHeightConfig.exText;
            
            exDescElement.innerHTML = '';

            // Process description and text separately with different character limits
            const strippedDescription = stripHTML($shareData.exDescription);
            const strippedText = stripHTML($shareData.exText);

            // Adjust starting Y position based on title height
            // Eliminate additional spacing on mobile due to large font sizes
            const spacingMultiplier = $isMobileDevice ? 0 : 0.3;
            const additionalSpacing = titleHeightOffset > 0 ? fontSize * spacingMultiplier : 0;
            let currentY = parseFloat(y) + titleHeightOffset + additionalSpacing;
            


            // Process DESCRIPTION first with its specific character limit
            const descriptionLines = wrapText(strippedDescription, 'exDescription');
            
            // Process TEXT with its specific character limit
            const textLines = wrapText(strippedText, 'exText');
            
            // Combine all content lines
            let allContentLines = [];
            
            // Add description lines with type marker
            descriptionLines.forEach(line => {
                allContentLines.push({ text: line, type: 'description', lineHeight: descriptionLineHeight });
            });
            
            // Add spacing line between description and text if both exist
            if (descriptionLines.length > 0 && textLines.length > 0) {
                allContentLines.push({ text: '', type: 'spacing', lineHeight: descriptionLineHeight * 0.5 });
            }
            
            // Add text lines with type marker
            textLines.forEach(line => {
                allContentLines.push({ text: line, type: 'text', lineHeight: textLineHeight });
            });
            
            // Apply line limits based on device and background color
            let maxLines;
            const isDarkBackground = $shareData.bgColor && isColorDark($shareData.bgColor);
            if (!$isMobileDevice) {
                maxLines = isDarkBackground ? 15 : 6;
            } else {
                maxLines = isDarkBackground ? 26 : 10;
            }
            
            if (allContentLines.filter(line => line.text !== '').length > maxLines) {
                // Find the content line at the limit (excluding spacing)
                let contentLineCount = 0;
                let truncateIndex = -1;
                
                for (let i = 0; i < allContentLines.length; i++) {
                    if (allContentLines[i].text !== '') {
                        contentLineCount++;
                        if (contentLineCount === maxLines) {
                            truncateIndex = i;
                            break;
                        }
                    }
                }
                
                if (truncateIndex !== -1) {
                    // Truncate the last line and add ellipsis
                    const lastLine = allContentLines[truncateIndex];
                    const maxCharsForEllipsis = lastLine.text.length - 3; // Leave room for "..."
                    
                    if (maxCharsForEllipsis > 0) {
                        lastLine.text = lastLine.text.substring(0, maxCharsForEllipsis).trim() + '...';
                    } else {
                        lastLine.text = lastLine.text.trim() + '...';
                    }
                    
                    // Remove all lines after the truncation point
                    allContentLines = allContentLines.slice(0, truncateIndex + 1);
                }
            }
            
            // Render all content lines
            allContentLines.forEach((lineObj) => {
                if (lineObj.text === '' && lineObj.type === 'spacing') {
                    // Just add spacing, no tspan
                    currentY += lineObj.lineHeight;
                } else if (lineObj.text !== '') {
                    const tspan = workingSvgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                    tspan.setAttribute('x', x);
                    tspan.setAttribute('y', currentY.toString());
                    if (transform) tspan.setAttribute('transform', transform);
                    tspan.textContent = lineObj.text;
                    exDescElement.appendChild(tspan);
                    
                    currentY += lineObj.lineHeight;
                }
            });



        }
    }
        
    // Handle image element - either populate it with an image or remove it completely
    const legacyId = $isMobileDevice ? '#image1_777_3516' : '#image1_798_3654';
    let targetImage = workingSvgDoc.querySelector(legacyId);

    if ($shareData.exImage && $shareData.exImage.img?.src) {
        // Image is provided - populate the image element
        let imageUrl = new URL($shareData.exImage.img.src, window.location.origin).href;
        let imageEmbedded = false;

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
                    
                    let defs = workingSvgDoc.querySelector('defs');

                    if (!defs) {
                        defs = workingSvgDoc.createElementNS('http://www.w3.org/2000/svg', 'defs');
                        workingSvgDoc.documentElement.appendChild(defs);
                    }
                    
                    const filter = workingSvgDoc.createElementNS('http://www.w3.org/2000/svg', 'filter');
                    filter.setAttribute('id', 'grayscale');
                    const colorMatrix = workingSvgDoc.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
                    colorMatrix.setAttribute('type', 'saturate');
                    colorMatrix.setAttribute('values', '0');
                    filter.appendChild(colorMatrix);
                    defs.appendChild(filter);
                    targetImage.setAttribute('filter', 'url(#grayscale)');
                    
                    await new Promise(resolve => setTimeout(resolve, 100));
                    imageEmbedded = true;
                    
                }
            } catch (error) {
                // Try a simpler approach for mobile - just set the original URL
                if ($isMobileDevice) {
                    targetImage.setAttribute('href', imageUrl);
                    targetImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', imageUrl);
                }
            }
        }
    } else {
        // No image provided - remove the image element and color block completely
        if (targetImage) {
            targetImage.remove();
            console.log('🖼️ Image element removed from SVG (no image provided)');
        }
        
        // Also remove the Ex_colorBlock element
        const colorBlock = workingSvgDoc.querySelector('#Ex_colorBlock');
        if (colorBlock) {
            colorBlock.remove();
            console.log('🎨 Ex_colorBlock element removed from SVG (no image provided)');
        }
    }
        
    if ($shareData.bgColor) {
        const targetColor = '#FBC797'; //replacing bg color
        const allElements = workingSvgDoc.querySelectorAll('*');
        
        allElements.forEach(element => {
            const fillColor = element.getAttribute('fill');
            if (fillColor && (fillColor.toUpperCase() === targetColor.toUpperCase() || fillColor.toUpperCase() === 'FBC797')) {
                element.setAttribute('fill', $shareData.bgColor);
            }
        });

        // Check if the background color is dark and adjust text color accordingly
        if (isColorDark($shareData.bgColor)) {
            const textElements = workingSvgDoc.querySelectorAll('text');
            textElements.forEach(textElement => {
                const currentFill = textElement.getAttribute('fill');
                // Only change black text to white (preserve other colored text)
                if (!currentFill || currentFill === 'black' || currentFill === '#000000' || currentFill === '#000') {
                    textElement.setAttribute('fill', 'white');
                }
            });

            // Also check for tspan elements that might have fill attributes
            const tspanElements = workingSvgDoc.querySelectorAll('tspan');
            tspanElements.forEach(tspanElement => {
                const currentFill = tspanElement.getAttribute('fill');
                if (!currentFill || currentFill === 'black' || currentFill === '#000000' || currentFill === '#000') {
                    tspanElement.setAttribute('fill', 'white');
                }
            });
        }
    }
        
        
    const slug = (str) => (str || '')
        .toString()
        .replace(/<[^>]+>/g, '') // strip HTML
        .replace(/[^a-z0-9]+/gi, '_')
        .replace(/^_+|_+$/g, '')
        .substring(0, 25);

    const main = slug($shareData.title) || 'EL2MP';
    const ex = slug($shareData.exTitle) || 'Exercise';
    const filename = `${main}_${ex}.jpg`;
        
        // Serialize the modified SVG document
        modifiedSvg = new XMLSerializer().serializeToString(workingSvgDoc.documentElement);

        // Function to preload all images in the SVG
        const preloadSvgImages = async (svgString) => {
            const imageUrlMatches = svgString.match(/(?:href|xlink:href)="(data:image[^"]+)"/g) || [];
            const imageUrls = imageUrlMatches.map(match => match.split('"')[1]);
            
            if (imageUrls.length === 0) {
                return;
            }
            
            const imageLoadPromises = imageUrls.map((url, index) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                    img.src = url;
                });
            });
            
            await Promise.all(imageLoadPromises);
        };

        // Preload images before rendering
        await preloadSvgImages(modifiedSvg);

        const jpegFile = await new Promise((resolve, reject) => {
            const img = new Image();
            
            const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(modifiedSvg)));

            const timeout = setTimeout(() => {
                reject(new Error('Image loading timeout'));
            }, 10000); // 10 second timeout

            img.onload = () => {
                try {
                    clearTimeout(timeout);

                    setTimeout(() => {
                        try {
                            // Reset canvas context
                            ctx.setTransform(1, 0, 0, 1, 0, 0);
                            
                            ctx.fillStyle = 'white';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            ctx.scale(svgScale, svgScale);
                            ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
                            

                            
                            canvas.toBlob((blob) => {
                                
                                if (blob) {
                                    const file = new File([blob], filename, {
                                        type: 'image/jpeg',
                                        lastModified: new Date().getTime()
                                    });
                                    resolve(file);
                                    
                                } else {
                                    reject(new Error('Failed to create JPEG'));
                                }
                            }, 'image/jpeg', 0.92);
                        } catch (error) {
                            reject(error);
                        }
                    }, 200);
                } catch (error) {
                    clearTimeout(timeout);
                    reject(error);
                }
            };

            img.onerror = (error) => {
                clearTimeout(timeout);
                reject(new Error('Failed to load SVG'));
            };
            img.src = svgDataUrl;
        });
        
        const exLabel = $shareData.exTitle ? $shareData.exTitle.replace(/<[^>]+>/g, '') : 'Exercise';
        const blockLabel = $shareData.title ? $shareData.title.replace(/<[^>]+>/g, '') : 'Block';
        
        const MAX_DESC_LENGTH = 200;
        let desc = '';
        
        if ($shareData.exText) {
            const cleanText = stripHTML($shareData.exText).replace(/\s+/g, ' ').trim();
            desc = cleanText.length > MAX_DESC_LENGTH
                ? cleanText.slice(0, MAX_DESC_LENGTH).trimEnd() + '…'
                : cleanText;
        }
        
        const link = $shareData.url || window.location.href;
        const socialMessage =
          `\nExercise ${exLabel} | Block ${blockLabel}\n\n`+
          `${desc}`;
        
        $finalShareData = {
            text: socialMessage,
            url: link,
            files: [jpegFile]
        };
        
        const textOnlyPayload = {
            text: socialMessage,
            url: link
        };

        $shareInfo = {
            title: $shareData.title,
            exTitle: $shareData.exTitle,
            text: socialMessage,
            url: link
        };
        

    };

    const intentionalNavigationToHash = () => {
        navigateToExercise();
        window.location.reload();
    }

    onMount(async () => {
        const interact = (await import('interactjs')).default;
        const simpleBar = (await import('simplebar')).default;

        if (simplebarContainer) {
            new SimpleBar(simplebarContainer, {
                autoHide: false,
                scrollbarMinSize: 10,
            });
        }

        await tick();

        updateWindowSize();

        await tick();

        containers = document.querySelectorAll('.card_container')
        floaters = document.querySelectorAll('.floater_container')
        scrollContainers = document.querySelectorAll('.card_scrollable_container')
        textBoxes = document.querySelectorAll('.text-box-dx, .text-box-sx');
        scrollableElements = document.querySelectorAll('.card_scrollable_container')
        sections = document.querySelectorAll('.section_container');

        placeCards(containers);
        navigateToExercise();
        
        await prepareSVG();
        
        if ($isMobileDevice) {
            await containers;

            const containerYCorners = new Map();
            const containersIds = new Map();

            containers.forEach((container, index) => {
                initialsY = Number(container.dataset.y);
                containerYCorners.set(container, initialsY);
                containersIds.set(container, container.id);

                if (!container.dataset.flushOrder) {
                    container.dataset.flushOrder = (index + 1).toString();
                }
            });
            
            bottomYCorner = Number(containers[0].dataset.y);
          
            topYCorner = Number(containers[containers.length - 1].dataset.y);

        }

        if (!$isMobileDevice) {
            containers.forEach(container => {
            container.classList.add('grab');
            container.style.touchAction = 'none';

            interact(container).draggable({

                inertia: {
                    resistance: 15,
                    minSpeed: 100,
                    endSpeed: 20,
                    smoothEndDuration: 500,
                },

                listeners: {
                    start(event) {
                        bringToFront(event);

                        const index = event.target.getAttribute('data-index');

                        const cardData = Object.values(data.cardsDb)[index];

                        if (cardData && cardData.Title) {
                            $selectedCard = cardData.Title;
                            if (!$isAlterEgoMode) {
                                //openFloaters(floaters);
                            }
                        }

                        event.target.classList.remove('grab');
                        event.target.classList.add('grabbing');
                        event.target.style.cursor = 'grabbing';
                        
                    },

                    move(event) {
                        const x = (parseFloat(container.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(container.getAttribute('data-y')) || 0) + event.dy;

                        container.style.transform = `translate(${x}px, ${y}px)`;
                        container.setAttribute('data-x', x);
                        container.setAttribute('data-y', y);
                        
                    },

                    end(event) {

                        event.target.classList.remove('grabbing');
                        event.target.classList.add('grab');
                        event.target.style.cursor = 'grab';
                    },
                },
                modifiers: [
                    interact.modifiers.restrict({
                        restriction: hostElement,
                        endOnly: true,
                    }),
                ],
                inertia: true,
            });
        });
        } else {return}

        if (!$isMobileDevice) {
            floaters.forEach((floater, index) => {
                floater.classList.add('grab');
                floater.style.touchAction = 'none';
                floater.style.transition = 'opacity 0s linear';

                setTimeout(() => {
                    floater.style.opacity = '1';
                }, 1650 + index * 50); 

                floater.style.transformOrigin = 'bottom left';

                // Initialize floating animation variables
                const floatingSpeedBase = 0.0000001 + Math.random() * 0.0001;
                const oscillationFrequency = 0.001;
                const sineOffset = Math.random() * 2 * Math.PI; 
                let floatX = 0;
                let floatY = 0;
                let directionX = Math.random() > 0.5 ? 1 : -1;
                let directionY = Math.random() > 0.5 ? 1 : -1;

                // Start floating animation
                const animateFloating = () => {
                    const time = Date.now();

                    // Calculate oscillating speed
                    const floatingSpeed = floatingSpeedBase * (1 + Math.sin(time * oscillationFrequency + sineOffset));

                    const directionalOscillationX = Math.sin(time * 0.0001);
                    const directionalOscillationY = Math.cos(time * 0.0001);

                    // Update floating positions
                    floatX += directionX * floatingSpeed * directionalOscillationX;
                    floatY += directionY * floatingSpeed * directionalOscillationY;

                    // Get floater dimensions and viewport size
                    const floaterRect = floater.getBoundingClientRect();
                    const viewportWidth = windowWidth;
                    const viewportHeight = windowHeight;

                    const floaterBottom = floaterRect.bottom;
                    const floaterLeft = floaterRect.left; 

                    const paddingTop = 0; // Padding for the top boundary
                    const paddingRight = 30; // Padding for the right boundary

                    // Calculate corners
                    const floaterBottomLeftX = floaterRect.left + floatX;
                    const floaterBottomLeftY = floaterRect.bottom - floatY;

                    const floaterBottomRightX = floaterRect.right + floatX;
                    const floaterBottomRightY = floaterRect.bottom - floatY;

                    const floaterTopLeftX = floaterRect.left + floatX;
                    const floaterTopLeftY = floaterRect.top - floatY;

                    const floaterTopRightX = floaterRect.right + floatX;
                    const floaterTopRightY = floaterRect.top - floatY;


                    // Left and right boundaries
                    if (floaterBottomLeftX < 0 || floaterBottomRightX > viewportWidth - paddingRight) {
                        directionX *= -1;
                        floatX = 0; // Reset to prevent overshooting
                    }

                    // Top and bottom boundaries
                    if (floaterTopLeftY < paddingTop || floaterBottomLeftY > viewportHeight) {
                        directionY *= -1;
                        floatY = 0; // Reset to prevent overshooting
                    }

                    // Apply floating transform
                    const currentX = parseFloat(floater.getAttribute('data-x')) || 0;
                    const currentY = parseFloat(floater.getAttribute('data-y')) || 0;
                    floater.style.transform = `translate(${currentX + floatX}px, ${currentY + floatY}px)`;

                    // Store updated coordinates
                    floater.setAttribute('data-x', currentX + floatX);
                    floater.setAttribute('data-y', currentY + floatY);

                    requestAnimationFrame(animateFloating);
                };

                requestAnimationFrame(animateFloating);

                interact(floater).draggable({
                    inertia: {
                        resistance: 20,
                        minSpeed: 80,
                        endSpeed: 10,
                        smoothEndDuration: 400,
                    },
                    listeners: {
                        start(event) {
                            // Bring the floater to the front
                            floater.style.zIndex = parseInt(floater.style.zIndex || 1) + 1;

                            // Get current transform values and calculate actual position
                            const computedStyle = window.getComputedStyle(floater);
                            const transform = computedStyle.transform;

                            if (transform && transform !== "none") {
                                const matrix = new DOMMatrix(transform);
                                const currentX = matrix.m41; // Translate X value
                                const currentY = matrix.m42; // Translate Y value

                                // Set data attributes for accurate dragging
                                floater.setAttribute("data-x", currentX);
                                floater.setAttribute("data-y", currentY);
                            } else {
                                // If no transform is applied, set to default (0, 0)
                                floater.setAttribute("data-x", 0);
                                floater.setAttribute("data-y", 0);
                            }

                            event.target.classList.remove("grab");
                            event.target.style.cursor = "grabbing";
                        },

                        move(event) {
                            // Calculate new position during dragging
                            const x = (parseFloat(floater.getAttribute("data-x")) || 0) + event.dx;
                            const y = (parseFloat(floater.getAttribute("data-y")) || 0) + event.dy;

                            // Reset floating offsets during drag
                            floatX = 0;
                            floatY = 0;

                            // Apply the transformation and update attributes
                            floater.style.transform = `translate(${x}px, ${y}px)`;
                            floater.setAttribute("data-x", x);
                            floater.setAttribute("data-y", y);

                            floaterPositions[index] = { x, y };
                        },
                        end(event) {
                            // Reset cursor after drag ends
                            event.target.classList.remove("grabbing");
                            event.target.style.cursor = "grab";
                        },
                    },
                    modifiers: [
                        interact.modifiers.restrict({
                            restriction: hostElement,
                            endOnly: true,
                        }),
                    ],
                    inertia: true,
                });
            });
        } else {return}

        

        if (!$isMobileDevice) {
            textBoxes.forEach((textBox) => {
                textBox.classList.add('grab');
                textBox.style.touchAction = 'none';
                
                // Initialize position attributes if not already set
                if (!textBox.hasAttribute('data-x')) {
                    textBox.setAttribute('data-x', 0);
                }
                if (!textBox.hasAttribute('data-y')) {
                    textBox.setAttribute('data-y', 0);
                }

                interact(textBox).draggable({
                    inertia: {
                        resistance: 15,
                        minSpeed: 100,
                        endSpeed: 20,
                        smoothEndDuration: 500,
                    },
                    listeners: {
                        start(event) {
                            bringToFront(event);
                            event.target.classList.remove("grab");
                            event.target.style.cursor = "grabbing";
                            // Remove transition during drag
                            event.target.style.transition = 'none';
                        },
                        move(event) {
                            const x = (parseFloat(textBox.getAttribute('data-x')) || 0) + event.dx;
                            const y = (parseFloat(textBox.getAttribute('data-y')) || 0) + event.dy;

                            textBox.style.transform = `translate(${x}px, ${y}px)`;
                            textBox.setAttribute('data-x', x);
                            textBox.setAttribute('data-y', y);
                        },
                        end(event) {
                            event.target.classList.remove("grabbing");
                            event.target.style.cursor = "grab";
                            // Re-enable transition after drag
                            event.target.style.transition = 'transform var(--transition-times) var(--transition-curve)';
                        }
                    },
                    modifiers: [
                        interact.modifiers.restrict({
                            restriction: hostElement,
                            endOnly: true,
                        }),
                    ],
                    inertia: true,
                });
        });
        } else {return}

        
    }); 

    onDestroy(() => {
        try {
            window.removeEventListener('hashchange', navigateToExercise);
        } catch {}
        
        // Cancel any animation frames or timeouts
        if (typeof holdTimeout !== 'undefined' && holdTimeout) {
            clearTimeout(holdTimeout);
        }
        
        // Clean up interact.js event handlers
        const cleanupInteract = () => {
            if (interact) {
                // Clean up containers
                if (containers) {
                    containers.forEach(container => {
                        try {
                            interact(container).unset();
                        } catch (e) {
                            // console.log("Could not cleanup container interact handlers");
                        }
                    });
                }
                
                // Clean up floaters
                if (floaters) {
                    floaters.forEach(floater => {
                        try {
                            interact(floater).unset();
                        } catch (e) {
                            // console.log("Could not cleanup floater interact handlers");
                        }
                        
                        // Cancel animations and transitions
                        if (floater.style) {
                            floater.style.animation = 'none';
                            floater.style.transition = 'none';
                        }
                    });
                }
                
                // Clean up text boxes
                if (textBoxes) {
                    textBoxes.forEach(textBox => {
                        try {
                            interact(textBox).unset();
                        } catch (e) {
                            // console.log("Could not cleanup textBox interact handlers");
                        }
                    });
                }
            }
        };
        
        // Clean up event listeners on DOM elements
        const cleanupEventListeners = () => {
            // Clean up section event listeners
            if (sections) {
                sections.forEach(section => {
                    try {
                        section.removeEventListener("mouseenter", null);
                    } catch (e) {
                        // console.log("Could not remove mouseenter listener");
                    }
                });
            }
            
            // Clean up container event listeners
            if (containers) {
                containers.forEach(container => {
                    try {
                        container.removeEventListener("click", null);
                    } catch (e) {
                        // console.log("Could not remove click listener from container");
                    }
                });
            }
            
            // Clean up scroll container event listeners
            if (scrollContainers) {
                scrollContainers.forEach(scrollContainer => {
                    try {
                        scrollContainer.removeEventListener("click", null);
                    } catch (e) {
                        // console.log("Could not remove click listener from scroll container");
                    }
                });
            }
        };
        
        // Clean up any observers
        const cleanupObservers = () => {
            if (currentObserver) {
                try {
                    currentObserver.disconnect();
                } catch (e) {
                    // console.log("Could not disconnect observer");
                }
            }
        };
        
        // Clear references to DOM elements to help garbage collection
        const clearReferences = () => {
            containers = null;
            floaters = null;
            textBoxes = null;
            scrollContainers = null;
            hostElement = null;
            simplebarContainer = null;
            scrollableElements = null;
            sections = null;
            
            // Clear arrays
            initialPositions = [];
            floaterPositions = [];
            
            // Clear interact reference
            interact = null;
        };
        
        // Execute all cleanup functions
        cleanupInteract();
        cleanupEventListeners();
        cleanupObservers();
        clearReferences();
        
        //console.log("Component cleanup complete");
    });

</script>



{#if !$isPageLoaded}
    <div class="loading_text"
        out:fade={{ duration: 300 }}
    >
        <p class="p3">Loading...</p>
    </div>
{/if}


<Sharer />

<div class="content_container" bind:this={contentContainer}>

    <section class="host" bind:this={hostElement}>
        {#if isInteractionLocked}
            <div class="global_interaction_lock" aria-hidden="true"></div>
        {/if}

        {#if !$isMobileDevice}
            <Textbox bringToFront={bringToFront}/>
        {/if}

        
        {#if $windowSizeReady}

            <Slider />

            {#each Object.values(data.cardsDb) as card (card.IndexNum)}
                <Capitols
                    {data}
                    {card}
                    transitionDelay = {getCardFlushOrder(card) * 10}
                    alterEgoCard={data.alterEgosDb[`Card${card.IndexNum}`]}
                    bringToFront = {bringToFront}
                    swapCards = {swapCards}
                    simplebarContainer = {simplebarContainer}
                    logoImage = {data.logoImage}
                    generateShareContent = {generateShareContent()}
                />
            {/each}

            {#if !$isMobileDevice}
                {#each Object.values(data.floatersDb) as singleFloater, index (singleFloater.id)}
                    <Floater
                        data={singleFloater}
                        randomPosition={calculateRandomPosition(singleFloater)}
                    />
                {/each}
            {/if}

            <VademecumFloater 
                bind:this={vademecumFloater}
                randomPosition={calculateRandomPosition(vademecumFloater)}
                title="ARTIFICIAL INQUIRIES"
                fileRef="/Artificial_Inquiries_Vademecum.pdf"
                img={vademecumImage}
                type="download"
            />

            <VademecumFloater 
                bind:this={tediumFloater}
                randomPosition={calculateRandomPosition(tediumFloater)}
                title="TEDIUM: EXHIBITION"
                fileRef="/tedium"
                img={tediumImage}
                type="navigator"
            />

            <button class="burger_menu" aria-label="Burger menu" onclick={() => $isBurgerMenuOpen = !$isBurgerMenuOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </button>

            {#if $isBurgerMenuOpen}
                <div class="burger_overlay">
                    <div class="burger_content">
                        <div class="burger_index">
                            <a href="/Artificial_Inquiries_Vademecum.pdf" download data-sveltekit-reload>
                                <div>
                                    <h2>
                                        Download the book
                                        
                                    </h2>
                                    <div class="inline_svg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                                    </div>
                                </div>
                                
                                <p class="p1">
                                    Download "Artificial Inquiries", the book of exercises which is both the base and the outcome of Ecologies of LLM Practices project.
                                </p>
                            </a>

                            <a href="/tedium" onclick={() => goto('/tedium')} data-sveltekit-reload>
                                <div>
                                    <h2>
                                        Tedium:exhibition
                                        
                                    </h2>
                                    <div class="inline_svg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M160-80q-33 0-56.5-23.5T80-160v-480q0-33 23.5-56.5T160-720h160l160-160 160 160h160q33 0 56.5 23.5T880-640v480q0 33-23.5 56.5T800-80H160Zm0-80h640v-480H160v480Zm80-80h480L570-440 450-280l-90-120-120 160Zm460-200q25 0 42.5-17.5T760-500q0-25-17.5-42.5T700-560q-25 0-42.5 17.5T640-500q0 25 17.5 42.5T700-440ZM404-720h152l-76-76-76 76ZM160-160v-480 480Z"/></svg>
                                    </div>
                                </div>
                                
                                <p class="p1">
                                    Tedium is the exhibition displayed at Hype-Studies conference in Barcelona. It showcases the boredom of daily LLMs usage.
                                </p>
                            </a>

                            <a href="#Qualifying_" aria-label="Qualifying" data-sveltekit-reload onclick={() => setTimeout(() => intentionalNavigationToHash(), 100)}>
                                <div>
                                    <h2>
                                        Exercises 
                                    </h2>
                                    <div class="inline_svg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>
                                    </div>
                                </div>
                                
                                <p class="p1">
                                    Access all the exercises abstract of the project, divided in the 5 key blocks. Each of them is designed for replicability, to be paired with the Artificial Inquiries pdf.
                                </p>
                            </a>

                            <a href="#Contacts" aria-label="Contacts" data-sveltekit-reload>
                                <div>
                                    <h2>
                                        Contacts 
                                    </h2>
                                    <div class="inline_svg">
                                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="M480-400q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400ZM320-240h320v-23q0-24-13-44t-36-30q-26-11-53.5-17t-57.5-6q-30 0-57.5 6T369-337q-23 10-36 30t-13 44v23ZM720-80H240q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80Zm0-80v-446L526-800H240v640h480Zm-480 0v-640 640Z"/></svg>
                                    </div>
                                </div>
                                
                                <p class="p1">
                                    We are a team of designers and researchers, deeply interested on fostering the dialogue around common integration of LLMs in professional practices.
                                </p>
                            </a>
                        </div>
                        
                        <div class="burger_logo">
                            <img src={data.logoImage} alt="EL2MP Logo">
                        </div>
                    </div>
                    
                </div>

                

                <div class="burger_bg"></div>
                
            {/if}

            <LogoButton
                logoImage = {data.logoImage}
            />

        {/if}

    </section>
   
</div>


<style global>

    :global(.content_container){
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        background-color: transparent;

        @media (max-width: 768px) {
            height: 100%;
            width: 100%;
            max-height: 100vh;
            max-width: 100vw;
            display: block;
            justify-content: start;
            margin: 0;
            padding: 0;
            overflow-y: auto;
        }
    }

    :global(.host) {
        width: 100%;
        max-width: 100vw;
        max-width: 100dvw;
        max-height: 100vh;
        height: 100%;
        overflow: hidden;
        position: relative;
        z-index: 6;
        background-color: transparent;

        @media (max-width: 768px) {
            display: grid;
            grid-template-rows: auto 1fr; /* LogoButton takes auto height, container takes remaining */
            position: static;
            height: 100vh;
            height: 100dvh; /* Modern viewport height */
            overflow: hidden;
        }
    }

    :global(.grab) {
        cursor: grab !important;
        
    }
    /* Further on if we need to customize the grabbing state, we can add a class to the grabbing state */
    :global(.grabbing) {
        cursor: grabbing !important;
    }

    /* Base styles for html and body */
    :global(html) {
        box-sizing: border-box; /* Ensures consistent box model */
        font-size: 16px; /* Sets the root font size */
        scroll-behavior: smooth; /* Enables smooth scrolling */
        line-height: 1.5; /* Improves readability */
        -webkit-font-smoothing: antialiased; /* Improves font rendering on WebKit */
        -moz-osx-font-smoothing: grayscale; /* Improves font rendering on macOS */
        overflow: hidden;
        background-color: white !important;
        background-image: url('/og_images/background.jpg');
        background-size: 1000px;
        background-position: center;
        background-repeat: repeat;
        background-attachment: fixed;
        max-width: 100vw;
        max-height: 100vh;
    }

    :global(.major_div) {
        width: 100%;
        height: 100%;
        overflow: hidden;

        @media (max-width: 768px) {
            width: 100%;
            height: 100%;
            overflow: hidden;
                
        }
    }
    

    @media (min-width: 1920px) {
        :global(:root) {
            /* Scale all spacing values by 1.2 */
            --scaling_var: 1.5;
            --spacing-XS: calc(0.3125em * var(--scaling_var));  /* 5px * 1.2 */
            --spacing-S: calc(0.625em * var(--scaling_var));    /* 10px * 1.2 */
            --spacing-M: calc(0.9375em * var(--scaling_var));   /* 15px * 1.2 */
            --spacing-L: calc(1.875em * var(--scaling_var));    /* 30px * 1.2 */
            --spacing-XL: calc(3.75em * var(--scaling_var));    /* 60px * 1.2 */
            --spacing-2XL: calc(7.5em * var(--scaling_var));    /* 120px * 1.2 */
            --spacing-3XL: calc(15em * var(--scaling_var));     /* 240px * 1.2 */
        }
    }

    .loading_text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
    }

    

    .global_interaction_lock {
        position: fixed;
        inset: 0;
        z-index: 10000;
        background: transparent;
        pointer-events: all;
        /* Prevent focus while active */
        -webkit-tap-highlight-color: transparent;
    }

    .burger_menu {
        display: none;
    }
    
    

    @media only screen and (max-width: 768px) {

        :global(h1) {
            font-size: 48px;
        }

        :global(h2) {
            font-size: 22px;
        }

        :global(.p1) {
            font-size: 18px;
        }

        :global(.p2) {
            font-size: 14px;
        }

        :global(.p3) {
            font-size: 14px;
        }

        .loading_text {
            display: block;
        }

        .burger_menu {
            display: flex;
            position: fixed;
            right: 20px;
            top: 1vh;
            background-color: #f0f0f0;
            height: 40px;
            padding: 10px;
            border-radius: var(--slider-radius);
            place-content: center;
            align-items: center;
            z-index: 502;
        }

        .burger_menu > svg {
            width: 100%;
            height: auto;
        }

        .burger_bg {
            width: 100vw;
            height: 100vh;
            z-index: 499;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .burger_overlay {
            width: auto;
            height: 88%;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 501;
            background-color: white;
            border-radius: var(--slider-radius);
            border: 1px solid black;
            margin: 20px;
            padding: 20px;
        }

        .burger_content {
            display: flex;
            height: 100%;
            flex-direction: column;
            row-gap: 20px;
            position: relative;
            justify-content: space-between;
            align-items: flex-start;
            overflow-y: scroll ;
        }

        .burger_index {
            display: flex;
            flex-direction: column;
            row-gap: var(--spacing-L);
            justify-content: flex-start;
            align-items: flex-start;
        }

        .burger_index > a {
            text-decoration: none;
            color: black;
            display: flex;
            flex-direction: column;
            row-gap: 5px;
            justify-content: flex-start;
            align-items: flex-start;
        }

        .burger_index > a > div {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            column-gap: 10px;
        }

        .burger_index > a > div > h2 {
            font-size: 32px;
        }

        .inline_svg {
            display: inline-block;
            place-content: center;
            align-items: center;
            width: 25px;
            height: 25px;
        }

        .inline_svg > svg {
            fill: rgb(48, 48, 48);
            align-self: center;
            place-self: center;
        }

        .burger_logo {
            bottom: 10px;
            width: 50%;
            object-fit: contain;
            overflow: hidden;
            place-self: center;
        }
    }


</style>