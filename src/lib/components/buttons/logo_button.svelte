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
        width: 20vw;
        height: fit-content;
        fill: black;
        padding: var(--spacing-XS);
        padding-right: var(--spacing-M);
        padding-left: var(--spacing-M);
        opacity: 1;
        cursor: pointer;
        background-color: #EAEAEA;
        position: fixed;
        border-radius: 0px 5px 0px 0px;
        border: solid 1px black;
        border-bottom: solid 0px black;
        border-left: solid 0px black;
        z-index: 500;

        bottom: 0px;
        left: 0px;

        @media (max-width: 768px) {
            top: 0%;
            left: 50%;
            transform: translate(-50%, 0%);
            border-radius: 0px;
            width: 100%;
            border: 0;
            border-bottom: solid 1px black;
            place-content: center;
            padding-bottom: var(--spacing-M);
            padding-top: var(--spacing-M);
        }
    }

    .closing_icon > img {
        @media (max-width: 768px) {
            width: 70%;
            place-self: center;
            align-self: center;
        }
    }

    :global(.closing_icon:active) {
        background-color: #EAEAEA;
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }
</style>