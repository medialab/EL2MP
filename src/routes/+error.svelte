<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { afterNavigate, goto } from '$app/navigation';
    
    // Handle 301 redirects
    onMount(() => {
        if ($page.status === 301) {
            window.location.href = 'https://ecologiesofllm.medialab.sciencespo.fr/';
        }
        console.log('Error page mounted with status:', $page.status);
    });

    afterNavigate(() => {
        console.log('Navigation completed');
    });
    
</script>

<section class="error_container">
    <div class="mobile_description">
        <p class="h1" style="font-size: 26px;">
            🙈
        </p>
        <h1>{$page.status}: {$page.error?.message || 'An error occurred'}</h1>
        <p class="h4">
            If you're here, something went wrong. <br>
            Let's go back to the home page.
        </p>

        <button
            class="button"
            style="width: 100%;"
            href="/"
            data-sveltekit-reload>
                <p style="text-align: center; width: 100%; font-size: 26px; margin: 0px;">
                    GO BACK
                </p>
        </button>
    </div>
    
    
</section>




<style>

    .error_container {
        width: fit-content;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        z-index: 1000;
    }

    .button {
        position: static;
        width: 60% !important;
        margin-top: 20px !important;
        text-align: center !important;
        padding: 5px !important;
        transform: scale(1);
        transition: all 0.4s ease-in-out;
    }

    button:active {
        transform: scale(0.97);
        transition: all 0.1s ease-in-out;
    }

    * {
        user-select: none;
    }

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
            background-size: 1000px;
            background-position: center;
            background-repeat: repeat;
            background-attachment: fixed;
            font-family: 'Instrument Serif', serif;
        }

        .mobile_description {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: solid 1px black;
            border-radius: 10px 10px 10px 10px;
            width: 40ch;
            padding-top: 10px;
            padding-bottom: 10px;
            overflow-y: hidden;
            scrollbar-width: 0px;
            background-color: white;
            height: fit-content;
            position: static;
        }

        .mobile_description > * {
            margin: 0;
            padding: 0;
        }
</style>