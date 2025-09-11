<script>

    import giga_logo_sx from '$media/logos/CIRCLE.svg';
    import el2mp_logo_noicon from '$media/logos/logo_noicon.svg';
    import LogoButton from '$lib/components/buttons/logo_button.svelte';

    import { goto } from '$app/navigation';
</script>

<div class="tedium_major">
    <header>
        <button class="header_button" onclick={() => goto('/')}>
            <img src="{el2mp_logo_noicon}" alt="Logo" class="header_logo">
        </button>
    </header>

    <section class="hype_container">
        <div class="hype_column">   
            <div class="hype_header">
                <h2><i>Tedium:</i></h2>
                <h3>effects and consequences of LLMs' boredom</h3>
            </div>
        
            <div class="hype_text">
                <p class="p2">What's it about?</p>
                <p class="p3">
                    Is there anything inherently valuable in using large language models (LLMs)? Do workers engage with these systems differently than managerial narratives of optimisation and cost reduction suggest? And how do they navigate the capacities of these tools, making sense of their results?
                    To answer these questions, we shift our attention away from the perspectives of developers and toward the lived expertise, values, and tactics of workers. We attempted to establish the conditions under which the use of LLMs can be described within the specific professional norms and material conditions—what we refer to as their ecologies. We explore where the need to prompt arises, how outputs are handled, and what it means to engage with LLMs not as tools, but as technologies-in-use. We designed a participatory, experimental research protocol that is open to reproduction and adaptation through collaborations among sociologists, STS scholars, and design researchers. Over six- to eight-month cohorts, we worked with 40 professionals as co-inquirers. Through regular meetings and collaborative exercises, we introduced intentional pauses into everyday routines, creating space for reflection on the role and impact of LLMs. These encounters generated a multimodal archive—comprising audio, images, drawings, and chat logs—that captures the textures of LLMs-in-use.
                    Tedium is a curated exploration of this archive. Composed of five scenes, it follows the arc of our inquiry from the first meeting to the closing conversation. Each scene has a dual structure: a description, featured in the video installation, evokes the rhythms of our weekly sessions; and a commentary, presented in the following pages, offers interpretations, conceptual links, and analytical reflections that extend beyond participants' formulations.
                    What emerges departs sharply from narratives of automation or seamless delegation. LLMs do not simply accommodate users: they require accommodation. They fragment workflows, produce verbose outputs, and introduce new layers of interpretive and evaluative labour. Rather than streamlining work, they often multiply it, flattening nuance and amplifying tedium. While many co-inquirers found LLMs helpful, the promised gains in productivity proved elusive: more work, not necessarily better work. Yet amid these tensions, a quieter form of value appeared. The LLM, alien yet patient, provided a space for “silly work,” for emotional scaffolding, for low-stakes experimentation. Its judgment-free presence created rare permission to hesitate, to play, to think aloud. Far from the hyperbolic claims of disruption and efficiency, this value was grounded in practice, not promise. Anything but hype!

                </p>

                <div class="hype_header">
                    <p class="p3">
                        <a href="mailto:gabriel.alcaras@sciencespo.fr">gabriel.alcaras@sciencespo.fr</a> <br>
                        <a href="mailto:donato.ricci@sciencespo.fr">donato.ricci@sciencespo.fr</a> <br>
                        <a href="mailto:tommaso.prinetti@sciencespo.fr">tommaso.prinetti@sciencespo.fr</a>
                    </p>
                </div>

                
            </div>
        </div>

        <div class="hype_column">
            <div class="hype_header">
                <h2><i>The full plot:</i></h2>
                <h3>the commentary of the video installation</h3>
            </div>
            <article class="hype_commentary">
                <p class="p2">September - October 2024 − Expectations
                </p>
                <p class="p3">
                    Our co-inquirers met for the first time in late September 2024. They gathered around a simple table, as they would do each Monday for six months.
                    Agnès has a background in literature and is building a career in international relations. She said, “One lives perfectly well without technology.” Yet, she has chosen to take a closer look at LLMs, cautiously, by participating in the project, drawing on her experience in diplomacy and policy writing. 
                    To her right, Constance listens quietly. An economist by training, she previously worked as a research assistant for a renowned French economist, cleaning data and exploring datasets. These are tasks she believes could and hopes will be automated, opening up space for more meaningful work. 
                    Two seats down, Camille leans forward slightly. She’s becoming a lawyer and has tried using ChatGPT for various tasks outside the classroom: creating hiking itineraries, recipes, and casual plans. She understands its limitations well. “For academic work, honestly, it’s not that useful,” she thinks.
                    Next to her, Alice sits upright in a neatly tailored blazer. She has no ChatGPT account, but she borrows it from a friend. “Sometimes it feels too real,” she says. “I don’t like the illusion of talking to a person.” An occasional user, Alice, keeps her distance. Her real passion lies elsewhere. She hopes to become an auctioneer.
                    Toward the end of the table, Yichen remains silent, observing with reserved attentiveness. A student in public policy with a focus on technology regulation, his beliefs echo long-termist framings popularised by institutions like the Future of Humanity Institute. Generative AI, he suggests, could change the future of intelligence itself. 
                    Across from him, Tobias scrolls on his laptop screen. Training in digital public policy, he once used ChatGPT to write a Python crawler for YouTube and describes LLMs as amplifiers, powerful if you already know what you’re doing. He speaks with reserved precision, approaching AI from a rational perspective.
                    Guillaume sits with one leg tucked beneath him, a loose strand from his catogan falling over his shoulder. The geekiest of the group, he brings a chemistry background into his current training in environmental urbanism. He approaches AI with a tinkerer’s ethic, informed by a faintly anti-capitalist sensibility. He fills the room with his humorous presence. 
                    A few seats away, Charlotte’s leather jacket rests on the back of her chair, its patches visible in the folds, among them a pro-Palestine badge. Trained in human rights law and shaped by her upbringing in an industrial East German city, she has developed a lasting interest in the rights of migrants. Machine translation, she says, could be a lifeline in refugee contexts. But no algorithm, in her view, should replace moral discernment.
                    Despite their varied backgrounds, beliefs, and experiences, the group shared two recurring expectations: that these tools could help them save time and alleviate the repetitive, low-value tasks that clutter their professional routines. At the same time, many felt like relative novices: uncertain about how to use these tools effectively yet eager to test capabilities they had heard so much about.

                </p>
                <hr>
                <p class="caption">
                    In writing this scene—as with those that follow—we sought to recreate the atmosphere of being in a room together: sharing, contrasting, and reflecting on experiences. These collective sessions, the protocol’s weekly anchor, were made possible by quieter, solitary engagements with LLMs. Each week, participants dedicated one to two hours—alone or in groups—to one of eighteen structured exercises designed to prompt reflective practice. It was a sustained investment of time and attention.
                    These conversations were inseparable from the slow accumulation of experience. Each participant brought their own situated practice into the room. Discussions were grounded in specific examples, avoiding abstraction unless it was tied to practical use. Over time, the group became more adept at articulating concrete insights, supported by the regular rhythm of individual and collective sessions. Researchers refined the exercises; participants grew more comfortable voicing direct, sometimes messy reflections.
                    Speaking about practice is never straightforward. Work is fractured, overlapping, and often contradictory. Retrospective accounts impose coherence, shaped by what we think we should have done rather than what we did. LLMs promise to streamline this mess—to purify work.
                    Ironically, this first scene highlights the absence of practice. It captures our initial meeting, before exercises began, when discussions circled balanced impressions—bias, confabulation, and environmental costs. But deeper expectations emerged only later, through lived use. Some participants, surprised by the limits of LLMs, realised they had held unspoken hopes. LLMs, it turned out, were not magic. Yet for some, it took using them to recognise that they had ever imagined they might be.
                    </p>
            </article>
        </div>
        
    </section>
