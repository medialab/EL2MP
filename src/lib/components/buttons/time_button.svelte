<script>
    export let time;
    ////console.log("Current DateTime:", time);
</script>

<button class="time_button">
    <p class="s1">
        {time}
    </p>
</button>

<style>

    .time_button {
        position: fixed;
        top: 0;
        right: 0;
        border-radius: 0px 0px 0px 5px;
        border-right: 0px;
        border-top: 0px;
        z-index: 6000;
        transition: all 1s ease-in-out;
        width: max-content;
    }

    @media only screen and (max-width: 768px) {
        .time_button {
            display: none;
        }
    }

</style>