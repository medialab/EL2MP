<script>
    export let data

    import Capitols from "$lib/components/cards/capitols.svelte"; 
    import LogoButton from "$lib/components/buttons/logo_button.svelte";
    import ResetButton from "$lib/components/buttons/reset_button.svelte";
    import Floater from "$lib/components/floaters.svelte";
    import Textbox from "$lib/components/textboxes.svelte";
    import Slider from "$lib/components/buttons/slider.svelte";

    import { onMount, onDestroy, tick } from "svelte";
    import { writable } from "svelte/store";

    // Here we start to implement more stores
    import { selectedCard, isAlterEgoMode, currentCardColor, highestZIndex, lastCardColor, isDesktop, isMobileDevice, isFirstReset } from '$lib/stores/globalStores';
    
    let interactRef;

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

    //Functions

    const updateWindowSize = () => {
        width = window.innerWidth;
        height = window.innerHeight;

        if (width > 768) {
            $isDesktop = true;
            $isMobileDevice = false;

            // Detect transition from mobile to desktop
            if ($isDesktop === false) {
                // //console.log("Transitioned from mobile to desktop");
                reloadWebsite();
            }
        } else {
            $isDesktop = false;
            $isMobileDevice = true;

            // Detect transition from desktop to mobile
            if ($isDesktop === true) {
                // //console.log("Transitioned from desktop to mobile");
                hideDesktopStuff();
            }
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

    const reloadWebsite = () => {
        location.reload();
    }

    const reset_function = () => {
        if (!containers) {
            console.error("No containers found!");
            return;
        }

        // Dimensions of the viewport
        const hostRect = hostElement.getBoundingClientRect();
        const windowWidth = hostRect.width;
        const windowHeight = hostRect.height;

        // Define the offset and centering values
        const offset = -30;

        // Get card dimensions (assuming all cards are the same size)
        const cardWidth = windowWidth * 0.6;
        const cardHeight = cardWidth / 1.5;
        // //console.log("cardHeight", cardHeight)

        // Calculate the total block width and height
        const totalBlockWidth = cardWidth + ((containers.length - 1) * Math.abs(offset));
        const totalBlockHeight = cardHeight + ((containers.length - 1) * Math.abs(offset));

        // Calculate the starting position (top-left of the first card) to center the block
        const startX = ((windowWidth - totalBlockWidth) / 2) - offset * (containers.length - 1);
        const startY = ((windowHeight - totalBlockHeight) / 2) - offset * (containers.length - 1);

        containers.forEach((container, index) => {
            // Calculate the position for the current container based on the index
            const x = startX + index * offset;
            const y = startY + index * offset;

            // Update initial positions
            initialPositions[index] = { x, y };

            // Apply the position to the container
            container.style.transition = 'transform 0.3s ease-in-out';
            container.style.transformOrigin = 'top left';
            container.style.transform = `translate(${x}px, ${y}px)`;

            container.setAttribute('data-x', x);
            container.setAttribute('data-y', y);
            container.style.zIndex = -index;

            setTimeout(() => {
                container.style.transition = '';
            }, 300);

            const cardData = Object.values(data.cardsDb)[index];
            if (cardData && cardData.bgColor) {
                container.style.backgroundColor = cardData.bgColor;
            }
        });

        // Now we reset the active card to qualifying

        $selectedCard = "Qualifying";

        if (floaters) {
            floaters.forEach(floater => {
                const newPosition = calculateRandomPosition();
                floater.style.position = "absolute";
                floater.style.transition = 'all 0.3s ease-in-out'
                floater.style.top = newPosition.top;
                floater.style.left = newPosition.left;
                floater.style.zIndex = newPosition.zIndex;

                setTimeout(() => {
                    floater.style.transition = ''
                }, 300);
            });
        }

        scrollableElements.forEach((element) => {
            element.scrollTop = 0;
        });

        //closeFloaters(floaters);

        $highestZIndex = 1;
        $isFirstReset = false;

        if ($isAlterEgoMode) {
            setTimeout(() => {
                switch_alterego();
            }, 450);
        }
    };

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

            // Use $selectedCard directly instead of activeMarker
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

    onMount(async () => {
        const interact = (await import('interactjs')).default;
        // Save interact reference for cleanup
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

        // Here we setup the containers that we'll use 
            containers = document.querySelectorAll('.card_container')
            floaters = document.querySelectorAll('.floater_container')
            hostElement = document.querySelector('.host');
            scrollContainers = document.querySelectorAll('.card_scrollable_container')
            textBoxes = document.querySelectorAll('.text-box-dx, .text-box-sx');
            scrollableElements = document.querySelectorAll('.card_scrollable_container')
            sections = document.querySelectorAll('.section_container');

        if ($isDesktop) {

            await tick();

            // Storing positions
            containers.forEach((container, index) => {
                // Dimensions of the viewport
                const hostRect = hostElement.getBoundingClientRect();
                const windowWidth = hostRect.width;
                const windowHeight = hostRect.height;

                const offset = -30;

                const cardWidth = windowWidth * 0.6;
                const cardHeight = cardWidth / 1.5;
                
                const totalBlockWidth = cardWidth + ((containers.length - 1) * Math.abs(offset));
                const totalBlockHeight = cardHeight + ((containers.length - 1) * Math.abs(offset));

                const startX = ((windowWidth - totalBlockWidth) / 2) - offset * (containers.length - 1);
                const startY = ((windowHeight - totalBlockHeight) / 2) - offset * (containers.length - 1);

                const x = startX + index * offset;
                const y = startY + index * offset;

                initialPositions[index] = { x, y };

                container.style.transition = 'transform 0.3s ease-in-out';
                container.style.transformOrigin = 'top left';
                container.style.transform = `translate(${x}px, ${y}px)`;
                container.setAttribute('data-x', x);
                container.setAttribute('data-y', y);
                container.style.zIndex = -index;

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
                            ////console.log('Drag ended', event);
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
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;

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

            tick();
            
            setupMouseDetection();

            tick();

            await tick(); // Wait for the DOM to update
        }

        return () => {
            window.removeEventListener('resize', updateWindowSize);
            clearInterval(interval);
        };
        
    }); 

    onDestroy(() => {
        // Remove all global event listeners
        window.removeEventListener('resize', updateWindowSize);
        
        // Cancel any animation frames or timeouts
        if (holdTimeout) clearTimeout(holdTimeout);
        
        // Clean up interact.js event handlers
        const cleanupInteract = () => {
            if (interactRef) {
                // Clean up containers
                if (containers) {
                    containers.forEach(container => {
                        try {
                            interactRef(container).unset();
                        } catch (e) {
                            console.log("Could not cleanup container interact handlers");
                        }
                    });
                }
                
                // Clean up floaters
                if (floaters) {
                    floaters.forEach(floater => {
                        try {
                            interactRef(floater).unset();
                        } catch (e) {
                            console.log("Could not cleanup floater interact handlers");
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
                            console.log("Could not cleanup textBox interact handlers");
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
                        console.log("Could not remove mouseenter listener");
                    }
                });
            }
            
            // Clean up container event listeners
            if (containers) {
                containers.forEach(container => {
                    try {
                        container.removeEventListener("click", null);
                    } catch (e) {
                        console.log("Could not remove click listener from container");
                    }
                });
            }
            
            // Clean up scroll container event listeners
            if (scrollContainers) {
                scrollContainers.forEach(scrollContainer => {
                    try {
                        scrollContainer.removeEventListener("click", null);
                    } catch (e) {
                        console.log("Could not remove click listener from scroll container");
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
                    console.log("Could not disconnect observer");
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
        
        console.log("Component cleanup complete");
    });

</script>


<div class="content_container">

    <section class="host">

        <Textbox bringToFront={bringToFront}/>

        <Slider
            switch_alterego = {switch_alterego}
        />

        <LogoButton
            logoImage = {data.logoImage}
        />

        <ResetButton
            reset_function = {reset_function}
        />

        {#if !$isMobileDevice}
            {#each Object.values(data.cardsDb) as card (card.IndexNum)}
                <Capitols
                    {data}
                    {card}
                    transitionDelay = {card.IndexNum * 100}
                    alterEgoCard={data.alterEgosDb[`Card${card.IndexNum}`]}
                    bringToFront = {bringToFront}
                    simplebarContainer = {simplebarContainer}
                />
            {/each}   
        {/if}

        {#if !$isMobileDevice}
            {#each Object.values(data.floatersDb) as singleFloater (singleFloater.id)}
                <Floater
                    data={singleFloater}
                    randomPosition = {calculateRandomPosition()}
                />
            {/each}
        {/if}

        <div class="mobile_desc_container">

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
            height: 100dvh;
            width: 100%;
            flex-direction: column;
            display: flex;
            padding-top: calc(1/8 * 100vw);
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
            display: flex;
            position: static;
            height: auto;
            flex: 1;
        }
    }

    :global(.grab) {
        cursor: grab;
    }

    :global(.grabbing) {
        cursor: grabbing;
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
            height: auto;
            
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
    :global(.h1),
    :global(.h2),
    :global(.h3),
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

    @font-face {
        font-family: 'Instrument Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/InstrumentSans-Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Instrument Serif';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/InstrumentSerif-Regular.ttf') format('truetype');
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

    :global(.h1) {
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

    :global(.h2) {
        font-size: 3.15em; /* 60px */
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;

        
    }

    :global(.h3) {
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
        font-size: 2.6vw;
        line-height: 1.2;
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;

        @media (min-width: 1920px) {
                font-size: 2vw;
                margin-top: -0.14em;
        }
    }

    :global(.p2) {
        font-size: 2vw;
        line-height: 1.5;
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;

        @media (min-width: 1920px) {
                font-size: 1.8vw;
                margin-top: -0.14em;
        }
    }

    :global(.p3) {
        font-size: 1.5vw;
        line-height: 1.5;
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;

        @media (min-width: 1920px) {
                font-size: 1.2vw;
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

        .mobile_description {
            display: block;
            border: solid 1px black;
            border-radius: 10px 10px 10px 10px;
            width: 100%;
            flex-shrink: 1;

            padding: var(--spacing-S);
            overflow-y: scroll;
            scrollbar-width: 0px;
            background-color: white;
            margin-bottom: var(--spacing-S);
        }

        .mobile_description.tip {
            height: fit-content;
            overflow: hidden;
            padding: var(--spacing-S);
            margin-bottom: var(--spacing-S);
        }

        .mobile_description > .p2 {
            font-size: 1.25rem;
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

        .mobile_desc_container {
            display: flex;
            position: static;
            flex-direction: column;
            justify-content: space-between;
            margin: var(--spacing-L);
            margin-bottom: 0px;
            max-height: 95%;
        }

    }


</style>