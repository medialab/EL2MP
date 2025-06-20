<script>
import { currentCardColor, finalShareData, showSharer, currentHash, shareInfo, isDesktop, isMobileDevice, sharingTextMobile, sharerVisibility } from '$lib/stores/globalStores';
import { fade, scale, fly } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';
import { writable } from 'svelte/store';

let copierAlert;

// Utility function to truncate text with ellipsis
const truncateText = (text, maxLength = 200) => {
    if (!text || text.length <= maxLength) return text + '🚀🚀🚀\n';
    return text.substring(0, maxLength - 3).trim() + '...' + '🚀🚀🚀\n';
};

const closeSharer = () => {
    $showSharer = false
}

const shareContent = () => {
    if (!$isDesktop) {

        console.log("Starting sharer")

        if (window.isSecureContext && navigator.share && $sharerVisibility) {

            setTimeout(() => {
                const canShareFiles = navigator.canShare &&
                                    navigator.canShare({ files: $finalShareData.files });
                console.log("canShareFiles", canShareFiles)

                if (canShareFiles) {
                    
                    try {
                        navigator.share($finalShareData);
                        console.log('✅ Content shared successfully with image');
                        setTimeout(() => {
                            $sharingTextMobile = "Thanks for sharing!";
                        }, 100);
                        setTimeout(() => {
                            $showSharer = false;
                            setTimeout(() => {
                                $sharingTextMobile = "We're preparing your image...";
                            }, 2000);
                        }, 1000);
                    } catch (error) {
                        if (error.name === 'AbortError') {
                            console.log('ℹ User cancelled sharing');
                            setTimeout(() => {
                                $sharingTextMobile = "Share cancelled.";
                            }, 100);
                            
                            setTimeout(() => {
                                $showSharer = false;
                                setTimeout(() => {
                                    $sharingTextMobile = "We're preparing your image...";
                                }, 2000);
                            }, 1000);
                        } else if (error.name === 'NotAllowedError') {
                            console.log('🚫 Share not allowed (permission denied)');
                            setTimeout(() => {
                                $sharingTextMobile = "Sharing not permitted.";
                            }, 100);
                            
                            setTimeout(() => {
                                $showSharer = false;
                                setTimeout(() => {
                                $sharingTextMobile = "We're preparing your image...";
                            }, 2000);
                            }, 1000);
                        } else {
                            console.warn('⚠ File sharing failed, trying without image');
                            try {
                                const textOnlyPayload = {
                                    text: truncateText($finalShareData.text, 120),
                                    url: $finalShareData.url
                                };
                                navigator.share(textOnlyPayload);
                                console.log('✅ Text-only share successful');
                                setTimeout(() => {
                                    $sharingTextMobile = "Thanks for sharing!";
                                }, 100);
                                
                                setTimeout(() => {
                                    $showSharer = false;
                                    setTimeout(() => {
                                        $sharingTextMobile = "We're preparing your image...";
                                    }, 2000);
                                }, 1000);
                            } catch (err2) {
                                if (err2.name !== 'AbortError' && err2.name !== 'NotAllowedError') {
                                    console.error('❌ Text-only share failed:', err2);
                                }
                                setTimeout(() => {
                                    $sharingTextMobile = "No sharing this time... ok";
                                }, 100);
                                
                                setTimeout(() => {
                                    $showSharer = false;
                                    setTimeout(() => {
                                        $sharingTextMobile = "We're preparing your image...";
                                    }, 2000);
                                }, 1000);
                            }
                        }
                    }
                } else {
                    try {
                        const textOnlyPayload = {
                            text: truncateText($finalShareData.text),
                            url: $finalShareData.url
                        };
                        navigator.share(textOnlyPayload);
                        console.log('✅ Text-only share successful');
                        $sharingTextMobile = "Thanks for sharing!";
                        
                        $showSharer = false;
                    } catch (error) {
                        if (error.name === 'AbortError') {
                            console.log('ℹ User cancelled sharing');
                        } else if (error.name === 'NotAllowedError') {
                            console.log('🚫 Share not allowed (permission denied)');
                        } else {
                            console.error('❌ Text-only share failed:', error);
                        }
                        $sharingTextMobile = "No sharing this time... ok";
                        
                        $showSharer = false;
                    }
            } }, 1500);

        } else {
            console.warn('⚠ Web Share API not supported or insecure context');
            $sharingTextMobile = "No sharing this time... ok";
            
            $showSharer = false;
        }
      
    }
}