</div>
<style>

.tedium_major {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    position: relative;
    overflow: hidden;
}

.hype_container {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    pointer-events: auto;
    overflow: hidden;
}

.hype_column {
    width: 50%;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: var(--spacing-L);
    overflow-y: auto;
    overflow-x: hidden;

    padding: var(--spacing-M);
    padding-bottom: var(--spacing-XL);

    -ms-overflow-style: none;
    position: relative;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
}

.hype_column:hover {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
}

.hype_column:hover ~ .hype_column {
    opacity: 0.5;
}

.hype_container:hover .hype_column:not(:hover) {
    opacity: 0.5;
}

.hype_column::-webkit-scrollbar {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.hype_column:hover::-webkit-scrollbar {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
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
    position: relative;
    top: 0;
    left: 0;
}

a:hover {
    text-decoration: underline;
}

.hype_header > * {
    border: 1px solid white;
    background-color: white;
}

h3 {
    font-size: 24px;
    border: 1px solid white;
    background-color: white;
    white-space: pre-wrap;
    line-height: 1.5;
}

.p3 {
    line-height: 1.5;
    border: 1px solid white;
    background-color: white;
    white-space: pre-wrap;
}

.hype_text {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.5;
}

.hype_text > * {
    margin-bottom: var(--spacing-L);
}

.hype_text > *:last-child {
    margin-bottom: 0;
}

.hype_text p, .hype_commentary p, .hype_commentary .p2, .hype_text .p2 {
    width: 80%;
    align-self: center;
    white-space: pre-line;
    line-height: 1.6;
    margin-bottom: var(--spacing-S);
}
.hype_commentary {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

header {
    width: 100%;
    height: fit-content;
    text-align: center;
    justify-content: center;
    position: static;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    
    flex-direction: row;
    padding: var(--spacing-M);
    background-color: rgb(243, 243, 243);
}

.header_button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    width: fit-content;
    height: fit-content;
    position: relative;
}

.header_logo {
    width: 250px;
    height: auto;
    object-fit: contain;
    overflow: visible;
}


@media (max-width: 768px) {

    .tedium_major {
        height: 100%;
        min-height: 100%;
    }

    .hype_container {
        flex-direction: column;
        padding-left: var(--spacing-S);
        padding-right: var(--spacing-S);
        padding-top: 0;
        margin-top: 0;
        row-gap: var(--spacing-S);
        position: static;
        overflow: scroll;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .hype_column {
        width: 100%;
        height: max-content;
        padding: var(--spacing-M);
        row-gap: var(--spacing-M);
        opacity: 1 !important; /* Override hover effects on mobile */
        align-items: flex-start;
        justify-content: flex-start;
        overflow: visible;
    }

    .hype_column:last-child {
        margin-bottom: 0;
    }

    /* Disable hover effects on mobile */
    .hype_column:hover ~ .hype_column {
        opacity: 1;
    }

    .hype_container:hover .hype_column:not(:hover) {
        opacity: 1;
    }

    .hype_column::-webkit-scrollbar {
        display: none;
    }

    .hype_column:hover::-webkit-scrollbar {
        display: none;
    }

    .hype_header {
        row-gap: 0px;
        margin: 0px;
        margin-top: var(--spacing-S);
        margin-bottom: var(--spacing-M);
    }

    .hype_header > h2 {
        font-size: 7vw;
        line-height: 1.2;
    }

    .hype_header > h3 {
        font-size: 4.5vw;
        line-height: 1.3;
    }

    h3 {
        font-size: 5vw;
        line-height: 1.3;
    }

    .hype_text {
        row-gap: var(--spacing-M);
        line-height: 1.4;
    }

    .hype_text p, .hype_commentary p, .hype_commentary h3 {
        width: 100%;
        line-height: 1.5;
        font-size: 4vw;
        margin-bottom: var(--spacing-M);
    }

    .hype_commentary {
        row-gap: var(--spacing-S);
    }

    .hype_commentary h3 {
        font-size: 5vw;
        margin: 0px;
    }

    .hype_commentary h3:first-child {
        margin-top: 0;
    }

    .hype_commentary hr {
        width: 100%;
        margin: var(--spacing-L) 0;
        border: none;
        border-top: 1px solid #ccc;
        margin-top: var(--spacing-S);
        margin-bottom: var(--spacing-S);
    }

    .caption {
        font-size: 3.5vw !important;
        opacity: 0.8;
        font-style: italic;
        line-height: 1.4;
    }

    .p3 {
        line-height: 1.5;
        font-size: 4vw;
    }

    header {
        padding: var(--spacing-S);
        height: 60px;
        box-sizing: border-box;
    }

    .header_logo {
        width: 60%;
        height: auto;
        margin-top: var(--spacing-S);
    }

    .header_button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>