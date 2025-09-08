<script>

    import giga_logo_sx from '$media/logos/CIRCLE.svg';

</script>

<section class="hype_container">

    <div class="hype_header">
        <h2><i>Tedium:</i></h2>
        <h3>effects and consequences of LLMs' boredom</h3>
    </div>

    <div class="hype_text">
        <p class="p3">
            <b>Tedium</b>, is a guided tour of the Ecologies of LLM Practices project’s archive. The project is studying how skilled professionals utilise and integrate large language models (LLMs) into their daily work and their broader professional ecologies.
            <br>
            <br>
            <b>Tedium</b>, traces the evolving relationship between users and LLMs through a series of scenes, each depicting a distinct mode of engagement between generative AI and professional practice. It explores how LLMs reconfigure working time and space, examining what they demand to fit into existing routines or how they sometimes resist integration altogether by fragmenting or inflating different dimensions of work and labour.
            <br>
            <br>
            <b>Tedium</b>, offers a grounded chronicle of working with—and around—LLMs: recursive, opaque, laborious, and often tedious. It probes the performative force of AI hype as it manifests in the rhythms of everyday professional practices.
        </p>
    </div>

    <div class="hype_footer">
        <a href="https://ecologiesofllm.medialab.sciencespo.fr">ecologiesofllm.medialab.sciencespo.fr</a>
    </div>

</section>

<div class="giga_logo_sx">
<img src={giga_logo_sx} alt="Giga Logo Sx">
</div>

<style>

.hype_container {
    width: 50vw;
    height: fit-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: var(--spacing-L);
}

.hype_header {
    width: 100%;
    height: fit-content;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 0px;
    height: fit-content;
}

.hype_header > * {
    border: 1px solid white;
    background-color: white;
}

h3 {
    font-size: 24px;
    border: 1px solid white;
    background-color: white;
}

.p3 {
    line-height: 1;
    border: 1px solid white;
    background-color: white;
}

.hype_text {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.hype_text p {
    width: 80%;
    align-self: center;
}

.hype_footer {
    width: 100%;
    height: fit-content;
    text-align: center;
}

.giga_logo_sx {
    position: absolute;
    top: -80%;
    left: -40%;
    width: 800px;
    height: 800px;
    overflow:visible;
    mix-blend-mode: color-burn;
}

.giga_logo_sx > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    overflow: visible;
}
</style>