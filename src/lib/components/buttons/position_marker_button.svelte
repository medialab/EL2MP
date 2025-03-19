<script>
    import { fade, slide,  } from 'svelte/transition';


    export let selectedCardTitle
    export let currentScrollLevel

    let exercises = [];

    const allExercises = Array.from({ length: 12 }, (_, i) => ({
        id: `Ex ${i + 1}`,
        label: `Ex ${i + 1}`
    }));

    $: exercises = allExercises.filter(ex => {
        const currentIndex = allExercises.findIndex(e => e.id === currentScrollLevel);
        return allExercises.indexOf(ex) <= currentIndex;
    });

</script>

<button class="position_button">
    <p class="s1">
        {selectedCardTitle}
    </p>
    <p class="s1">/</p>

    {#each exercises as exercise, index}
        <p class="s1" in:slide={{ duration: 200, axis: "x"}} out:slide={{ duration: 200, axis: "x"}}>{exercise.label}</p>
        {#if index < exercises.length - 1}
            <p class="s1" in:slide={{ duration: 200, axis: "x" }} out:slide={{ duration: 200, axis: "x"}}>/</p>
        {/if}
    {/each}
</button>

<style>

    .position_button > .s1 {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
    }

    .position_button {
        border-radius: 0px 5px 0px 0px;
        border-left: 0px;
        border-bottom: 0px;
        bottom: 0;
        left: 0;
        display: inline-flex;
        position: absolute;
        gap: var(--spacing-S);
        z-index: 6000;
    }

    @media only screen and (max-width: 768px) {
        .position_button {
            display: none;
        }
    }


</style>