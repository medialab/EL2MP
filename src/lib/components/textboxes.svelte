<script>
    import { selectedCard, isAlterEgoMode } from '$lib/stores/globalStores';
    import { onMount } from 'svelte';

</script>

<button
    class="text-box-dx"
    class:closed={!$isAlterEgoMode}
>
    <p class="p3">
        "How does the use of LLMs insert itself <br>  into existing work practices?"
    </p>
</button>

<button
    class="text-box-sx"
    class:closed={!$isAlterEgoMode}
>
    <p class="p3">
        "What kind of interactions emerge when LLMs <br> are introduced within pre-existing workflows?"
    </p>
</button>

<style>
    .text-box-dx,
    .text-box-sx {
        background-color: transparent;
        width: fit-content;
        box-sizing: border-box;
        position: absolute; 
        z-index: 1;
        user-select: none;
        transform: translateX(0); 
        transition: none; 
        text-align: left; 
        border: 0px;
        pointer-events: none;
        transition: all 0.6s ease-in-out;
        visibility: visible;
        margin: 0;
        padding: 0;
    }

    .text-box-dx {
        bottom: 15px; 
        right: 15px;
        text-align: right; 
    }

    .text-box-sx {
        top: 15px; 
        left: 15px; 
    }

    .p3 {
        font-size: 1rem;
    }

    :global(.text-box-sx.closed),
    :global(.text-box-dx.closed) {
        color: rgb(171, 171, 171);
        transition: all 0.6s ease-in-out;
    }

    
    @media (max-width: 768px) {
        .text-box-dx,
        .text-box-sx {
            display: none;
        }
    }

    

    /* Styles for when being dragged (optional, cursor handled by JS) */
    .text-box-sx:focus,
    .text-box-dx:focus {
        cursor: grabbing;
    }

    p {
        margin: 0;
        line-height: 1.5;
        max-width: 60ch;
    }
</style>


