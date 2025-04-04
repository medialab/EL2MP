<script>
    import { isAlterEgoMode } from '$lib/stores/alterEgoStore';
</script>


<div
class="text-box-dx"
class:closed={!$isAlterEgoMode}>
    <p class="p3">
        "The Ecologies of LLM Practices (EL2MP) project documents the role <br>of Large Language Models (LLMs) in various professional practice(s)<br> and the consequences of their use."
    </p>
</div>

<div
class="text-box-sx"

class:closed={!$isAlterEgoMode}
>
    <p class="p2">
        "How can we reframe the role <br> of LLMs in ordinary work practices?"
    </p>
</div>

<style>
    .text-box-dx {
        background-color: white;
        border: 1px solid black;
        border-radius: 1px;
        padding: var(--spacing-S);
        width: fit-content;
        box-sizing: border-box;
        position: absolute;
        bottom: 7vh;
        right: 2vw;
        z-index: 20;
        user-select: none;
        transition: transform var(--transition-times) var(--transition-curve);

        @media (max-width: 768px) {
            display: none;
        }
    }

    .text-box-sx {
        background-color: white;
        border: 1px solid black;
        border-radius: 1px;
        padding: var(--spacing-S);
        width: fit-content;
        box-sizing: border-box;
        position: absolute;
        top: 2vw;
        left: 2vw;
        z-index: 20;
        user-select: none;
        transition: transform var(--transition-times) var(--transition-curve);

        @media (max-width: 768px) {
            display: none;
        }
    }

    :global(.text-box-sx.closed) {
        transform: translateX(-120%);
        transition: transform var(--transition-times) var(--transition-curve);
    }

    :global(.text-box-dx.closed) {
        transform: translateX(120%);
        transition: transform var(--transition-times) var(--transition-curve);
    }

    .text-box-sx:focus {
        cursor: grabbing;
        transition: none;
    }
    
    .text-box-dx:focus {
        cursor: grabbing;
        transition: none;
    }

    p {
        margin: 0;
        line-height: 1.5;
        max-width: 60ch;
    }
</style>