const copyToClipboard = () => {
    console.log("Copied link!")
    try {
        const linkToCopy = $shareInfo.url || `https://ecologiesofllm.medialab.sciencespo.fr/${$currentHash}`;
        navigator.clipboard.writeText(linkToCopy);
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
    }
    copierAlert.classList.add('show');

    setTimeout(() => {
        copierAlert.classList.remove('show');
    }, 1000);

}

const openWindow = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    closeSharer();
};

const shareOnTwitter = () => {
    const truncatedText = truncateText($shareInfo.text);
    const text = encodeURIComponent(`${truncatedText}\n`);
    const url = encodeURIComponent($shareInfo.url || `https://ecologiesofllm.medialab.sciencespo.fr/${$currentHash}`);
    openWindow(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
};

const shareOnBluesky = () => {
    // Bluesky supports pre-filled text via the compose endpoint
    const content = encodeURIComponent(`${$shareInfo.text}\n${$shareInfo.url || `https://ecologiesofllm.medialab.sciencespo.fr/${$currentHash}`}`);
    openWindow(`https://bsky.app/compose/post?text=${content}`);
};

const shareViaEmail = () => {
    const subject = encodeURIComponent(`${$shareInfo.title} – ${$shareInfo.exTitle}`);
    const body = encodeURIComponent(`${$shareInfo.text}\n\n${$shareInfo.url || `https://ecologiesofllm.medialab.sciencespo.fr/${$currentHash}`}`);
    // We cannot use openWindow because mailto should be handled by the browser
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    closeSharer();
};

// Reddit share (desktop only)
const shareOnReddit = () => {
    const url = encodeURIComponent($shareInfo.url || `https://ecologiesofllm.medialab.sciencespo.fr/${$currentHash}`);
    const title = encodeURIComponent(`${$shareInfo.title} – ${$shareInfo.exTitle}`);
    openWindow(`https://www.reddit.com/submit?url=${url}&title=${title}`);
};


</script>

{#if $showSharer}
    <div class="sharer_global_container"
    in:scale={{ duration: 400, delay: 200, start: 0, opacity: 0 }}
    out:scale={{ duration: 400, delay: 200, start: 0, opacity: 0 }}
    aria-modal="true"
    role="dialog"
    tabindex="0">
        <div class="sharer_header">
            {#key $sharingTextMobile}
                <p class="p3">
                    {#if $isDesktop}
                        Share {$shareInfo.exTitle}
                    {:else}
                        {$sharingTextMobile}
                    {/if}
                </p>
            {/key}
            {#if $isDesktop}
                <button onclick={closeSharer} id="closer" aria-label="Close share dialog">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z"/></svg>
                </button>
            {:else if $sharerVisibility}
                <button
                onclick={shareContent}
                id="effective_sharing"
                aria-label="Share content"
                transition:scale={{ duration: 220, delay: 0, start: 0.7, opacity: 0.2, easing: cubicOut }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M264.62-80Q237-80 218.5-98.5 200-117 200-144.62v-390.76q0-27.62 18.5-46.12Q237-600 264.62-600h84.61v40h-84.61q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v390.76q0 9.24 7.69 16.93 7.69 7.69 7.69 16.93h430.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-390.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69h-84.61v-40h84.61q27.62 0 46.12 18.5Q760-563 760-535.38v390.76q0 27.62-18.5 46.12Q723-80 695.38-80H264.62ZM460-340v-435.46l-84 84L347.69-720 480-852.31 612.31-720 584-691.46l-84-84V-340h-40Z"/></svg>
                </button>
            {/if}
        </div>

        <div class="sharer_logo_container">
            <button onclick={shareOnTwitter} id="twitter_sharer" aria-label="Share on Twitter" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280">
                    <path d="M166.665 118.575L270.919 0H246.223L155.661 102.936L83.384 0H0L109.321 155.672L0 280H24.696L120.269 171.273L196.616 280H280M33.6093 18.2221H71.5493L246.204 262.673H208.255" fill="black"/>
                    </svg>
            </button>
            <button id="reddit_sharer" onclick={shareOnReddit} aria-label="Share on Reddit">
                <!-- Reddit icon -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280">
                    <path d="M140.077 186.577C151.036 186.564 161.989 187.102 172.895 188.188C173.303 188.228 173.696 188.363 174.043 188.582C174.39 188.801 174.68 189.099 174.892 189.45C175.104 189.801 175.23 190.197 175.263 190.605C175.295 191.014 175.231 191.424 175.077 191.804C172.193 198.709 167.332 204.607 161.104 208.756C154.876 212.904 147.56 215.119 140.077 215.119C132.593 215.119 125.277 212.905 119.049 208.756C112.821 204.607 107.96 198.709 105.077 191.804C104.92 191.424 104.854 191.013 104.885 190.604C104.916 190.194 105.042 189.797 105.254 189.446C105.467 189.094 105.758 188.796 106.106 188.578C106.454 188.359 106.85 188.226 107.259 188.188C117.479 187.15 128.538 186.577 140.077 186.577Z"/>
                    <path d="M96.8749 138.452C106.045 138.452 113.034 148.066 112.485 159.931V159.942C111.937 171.795 104.073 176.1 94.9034 176.101C85.7217 176.101 78.7445 170.034 79.2928 158.169C79.8414 146.304 87.7166 138.452 96.8749 138.452Z" />
                    <path d="M183.278 138.452C192.436 138.453 200.312 146.304 200.86 158.169C201.409 170.034 194.419 176.101 185.261 176.101C176.091 176.1 168.229 171.795 167.68 159.931C167.132 148.078 174.12 138.452 183.278 138.452Z"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M140 0C217.327 0 280 62.6733 280 140C280 217.327 217.327 280 140 280H20.2769C18.6149 280.002 16.9892 279.51 15.6065 278.588C14.2243 277.666 13.1468 276.354 12.5099 274.82C11.8729 273.285 11.7051 271.595 12.0286 269.965C12.3521 268.335 13.1521 266.838 14.3269 265.662L41.0089 238.991C27.9899 226.005 17.6647 210.575 10.6272 193.587C3.58988 176.599 -0.0219603 158.388 0.000100451 140C0.000100451 62.6734 62.6735 0.000105513 140 0ZM198.609 42.1066C194.459 40.7071 189.998 40.5127 185.742 41.5447C181.487 42.5768 177.611 44.7932 174.564 47.9377C171.517 51.0824 169.423 55.0268 168.525 59.3127C159.241 60.275 150.644 64.6492 144.4 71.5873C138.156 78.5253 134.709 87.534 134.727 96.868C114.229 97.7313 95.4919 103.565 80.6286 112.793C76.9907 109.995 72.804 107.994 68.3417 106.921C63.8793 105.848 59.2411 105.726 54.7286 106.564C50.2161 107.402 45.93 109.181 42.1505 111.785C38.3713 114.389 35.1826 117.759 32.7921 121.677C30.4015 125.595 28.8631 129.972 28.2763 134.524C27.6894 139.076 28.0677 143.702 29.3864 148.098C30.7052 152.494 32.9344 156.563 35.9298 160.04C38.9252 163.517 42.6193 166.325 46.7716 168.28C47.8568 206.232 89.2155 236.752 140.082 236.752C190.984 236.752 232.365 206.185 233.391 168.198C237.522 166.225 241.194 163.406 244.166 159.924C247.138 156.442 249.346 152.374 250.647 147.984C251.947 143.595 252.309 138.98 251.713 134.441C251.116 129.902 249.573 125.539 247.183 121.635C244.793 117.73 241.61 114.37 237.839 111.774C234.068 109.178 229.793 107.403 225.292 106.564C220.791 105.725 216.165 105.842 211.712 106.904C207.259 107.967 203.078 109.954 199.441 112.736C184.438 103.449 165.491 97.6038 144.772 96.8338V96.7518C144.772 82.7984 155.19 71.2245 168.654 69.4162C169.859 74.4904 172.741 79.0102 176.833 82.2432C180.926 85.4761 185.99 87.2341 191.205 87.232C195.584 87.2317 199.873 85.9897 203.576 83.6514C207.278 81.313 210.243 77.9736 212.125 74.0195C214.007 70.0657 214.729 65.6594 214.21 61.3115C213.69 56.9634 211.948 52.8514 209.187 49.4525C206.425 46.0537 202.758 43.5062 198.609 42.1066Z" />
                    </svg>
            </button>
            <button id="email_sharer" onclick={shareViaEmail} aria-label="Share via email">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m440.72-509.72-317.13-200v386.85h392.82v91H123.59q-37.79 0-64.39-26.61-26.61-26.61-26.61-64.39v-474.26q0-37.78 26.61-64.39 26.6-26.61 64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v200h-91v-112.59l-317.13 200Zm0-87.41 317.13-200H123.59l317.13 200ZM761.91-69.48q-68.39 0-116.94-48.55-48.56-48.56-48.56-116.95v-180q0-43.5 30.03-73.54 30.02-30.05 73.51-30.05 43.48 0 73.56 30.05 30.08 30.04 30.08 73.54v180H720v-180q0-8-6-14t-14-6q-8 0-14 6t-6 14v180q0 33.96 23.98 57.94 23.98 23.97 57.93 23.97 33.96 0 57.82-23.97 23.86-23.98 23.86-57.94v-161.67h83.82v161.67q0 68.39-48.55 116.95-48.56 48.55-116.95 48.55ZM123.59-709.72v-87.41 474.26-386.85Z"/></svg>
            </button>
            <button id="bluesky_sharer" onclick={shareOnBluesky} aria-label="Share on Bluesky">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 318 280">
                    <path d="M68.9307 18.8474C105.389 46.2185 144.603 101.716 159.001 131.499C173.4 101.718 212.612 46.218 249.071 18.8474C275.377 -0.902434 318 -16.1838 318 32.4422C318 42.1535 312.432 114.022 309.167 125.69C297.816 166.254 256.454 176.6 219.661 170.338C283.974 181.284 300.334 217.541 265.002 253.799C197.899 322.658 168.555 236.522 161.033 214.45C159.654 210.404 159.009 208.511 159 210.121C158.99 208.511 158.346 210.404 156.967 214.45C149.448 236.522 120.105 322.66 52.9982 253.799C17.6653 217.541 34.0253 181.282 98.3387 170.338C61.5452 176.6 20.1825 166.254 8.83322 125.69C5.5676 114.021 0 42.1524 0 32.4422C0 -16.1838 42.6238 -0.902434 68.9288 18.8474H68.9307Z"/>
                  </svg>
            </button>
        </div>
        <div class="sharer_link_container">
            <div class="sharer_link_text">
                    <p class="p3">
                       {'ecologiesofllm.medialab.sciencespo.fr/' + $currentHash}
                    </p>
            </div>
            <button class="sharer_copier"
            style="background-color: {$currentCardColor};"
            onclick={copyToClipboard}
            onkeydown={copyToClipboard}
            onpointerdown={copyToClipboard}
            ontouchstart={copyToClipboard}
            aria-label="Copy link to clipboard">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M362.31-260Q332-260 311-281q-21-21-21-51.31v-455.38Q290-818 311-839q21-21 51.31-21h335.38Q728-860 749-839q21 21 21 51.31v455.38Q770-302 749-281q-21 21-51.31 21H362.31Zm0-60h335.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H362.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-140 200Q192-120 171-141q-21-21-21-51.31v-515.38h60v515.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h395.38v60H222.31ZM350-320v-480 480Z"/></svg>
            <div class="copier_alert"
            bind:this={copierAlert}
            style="background-color: {$currentCardColor};">
                <p class="p3">Link copied!</p>
            </div>
            </button>
            
        </div>
        
    </div>
    <div
    class="sharer_background"
    style="background-color: {$currentCardColor};"
    in:fade={{    duration: 300 }}
    out:fade={{ duration: 1500 }}
    onclick={closeSharer}>
    </div>
{/if}





<style>

.sharer_background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 800;
    opacity: 0.5;
    transform: translate(-50%, -50%);
}

.sharer_global_container {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-S);
    border: 1px solid black;
    border-radius: 10px;
    padding: var(--spacing-M);
    width: 350px;
    height: fit-content;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    z-index: 1000;
    color: black;
    fill: black;

    background-color: white;
    background-image: url('/og_images/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    transition: height 0.8s ease-in-out;
}

.sharer_logo_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
    column-gap: 10px;
}

.sharer_logo_container > button {
    height: 60px;
    width: 70px;
    aspect-ratio: 1/1;
    border-radius: 10%;
    border: 1px solid black;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    position: static;
    background-color: white;
}

.sharer_logo_container > button:hover {
    background-color: rgb(207, 207, 207);
}

.sharer_logo_container > button:active {
    transform: scale(0.95);
    transition: transform 0.1s ease-in-out;
}

.sharer_logo_container > button > svg {
    width: 15px;
    height: 15px;
}

.sharer_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width: 100%;
    transition: height 0.8s ease-in-out;
}

.sharer_header > button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: static;
    transition: transform 0.1s ease-in-out;
    padding: 0px;
}

.sharer_header > p {
    font-size: 16px;
    min-width: 180px;
    text-align: center;
    overflow: hidden;
}

.sharer_header > button:hover {
    cursor: pointer;
}

.sharer_header > button:active {
    transform: scale(0.9);
    transition: transform 0.1s ease-in-out;
}

.sharer_header > button > svg {
    cursor: pointer;
    width: 35px;
    height: 35px;
    fill: black;
}

.sharer_header > button > svg:hover {
    transform: scale(1.1);
    transition: transform 0.1s ease-in-out;
}


.sharer_link_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
    width: 100%;
    column-gap: 10px;
}

.sharer_link_text {
    width: 100%;
    height: fit-content;
    border: 1px solid black;
    border-radius: 10px;
    height: 40px;
    color: black;
    background-color: white;
}

.sharer_link_text > p {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    padding: var(--spacing-S);
    font-size: 12px;
    user-select: text;
}

.sharer_link_text > p::selection {
    background-color: rgba(0, 0, 0, 1);
    color: white;
}

.sharer_copier {
    width: 40px;
    height: 40px;
    border: 1px solid black;
    border-radius: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-XS);
    fill: black;
}

.sharer_copier:hover {
    cursor: pointer;
    background-color: rgb(39, 39, 39);
}

.sharer_copier:active {
    transform: scale(0.95);
    transition: transform 0.1s ease-in-out;
}


.copier_alert {
    position: absolute;
    left: 50%;
    bottom: -80%;
    transform: translateX(-50%) scale(0.4);
    opacity: 0;
    pointer-events: auto;
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: var(--spacing-XS) var(--spacing-S);
    border-radius: 10px;
    border: 1px solid black;
    width: max-content;
}

:global(.copier_alert.show) {
    opacity: 1;
    pointer-events: none;
    transform: translateX(-50%) scale(1);
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}


.copier_alert > p {
    color: black;
    font-size: 11px;
    text-align: center;
    margin: 0;

}

.sharer_copier > svg {
    width: 22px;
    height: 22px;
    z-index: 20;
}
@media (max-width: 768px) {
    .sharer_logo_container {
        display: none;
    }

    .sharer_link_container {
        display: none;
    }

    .sharer_header > p {
        width: 100%;
        text-align: center;
    }

    #effective_sharing {
        width: 40px;
        height: 40px;
        padding: var(--spacing-XS);
        border: 1px solid black;
        aspect-ratio: 1/1;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(255, 255, 255);
        border-radius: 8px;
        transform: scale(1);
        touch-action: manipulation;
        cursor: pointer;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
    }
    #effective_sharing:hover,
    #effective_sharing:focus-visible {
        transform: scale(1);
        background-color: #f5f5f5;
        transition: all 0.15s cubic-bezier(0.4,0,0.2,1);
    }
    #effective_sharing:active {
        background-color: rgb(198, 198, 198);
        transform: scale(0.95);
        transition: all 0.15s cubic-bezier(0.4,0,0.2,1);
    }
}
</style>