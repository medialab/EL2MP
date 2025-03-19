<script>
    import { isAlterEgoMode } from '$lib/stores/alterEgoStore';
    import { transitionTime } from '$lib/stores/animations';
</script>

<div
class="text-box-dx"
style="transition: transform {transitionTime}s var(--transition-curve);"
class:closed={!$isAlterEgoMode}>
    <p class="p1" style="font-size: 1.3vw;">
        "The Ecologies of LLM Practices (EL2MP) project documents the role <br>of Large Language Models (LLMs) in various professional practice(s)<br> and the consequences of their use."
    </p>
</div>

<div
class="text-box-sx"
style="transition: transform {transitionTime}s var(--transition-curve);"
class:closed={!$isAlterEgoMode}
>
    <p class="p1" style="font-size: 2vw;">
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
        z-index: 500;
        user-select: none;
    }

    .text-box-sx {
        background-color: white;
        border: 1px solid black;
        border-radius: 1px;
        padding: var(--spacing-S);
        width: fit-content;
        box-sizing: border-box;
        position: absolute;
        top: 7vh;
        left: 2vw;
        z-index: 500;
        user-select: none;
    }

    :global(.text-box-sx.closed) {
        transform: translateX(-120%);
        transition: transform 0.5s ease-in-out;
    }

    :global(.text-box-dx.closed) {
        transform: translateX(120%);
        transition: transform 0.5s ease-in-out;
    }

    .text-box-sx:active {
        cursor: grabbing;
    }
    
    .text-box-dx:active {
        cursor: grabbing;
    }

    p {
        margin: 0;
        line-height: 1.5;
        max-width: 60ch;
    }
</style>


