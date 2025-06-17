<script>
    export let data

    import Capitols from "$lib/components/cards/capitols.svelte"; 
    import LogoButton from "$lib/components/buttons/logo_button.svelte";
    import Floater from "$lib/components/floaters.svelte";
    import Textbox from "$lib/components/textboxes.svelte";
    import Slider from "$lib/components/buttons/slider.svelte";
    import VademecumFloater from "$lib/components/vademecum_floater.svelte";

    import { onMount, onDestroy, tick } from "svelte";
    import { writable } from "svelte/store";
    import { fade } from "svelte/transition";

    // Here we start to implement more stores
    import { currentHash, selectedCard, isAlterEgoMode, currentCardColor, highestZIndex, lastCardColor, isDesktop, isMobileDevice, startX, startY, transitionTime, transitionCurve, currentFocus, isPageLoaded } from '$lib/stores/globalStores';

    let interact, vademecumFloater;
    let totalBlockWidth, totalBlockHeight, x, y, topLeftCornerX, topLeftCornerY, windowWidth, windowHeight, initialsY, topYCorner, bottomYCorner, initialX;

    let width = 0;
    let height = 0;

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

    const areCardsLoaded = writable(false);

    const waitForHash = writable(false);

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

    const detectDeviceType = () => {
        return window.innerWidth <= 768 ? 'mobile' : 'desktop';
    };

    const updateWindowSize = () => {
        width = window.innerWidth;
        height = window.innerHeight;

        const currentType = detectDeviceType();

        tick();

        if (currentType !== lastDeviceType) {
            lastDeviceType = currentType;

            $isMobileDevice = currentType === 'mobile';
            $isDesktop      = currentType === 'desktop';

            placeCards(containers);
        }
    };

    const bringToFront = (eventOrElement) => {
        const frontingTarget = eventOrElement.currentTarget || eventOrElement;
        $highestZIndex += 1;
        frontingTarget.style.zIndex = $highestZIndex;
    };


    const setupMouseDetection = () => {

        containers.forEach((container) => {
            container.addEventListener("click", (event) => {
                $selectedCard = container.getAttribute("data-section");
                if (!$isAlterEgoMode) {
                    //openFloaters(floaters);
                } else {
                    return
                }
            });
        });

        scrollContainers.forEach((scrollContainer) => {
            scrollContainer.addEventListener("click", (event) => {
                $selectedCard = scrollContainer.getAttribute("data-section");
                if (!$isAlterEgoMode) {
                    //openFloaters(floaters);
                }
            });
        });
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
    
    //Floaters filtering
    $: if (!$isAlterEgoMode && $selectedCard && floaters) {
        console.log("Filtering floaters for card", $selectedCard);

        floaters.forEach((floater) => {
            if ($selectedCard !== 'all' && floater.dataset.parent !== $selectedCard) {
                floater.style.display = 'none';
            } else if (floater.dataset.parent === $selectedCard) {
                floater.style.display = 'flex';
            }
        });
    }
    
    const placeCards = async (containers) => {

        updateWindowSize();
        
        await containers;
        if (containers) {

            const firstCard = containers[0];

            containers.forEach(container => {
                container.style.height = '65%';
            });

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
                    offset = -45;
                    totalBlockWidth = cardWidth;
                    totalBlockHeight = cardHeight + ((containers.length - 1) * Math.abs(offset));
                    $startX = ((windowWidth - totalBlockWidth) / 2);
                    $startY = ((windowHeight - totalBlockHeight) / 2) - offset * (containers.length -1 );
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
                    // console.log("Card swap animation complete");
                }, swapDuration);
            }, 100); // Small delay before final movement
        }, swapDuration);
    };

    const navigateToExercise = (exercise) => {
        $currentHash = window.location.hash;
        //console.log("currentHash:", $currentHash);

        if ($currentHash) {
            $waitForHash = true;

            $isAlterEgoMode = false;
            const hashContainer = $currentHash ? $currentHash.split('_')[0].replace('#', '') : '';
            const definedContainer = document.querySelector(`[data-section="${hashContainer}"]`);

            const hashSection = $currentHash ? $currentHash.split('_').slice(1).join('_').replace('#', '') : '';
            const definedSection = document.querySelector(`[data-section="${hashSection}"]`);
            
            $selectedCard = definedContainer.dataset.section;

            if (definedContainer && definedSection) {
                setTimeout(() => {

                    if ($isMobileDevice && $areCardsLoaded) {
                        swapCards(definedContainer);
                    } else if (!$isMobileDevice && $areCardsLoaded) {
                        definedContainer.style.zIndex = $highestZIndex + 1;
                        $highestZIndex = $highestZIndex + 1;
                    }
                    
                    definedSection.scrollIntoView({ 
                        behavior: 'smooth',
                        //block: 'start',
                        //inline: 'nearest'
                    });
                }, 1100);
            }  

        } else {
            $waitForHash = false;
            return;
        } 

    }

    onMount(async () => {
        updateWindowSize();
        await navigateToExercise();

        const interact = (await import('interactjs')).default;
        const simpleBar = (await import('simplebar')).default;
        
        //window.addEventListener('resize', updateWindowSize);

        if (simplebarContainer) {
            new SimpleBar(simplebarContainer, {
                autoHide: false,
                scrollbarMinSize: 10,
            });
        }

        containers = document.querySelectorAll('.card_container')
        floaters = document.querySelectorAll('.floater_container')
        scrollContainers = document.querySelectorAll('.card_scrollable_container')
        textBoxes = document.querySelectorAll('.text-box-dx, .text-box-sx');
        scrollableElements = document.querySelectorAll('.card_scrollable_container')
        sections = document.querySelectorAll('.section_container');

        await window.innerWidth;
        await window.innerHeight;
        
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight; 
    
        placeCards(containers);

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

        setupMouseDetection();

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', updateWindowSize);
                clearInterval(interval);
            }
        };
        
    }); 

    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', updateWindowSize);
        }
        
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

