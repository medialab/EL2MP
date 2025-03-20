<script>
    export let logoImage
</script>

<button class="closing_icon">
    <img src={logoImage} alt="EL2MP Logo">
</button>

<style>
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
    }

    :global(.closing_icon:active) {
        background-color: var(--full-black);
        color: var(--demi-white);
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }

    @media only screen and (max-width: 768px) {
        .logo_button {
            position: static;
            top: 0;
            width: 100%;
            border-radius: 0px;
            border-right: 0px;
            border-top: 0px;
            border-bottom: solid 1px black;
            height: max-content; /* Adjust height as needed */
        }
    }
</style>