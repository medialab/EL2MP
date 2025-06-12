<script>
    export let logoImage
</script>

<button class="closing_icon">
    <img src={logoImage} alt="EL2MP Logo">
</button>

<style>
    :global(*) {
        -webkit-tap-highlight-color: transparent; /* Removes tap highlight on mobile */
        outline: none; /* Removes focus outline */
    }

    :global(*:focus) {
        outline: none; /* Ensures no focus outline appears */
    }

    :global(*:active) {
        -webkit-tap-highlight-color: transparent;
    }

    /* For specific interactive elements if needed */
    :global(button:focus),
    :global(a:focus),
    :global(.card_container:focus),
    :global(.floater_container:focus) {
        outline: none;
    }

    :global(.closing_icon) {
        width: 14vw;
        height: fit-content;
        fill: black;
        opacity: 1;
        cursor: none !important;
        background-color: transparent;
        position: fixed;
        border-radius: 0px 5px 0px 0px;
        z-index: 1;

        bottom: 1%;
        left: 50%;
        transform: translate(-50%, 0%);

        border: 0px;
        pointer-events: none;
        user-select: none;
        
    }

    :global(.closing_icon:hover) {
        background-color: transparent !important;
        user-select: none;
        pointer-events: none;
    }

    :global(.closing_icon:active) {
        background-color: transparent;
        user-select: none;
        pointer-events: none;
    }

    .closing_icon > img {
        @media (max-width: 768px) {
            width: 50%;
            place-self: center;
            align-self: center;
        }
    }

    :global(.closing_icon:active) {
        background-color: #EAEAEA;
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }

    @media (max-width: 768px) {
        :global(.closing_icon) {
            bottom: 0%;
            left: 0%;
            transform: translate(0%, 0%);
            width: 100%;
            align-items: center;
            justify-content: center;
        }
        }
</style>