<div class="content_container" bind:this={contentContainer}>

    <section class="host" bind:this={hostElement}>

        {#if !$isMobileDevice}
            <Textbox bringToFront={bringToFront}/>
        {/if}

        
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
        />

        <LogoButton
            logoImage = {data.logoImage}
        />

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
            height: 100vh;
            height: 100dvh; /* Dynamic viewport height for mobile */
            height: 100svh; /* Small viewport height as fallback */
            width: 100%;
            display: block;
            justify-content: start;
            margin: 0;
            padding: 0;
            overflow-y: auto;
        }
    }

    :global(.host) {
        width: 100%;
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
        background-image: url('/og_images/background.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
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

    :global(body) {
        margin: 0; /* Removes default body margin */
        padding: 0; /* Removes default body padding */
        color: #333; /* Default text color */
        background-color: transparent; /* Default background color */
        min-height: 100%;
        min-width: 100%;
        display: flex; /* Allows flexible layout setups */
        flex-direction: column; /* Stacks content vertically */
        align-items: center; /* Centers content horizontally */
        justify-content: flex-start; /* Aligns content at the top */
        overflow: hidden;
        scroll-behavior: none;
        touch-action: manipulation; /* Disable double-tap to zoom */

        @media (max-width: 768px) {
            height: 100%;
            max-height: 100vh;
        }
    }


    :global(button) {
        appearance: none; /* Removes default styles */
        font-family: inherit; /* Matches the button font with the surrounding text */
        font-size: 1rem; /* Ensures consistent sizing */
        font-weight: 400; /* Neutral font weight */
        line-height: 1.5; /* Comfortable line height */
        color: #333; /* Neutral text color */
        background-color: #f8f9fa; /* Neutral light gray background */

        border: 1px solid black; /* Light gray border */

        border-radius: 4px; /* Slight rounding for modern feel */
        padding: 0.5em 1em; /* Comfortable padding */
        text-align: center; /* Center-aligns text */
        display: inline-block; /* Suitable for buttons */
        transition: background-color 0.2s ease, border-color 0.2s ease,
            color 0.2s ease; /* Smooth hover effect */

        /*these are the stable classes */

        position: fixed;

        display: inline-flex;
        height: auto;
        width: auto;
        padding: var(--spacing-S, 10px);
        flex-shrink: 0;

        justify-content: flex-start;
        align-items: flex-start;

        background-color: #EAEAEA;
        cursor: pointer;
        z-index: 100;
    }

    :global(button:hover) {
        background-color: #D9D9D9;
        color: var(--full-black);
        cursor: pointer;
    }

    /* Ensure consistent box-sizing across all elements */
        :global(*),
        :global(*::before),
        :global(*::after) {
        box-sizing: inherit;
        /* scrollbar-color: black var(--full-black);
        scrollbar-width: thin;
        scrollbar-gutter: stable both-edges; */
    }

    /* Responsive Typography */
    :global(h1),
    :global(h2),
    :global(h3),
    :global(.h4),
    :global(.h5),
    :global(.h6) {
        margin: 0;
        font-weight: 600;
        line-height: 1.2;
    }

    /* Utility styles */
    :global(a) {
        text-decoration: none;
        color: inherit;
    }

    :global(img) {
        max-width: 100%;
        height: auto;
        display: block;
    }

    :global(ul),
    :global(ol) {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    :global(*) {
        margin: 0px;
        padding: 0px;
    }

    :global(:root) {
        --demi-white: #F7F7F7;
        --full-white: #FFFFFF;
        --full-black: #000000;
        --serif-font-family: 'Instrument Serif';
        --sans-font-family: 'Instrument Sans';
        --fallback-serif-font: 'serif';
        --fallback-sans-font: 'sans-serif';
        --transition-times: 1s;
        --transition-curve: cubic-bezier(.84,0,.75,1);

        interpolate-size: allow-keywords;

        /* SPACING SYSTEM */
        --spacing-XS: 0.3125em; /* 5px */
        --spacing-S: 0.625em;   /* 10px */
        --spacing-M: 0.9375em; /* 15px */
        --spacing-L: 1.875em;  /* 30px */
        --spacing-XL: 3.75em;  /* 60px */
        --spacing-2XL: 7.5em;  /* 120px */
        --spacing-3XL: 15em;   /* 240px */
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

    :global(h1) {
        font-size: 9vw;
        line-height: 1;

        @media (min-width: 1920px) {
            font-size: 12em;
        }

        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;
        user-select: none;
        touch-action: none;
    }

    :global(h2) {
        font-size: 3.15em; /* 60px */
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;
    }

    :global(h3) {
        font-size: 2.5em; /* 48px */
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;   
    }

    :global(.h4) {
        font-size: 1.7em;

        @media (min-width: 1920px) {
            font-size: 2.4em;
        }
        
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;
    }

    :global(.s1) {
        font-size: 1.125em;

        @media (min-width: 1920px) {
            font-size: 1.5em;
        }

        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
    }

    :global(.s2) {
        font-size: 0.875em; /* 14px */

        @media (min-width: 1920px) {
            font-size: 1.2em;
        }

        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
    }

    :global(.p1) {
        font-size: 2.3vw;
        line-height: 1.2;
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;

        @media (min-width: 1920px) {
                font-size: 1.5vw;
                margin-top: -0.14em;
        }
    }

    :global(.p2) {
        font-size: 2vw;
        line-height: 1.5;
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;

        @media (min-width: 1920px) {
                font-size: 1.4vw;
                margin-top: -0.14em;
        }
    }

    :global(.p3) {
        font-size: 1.4vw;
        line-height: 1.5;
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;

        @media (min-width: 1920px) {
                font-size: 1vw;
                line-height: 1.4;
                margin-top: -0.14em;
        }
    }

    :global(.caption) {
        font-size: 0.875em; /* 14px */
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;
        text-transform: uppercase;
    }

    .loading_text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
    }
    


    @media only screen and (max-width: 768px) {

        :global(h1) {
            font-size: 48px;
        }

        :global(h2) {
            font-size: 28px;
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
            display: none;
        }
    }


</style>