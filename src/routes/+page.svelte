<script>
    export let data

    import Capitols from "$lib/components/cards/capitols.svelte"; 
    import LogoButton from "$lib/components/buttons/logo_button.svelte";
    import Floater from "$lib/components/floaters.svelte";
    import Textbox from "$lib/components/textboxes.svelte";
    import Slider from "$lib/components/buttons/slider.svelte";
    import VademecumFloater from "$lib/components/vademecum_floater.svelte";

    import { onMount, onDestroy, tick } from "svelte";

    // Here we start to implement more stores
    import { selectedCard, isAlterEgoMode, currentCardColor, highestZIndex, lastCardColor, isDesktop, isMobileDevice, startX, startY, transitionTime, transitionCurve } from '$lib/stores/globalStores';

    let interactRef;
    let totalBlockWidth, totalBlockHeight, x, y, topLeftCornerX, topLeftCornerY, windowWidth, windowHeight, initialsY, topYCorner, bottomYCorner, initialX;

    let width = 0;
    let height = 0;

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

    //console.log("data.cardsDb", data.cardsDb)

    const detectDeviceType = () => {
        return window.innerWidth <= 768 ? 'mobile' : 'desktop';
    };

    const updateWindowSize = async () => {
        width = window.innerWidth;
        height = window.innerHeight;

        const currentType = detectDeviceType();

        await tick();

        if (currentType !== lastDeviceType) {
            lastDeviceType = currentType;

            $isMobileDevice = currentType === 'mobile';
            $isDesktop      = currentType === 'desktop';

            await placeCards(containers);
        }
    };

    const hideDesktopStuff = () => {

        if (containers) {
            containers.forEach(container => {
                container.style.display = 'none';
            });
        }

        // Hide all containers
        
        if (floaters) {
            floaters.forEach(floater => {
            floater.style.display = 'none';
        });
        }
    }

    const bringToFront = (event) => {
        const frontingTarget = event.currentTarget;
        $highestZIndex += 1;
        frontingTarget.style.zIndex = $highestZIndex;
    };

    
    const switch_alterego = () => {

        $isAlterEgoMode = !$isAlterEgoMode;
        
        if (floaters) {
            floaters.forEach(floater => {
                if ($isAlterEgoMode) {
                    floater.classList.remove('open');
                    floater.classList.add('closed');
                } else {
                    // When exiting alter ego mode, reopen the floaters
                    floater.classList.remove('closed');
                    floater.classList.add('open');
                }
            });
        }

        containers.forEach(card => {
            if ($isAlterEgoMode) {
                card.style.borderColor = 'white';
            } else {
                card.style.borderColor = 'black';
                hideFloaters();
            }
        });
    };

    const setupMouseDetection = () => {

        containers.forEach((container) => {
            container.addEventListener("click", (event) => {
                $selectedCard = container.getAttribute("data-section");
                if (!$isAlterEgoMode) {
                    openFloaters(floaters);
                } else {
                    return
                }
            });
        });

        scrollContainers.forEach((scrollContainer) => {
            scrollContainer.addEventListener("click", (event) => {
                $selectedCard = scrollContainer.getAttribute("data-section");
                if (!$isAlterEgoMode) {
                    openFloaters(floaters);
                }
            });
        });
    };

    const calculateRandomPosition = (floaterWidth = 100, floaterHeight = 50) => {
        if (typeof window === 'undefined') {
            return { top: "0px", left: "0px", zIndex: 0 };
        }

        // Define safety insets
        const safetyInset = 20;

        // Calculate grid rows and columns based on viewport size
        const columns = Math.floor((window.innerWidth - safetyInset * 2) / floaterWidth); // Number of columns
        const rows = Math.floor((window.innerHeight - safetyInset * 2) / floaterHeight); // Number of rows

        // Exclude the bottom row (don't place floaters in the last row)
        const validRows = rows - 1;

        // Calculate the available space for grid placement
        const gridWidth = window.innerWidth - safetyInset * 2;
        const gridHeight = window.innerHeight - safetyInset * 2;

        // Calculate the cell size based on the number of rows and columns
        const cellWidth = gridWidth / columns;
        const cellHeight = gridHeight / validRows;

        // Generate a random index for placement within valid rows and columns
        const row = Math.floor(Math.random() * validRows);
        const col = Math.floor(Math.random() * columns);

        // Calculate the top-left position based on the grid position
        const topPosition = safetyInset + row * cellHeight + (cellHeight - floaterHeight) / 2;
        const leftPosition = safetyInset + col * cellWidth + (cellWidth - floaterWidth) / 2;

        // Ensure floaters are within the viewport bounds (especially near the bottom)
        const validTopPosition = Math.min(topPosition, window.innerHeight - floaterHeight - safetyInset);
        const validLeftPosition = Math.min(leftPosition, window.innerWidth - floaterWidth - safetyInset);

        return {
            top: `${Math.round(validTopPosition)}px`,
            left: `${Math.round(validLeftPosition)}px`,
            zIndex: Math.floor(Math.random() * 1000), // Randomize zIndex
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
        if ($isAlterEgoMode) return;

        else {
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

    const hideFloaters = (card) => {
        if (!floaters) return;

            floaters.forEach((floater) => {
                if (card !== 'all' && floater.dataset.parent !== card) {
                    floater.style.display = 'none';
                } else {
                    floater.style.display = '';
                }
                
            floater.classList.remove('clicked');
            floater.classList.add('open');
        });
    };

    $: if ($isAlterEgoMode !== undefined) alignColor($selectedCard);
    $: if (!$isAlterEgoMode) hideFloaters($selectedCard);
    
    const placeCards = async (containers) => {

        updateWindowSize();
        await containers;
        if (containers) {

            const firstCard = containers[0];
            cardWidth = firstCard.getBoundingClientRect().width;
            cardHeight = firstCard.getBoundingClientRect().height;
            const opticalCorrection = -50;

            if ($isDesktop) {
                    // console.log("desktop");
                    offset = -30;
                    
                    // Get the actual rendered size of the first card container
                    
                    
                    totalBlockWidth = cardWidth + ((containers.length - 1) * Math.abs(offset));
                    totalBlockHeight = cardHeight + ((containers.length - 1) * Math.abs(offset));

                    $startX = ((windowWidth - totalBlockWidth) / 2) - offset * (containers.length) + opticalCorrection;
                    $startY = ((windowHeight - totalBlockHeight) / 2) - offset * (containers.length) + opticalCorrection;


                } else if ($isMobileDevice) {
                    // console.log("mobile");
                    offset = -45;
                    totalBlockWidth = cardWidth;
                    totalBlockHeight = cardHeight + ((containers.length - 1) * Math.abs(offset));
                    $startX = ((windowWidth - totalBlockWidth) / 2);
                    $startY = ((windowHeight - totalBlockHeight) / 2) - offset * (containers.length -1 );
                }

                // console.log("containers.length", containers.length);
                // console.log("windowWidth", windowWidth);
                // console.log("windowHeight", windowHeight);
                // console.log("totalBlockWidth", totalBlockWidth);
                // console.log("totalBlockHeight", totalBlockHeight);

            containers.forEach(async (container, index) => {

                if ($isDesktop) {
                    x = $startX + index * offset;
                    y = $startY + index * offset;
                } else if ($isMobileDevice) {
                    x = $startX;
                    y = $startY + index * offset;
                }

                // console.log(`startX of Card ${index}`, x);
                // console.log(`startY of Card ${index}`, y);

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

                container.style.opacity = '0';

                setTimeout(() => {
                    container.style.transition = '';
                }, 300);

                setTimeout(() => {
                    setTimeout(() => {
                        // container.style.display = 'block';
                        container.style.opacity = '1';
                    }, index * 125);
                }, 500);
                });
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
        // console.log("Starting card swap animation");

        // Get initial positions
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

    onMount(async () => {
        const interact = (await import('interactjs')).default;
        interactRef = interact;
        const simpleBar = (await import('simplebar')).default;
        const ResizeObserver = (await import('resize-observer-polyfill')).default;

        // Initialize the size
        updateWindowSize();
        window.addEventListener('resize', updateWindowSize);

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
        // console.log(windowWidth, windowHeight);

        if ($isDesktop || $isMobileDevice) {
            
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
                // console.log("bottomYCorner", bottomYCorner);
                topYCorner = Number(containers[containers.length - 1].dataset.y);
                // console.log("topYCorner", topYCorner);
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

                            // If the cardData exists, update selectedCard with the Title
                            if (cardData && cardData.Title) {
                               $selectedCard = cardData.Title;
                                if (!$isAlterEgoMode) {
                                    openFloaters(floaters);
                                }
                            }

                            event.target.classList.remove('grab');
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
                            event.target.style.cursor = 'grab';
                        },
                        modifiers: [
                            interact.modifiers.restrict({
                                restriction: 'parent', // Prevents dragging outside the container's parent
                                endOnly: true,
                            }),
                        ],
                        inertia: true,
                    },
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

                    // Initialize draggable functionality using interact.js
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
                                restriction: "parent",
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
                                restriction: 'parent',
                                endOnly: true,
                            }),
                        ],
                        inertia: true,
                    });
            });
            } else {return}

            setupMouseDetection();

            tick();

            await tick();
        }

        

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
            if (interactRef) {
                // Clean up containers
                if (containers) {
                    containers.forEach(container => {
                        try {
                            interactRef(container).unset();
                        } catch (e) {
                            // console.log("Could not cleanup container interact handlers");
                        }
                    });
                }
                
                // Clean up floaters
                if (floaters) {
                    floaters.forEach(floater => {
                        try {
                            interactRef(floater).unset();
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
                            interactRef(textBox).unset();
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
            interactRef = null;
        };
        
        // Execute all cleanup functions
        cleanupInteract();
        cleanupEventListeners();
        cleanupObservers();
        clearReferences();
        
        //console.log("Component cleanup complete");
    });

</script>


<div class="content_container">

    <section class="host" bind:this={hostElement}>

        {#if !$isMobileDevice}
            <Textbox bringToFront={bringToFront}/>
        {/if}

        
        <Slider
            switch_alterego = {switch_alterego}
        />


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
            {#each Object.values(data.floatersDb) as singleFloater (singleFloater.id)}
                <Floater
                    data={singleFloater}
                    randomPosition = {calculateRandomPosition()}
                />
            {/each}

            <!-- Custom always-open red floater -->
            <VademecumFloater 
                randomPosition={calculateRandomPosition()}
            />
        {/if}

        <LogoButton
            logoImage = {data.logoImage}
        />

        <div class="mobile_desc_container">

            <div class="mobile_description tip">
                <p class="h4" style="text-align: center;">
                    What is this project about?
                </p>
            </div>

            <div class="mobile_description">
                <p class="p2">
                    {@html data.alterEgosDb.Card1.Description}
                </p>
            </div>

            <div class="mobile_description tip">
                <p class="h4" style="text-align: center;">
                    Try this website on a  💻  device.
                </p>
            </div>

        </div>

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


    .mobile_description {
        display: none;
    }

    .mobile_desc_container {
        display: none;
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

        .mobile_desc_container {
            display: none;
            position: static;
            flex-direction: column;
            padding: var(--spacing-L);
            height: 100%; /* Fill the grid row completely */
            min-height: 0; /* Allow shrinking if needed */
            overflow-y: auto; /* Allow scrolling if content overflows */
            row-gap: 10px;
        }

        .mobile_description {
            display: flex;
            position: static;
            border: solid 1px black;
            border-radius: 10px 10px 10px 10px;
            width: 100%;
            padding: var(--spacing-S);
            overflow-y: scroll;
            scrollbar-width: 0px;
            background-color: white;
            height: 100%;
            padding-bottom: var(--spacing-L);
        }


        .mobile_description.tip {
            height: fit-content;
            min-height: 40px;
            overflow: hidden;
            padding: var(--spacing-XS);
            margin-bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            vertical-align: middle;
        }

        .mobile_description > .p2 {
            font-size: 1.1rem;
            text-align: justify;
            text-rendering: optimizeLegibility;
            hyphens: auto;
            -webkit-hyphens: auto;
            -ms-hyphens: auto;
            overflow-wrap: break-word;
        }


        .mobile_description::-webkit-scrollbar {
            width: 12px; /* Width of the scrollbar */
            height: 90px;
            overflow: hidden;
            border-radius: 10px;
            
        }

        .mobile_description::-webkit-scrollbar-track {
            background: transparent; /* Background of the scrollbar track */
            overflow: hidden;
            border-radius: 10px;
            
        }

        .mobile_description::-webkit-scrollbar-thumb {
            background-color: white; /* Color of the scrollbar thumb */
            border: 1px solid black; /* Adds space around thumb */
            overflow: hidden;
            border-radius: 5px;
        }

        .mobile_description::-webkit-scrollbar-thumb:hover {
            background-color: transparent; /* Darker color when hovered */
            overflow: hidden;
            border-radius: 10px;
        }

    }


</style>