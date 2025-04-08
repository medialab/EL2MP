/* THIS IS GLOBAL_DB.JS 🚀*/

import { photos, capitolsCover, general, floaters } from "$database/config.js";
export { cardsDb, floatersDb, alterEgosDb };

const cardsDb = {
  Card1: {
    Title: "Qualifying",
    Description:
      "The first block is about <b>adopting a reflexive posture</b> towards the use of LLMs. Participants engage in exercises that help them become more aware of their practices, attitudes, and assumptions about AI technologies.<br>This block serves as a foundational phase, akin to a practice ground, where participants start to <b>think critically</b> about their relationship with LLMs.",
    Question:
      "Where do LLMs live in our professional practices, norms, and relationships?",
    IndexNum: 1,
    CoverImg: capitolsCover.coverBenchmarking,
    Content: [
      {
        title: "Exercise 1 - Draw It Like You See It",
        subtitle:
          "Participants sketch how they think an LLM works and how they view their work environment.",
        text: "To carry out the project, we developed an experimental research protocol based on the active involvement of participants. The fruit of a collaboration between sociologists, science and technology researchers (STS), and designers, this protocol aims to create:<br><b>Room for hesitation:</b> Through a series of exercises, the protocol provides participants with various means of documenting and reflecting on their use of LLMs. We aim to establish a framework where doubt and hesitation are not only accepted but encouraged. Some exercises introduce deliberate pauses in professional routines, causing participants to take a step back from their own practices: during these pauses, judgment is suspended, giving users enough room to question their instinctive habits and feel unsure about what they once thought was certain. Other exercises aim to intensify the use of LLMs to shed light on what would otherwise remain too subtle to be perceived.<br><b>An ecological archive of practices:</b> The digital traces from LLM use serve as the starting point for the exercises we designed. They are analysed, contextualised, and discussed individually and collectively. Through this process, participants progressively build a multimodal archive (audio, photos, videos, drawings, and logbooks) that tangibly reflects their LLMs experience and how they are incorporated into various professional norms and material configurations.<br><b>A workbook (vademecum):</b> The workbook collects all the exercises and their instructions, organized into thematic blocks. Designed as a modular object, where pages can be added or removed as needed, it accompanies each participant throughout the protocol. The vademecum serves as both the material support for the protocol and the project's means of dissemination, as it can be reproduced and adapted in various academic and professional contexts.",
        picture: photos.Ex_1,
      },
      {
        title: "Exercise 2 - Harvesting Tasks",
        subtitle:
          "Participants account for the tasks they perform in their work and how LLMs could assist them",
        text: "This exercise helps participants <b>reflect on their existing work</b>, revealing overlooked or underappreciated tasks.<br>They also explore what other work they could do with the assistance of an LLM, generating material for future exercises.",
        picture: photos.Ex_2,
      },
      {
        title: "Exercise 3 - Taking Stock",
        subtitle:
          "Participants review their ChatGPT history to identify usage patterns and what stands out",
        text: "This exercise prompts participants to <b>critically assess</b> their LLM interactions through self-evaluation and a structured review of their conversation history.<br>It highlights gaps between perception and actual use to further their understanding of their LLM usage rather than relying on habitual talking points or anecdotes.",
        picture: photos.Ex_3,
      },
      {
        title: "Exercise 4 - Memorable Conversations",
        subtitle:
          "Participants identify what made some conversations with ChatGPT remarkable",
        text: "Participants <b>analyze past LLM interactions</b> that stood out due to emotional impact, moral hesitation, or significant outcomes.<br>They rate the model's performance and explore why it performed as it did, fostering awareness about LLM capabilities and professional expectations.",
        picture: photos.Ex_4,
      },
      {
        title: "Exercise 5 - Subtracting the Machine",
        subtitle:
          "Participants describe memorable interactions with ChatGPT without using terms like 'LLM' or 'ChatGPT'.",
        text: "This thought experiment creates <b>artificial constraints</b> on how participants talk about their use of LLMs.<br>Because they cannot rely on ready-made categories (e.g., 'ChatGPT', 'machine', or 'assistant'), participants need to <b>reconsider their interactions</b> with the models, playing with different metaphors and analogies drawn from their social and professional environments.",
        picture: photos.Ex_5,
      },
    ],
    bgColor: "#97D2FB",
    isProjCover: false,
  },
  Card2: {
    Title: "Benchmarking",
    Description:
      "In this block, participants are guided through selecting an LLM that <b>best suits their professional needs</b>. They design personal tests comprising specific tasks and evaluate the performance of different models.<br><br>The goal is to choose a model that aligns with their practical and ethical requirements.",
    Question: "How do we assess the value of an LLM?",
    IndexNum: 2,
    CoverImg: capitolsCover.coverQualyfying,
    Content: [
      {
        title: "Exercise 6 - Design your AI Trial",
        subtitle:
          "Participants design a trial to test the usefulness of an LLM, choosing four tasks that are essential or enjoyable parts of their work",
        text: "This exercise guides participants through a <b>selection process</b>, drawing from their current work practices and the potential implementation of new tasks. <br>In contrast to standardized benchmarks, which are tailor-made by engineers for LLMs, participants design a trial that revolves around their <b>professional experience</b>. <br>This personalized benchmark aims to assess whether the models can provide <b>practical value</b> that actually matters in a specific professional situation.",
        picture: photos.Ex_6,
      },
      {
        title: "Exercise 7 - Preparing for the Trial",
        subtitle:
          "Participants write detailed instructions for their tasks and choose four LLMs they wish to test",
        text: "By formulating <b>detailed instructions</b>, participants reflect on how they can effectively guide an LLM toward accomplishing a simple or complex task. They are led to consider the <b>weight of their own prompt</b> on the final result. <br>By selecting a human or a specialized model, participants explore different avenues of comparison - <b>machine versus machine</b> or <b>human versus machine</b>.",
        picture: photos.Ex_7,
      },
      {
        title: "Exercise 8 - Gathering Evidence",
        subtitle:
          "Participants ask an acquaintance to collect answers from LLMs and anonymize the results to avoid bias.",
        text: "In this exercise, participants <b>enlist the help</b> of a fellow co-inquirer, a good friend, or a colleague. <br>In addition to anonymizing results and ensuring fairness in the upcoming trial, this exercise allows participants to <b>concretely experience</b> the collaborative nature of LLM performance evaluation.",
        picture: photos.Ex_8,
      },
      {
        title: "Exercise 9 - Judgment Day",
        subtitle:
          "Participants assess the blind results of their AI trial: they rank them, explain on what ground they assessed each performance, and reflect on the trial process.",
        text: "Participants <b>rank anonymized LLM responses</b> for each task, determine the best-performing model, and <b>critically review</b> the trial's fairness and relevance.<br>This evaluation encourages participants to reflect on what matters in assessing the <b>situated value</b> of LLMs.",
        picture: photos.Ex_9,
      },
    ],

    bgColor: "#FB9799",
    isProjCover: false,
  },
  Card3: {
    Title: "Prompting",
    Description:
      "In this block, participants explore how to effectively communicate with LLMs through prompt engineering. They experiment with different prompt styles and techniques to see how they influence an LLM's outputs, aiming to better align the model's responses with their professional needs and expectations.",
    Question: "To what extent can we influence the quality of an LLM's output?",
    IndexNum: 3,
    CoverImg: capitolsCover.coverPrompting,
    Content: [
      {
        title: "Exercise 10 - The Art of the Prompt",
        subtitle:
          "Participants read about prompting techniques, attempt to put them into practice and share their insights with the group.",
        text: "Participants explore a <b>specific prompting technique</b> by practicing it throughout the week, and summarizing their findings in a concise presentation. The goal is to develop a <b>nuanced understanding</b> of how prompt design influences LLM responses.<br>Knowledge acquired about a prompting technique is shared among all participants through a short presentation, based on observations participants kept track of in a personal diary.",
        picture: photos.Ex_10,
      },
      {
        title: "Exercise 11 - Tracking Shifts",
        subtitle:
          "Participants look back on their LLM practices since the experiment began, searching for shifts and continuities",
        text: "Participants document how their use of <b>LLMs</b> has changed since the beginning of the experiment. They write two short essays—one on how their <b>practices have evolved</b> and another on what has <b>remained stable</b>—using concrete examples from their experience.<br>Through a structured discussion game, participants also analyze their shifting perspectives on LLMs. The goal is to engage in <b>collective reflection</b> in order to challenge assumptions and reinforce insights gained through the experiment.",
        picture: photos.Ex_11,
      },
    ],

    bgColor: "#A8E2B4",
    isProjCover: false,
  },
  Card4: {
    Title: "Excelling",
    Description:
      "In this block, participants use their chosen LLM to produce the highest quality work possible, attempting to recreate a masterpiece from their field. The goal is to push the model's capabilities to the fullest, testing its ability to reach the gold standard in a specialized field.",
    Question: "How closely can an LLM approach human excellence?",
    IndexNum: 4,
    CoverImg: capitolsCover.coverExcel,
    Content: [
      {
        title: "Exercise 13 - The Imitation Game",
        subtitle:
          "Participants guide an LLM towards reproducing an exemplary text from their professional field, aiming to create an exact copy.",
        text: "Participants attempt to recreate a <b>high-quality text</b> using an LLM without providing direct access to the original. This experiment tests the LLM's ability to replicate <b>style, tone, and meaning</b> while challenging participants to refine their prompting strategies.<br>Through 90-minute work sessions, screen recordings, and a logbook, participants document their process and assess the model's capacity to <b>(re)produce a text</b> it does not have access to.",
        picture: photos.Ex_13,
      },
      {
        title: "Exercise 14 - Setting Up the Example",
        subtitle:
          "Participants discuss the place of their chosen work within their professional ecology and explain why it's exemplary",
        text: "This exercise contextualizes the chosen exemplary work by examining its <b>professional significance</b>. A radar graph helps assess factors like frequency, expertise required, and error tolerance, while a structured reflection highlights what makes the work <b>exemplary</b> and worth emulating.",
        picture: photos.Ex_14,
      },
      {
        title: "Exercise 15 - Anatomy of an Exemplary Work",
        subtitle:
          "Participants break down their exemplary work into its main components and assess which elements are accessible to an LLM",
        text: "Participants analyze the underlying structure of their chosen text, mapping its key influences, professional constraints, and dependencies. <br>A layered dependency graph helps distinguish which elements are <b>accessible to an LLM</b> and which remain <b>beyond its reach</b>, reinforcing an understanding of AI's limitations.",
        picture: photos.Ex_15,
      },
      {
        title: "Exercise 16. Obstacles, Dead Ends, Highways",
        subtitle:
          "Participants examine key moments in navigating the LLM—obstacles, dead ends, and highways",
        text: "By identifying <b>challenges that can be overcome</b> through iteration or adapting a prompt, <b>situations where the LLM fails</b> to generate meaningful progress despite repeated attempts, and <b>effortless response generation</b>, participants discover patterns in their experiences and develop a clearer sense of when to persist, pivot, or abandon a strategy.<br>",
        picture: photos.Ex_16,
      },
    ],
    bgColor: "#E8D1F2",
    isProjCover: false,
  },
};

const alterEgosDb = {
  Card1: {
    Title: "Ecologies of LLM Practices",
    CoverImg: general.logoImage_white,
    Description:
      "The booming rise of <b>large language models (LLMs)</b> such as ChatGPT has sparked a rush to produce discourse about these technologies. The quick crystallisation of a shared outlook around a few key themes has <b>narrowed the scope</b> of potential interrogations. Public and scientific debates focus on technical issues: algorithmic bias, confabulation, and intellectual property violations. However, the problems and consequences associated with their <b>actual use</b> – for both their users and their professional contexts – remain largely unexplored. This asymmetry fuels a <b>mechanical view</b> of technological development and its effects, as if the technical analysis of these systems were enough to predict their social impact. Moreover, these discourses present AI as a <b>monolithic and disruptive</b> entity, dismissing the possibility that it may be aligned with existing practices and that its effects may vary depending on situations encountered in one's job. There is thus an <b>urgent need</b> to move beyond predictions about the future of work, to account for the professional contexts in which LLMs are used, and to identify <b>current issues</b> – not prospective ones. How do AI's well-known problems (bias, confabulation, etc.) manifest in established practices? What new, unexpected problems are surfacing? How do LLMs shape individual work practices? And in turn, how do professional environments shape LLMs and their use?",
    Question: "How can we reframe the role of LLMs in ordinary work practices?",
    IndexNum: 1,
    bgColor: "#000000",
  },
  Card2: {
    Title: "Methodology",
    CoverImg: general.logoImage_white,
    Question: "A necessary project in today's research landscape on LLMs",
    Description:
      "To carry out the project, we developed an <b>experimental research protocol</b> based on the <b>active involvement</b> of participants. The fruit of a <b>collaboration</b> between sociologists, science and technology researchers (STS), and designers, this protocol aims to create:<br><br><b>Room for hesitation:</b> Through a series of exercises, the protocol provides participants with various means of <b>documenting and reflecting</b> on their use of LLMs. We aim to establish a framework where <b>doubt and hesitation</b> are not only accepted but encouraged. Some exercises introduce <b>deliberate pauses</b> in professional routines, causing participants to take a <b>step back</b> from their own practices: during these pauses, judgment is suspended, giving users enough room to <b>question</b> their instinctive habits and feel unsure about what they once thought was certain. Other exercises aim to <b>intensify the use of LLMs</b> to shed light on what would otherwise remain too subtle to be perceived.<br><br><b>An ecological archive of practices:</b> The digital traces from LLM use serve as the <b>starting point</b> for the exercises we designed. They are <b>analysed, contextualised, and discussed</b> individually and collectively. Through this process, participants progressively build a <b>multimodal archive</b> (audio, photos, videos, drawings, and logbooks) that tangibly reflects their LLMs experience and how they are incorporated into various <b>professional norms</b> and material configurations.<br><br><b>A workbook (vademecum):</b> The workbook collects all the exercises and their instructions, organized into <b>thematic blocks</b>. Designed as a <b>modular object</b>, where pages can be added or removed as needed, it accompanies each participant throughout the protocol. The vademecum serves as both the <b>material support</b> for the protocol and the project's means of <b>dissemination</b>, as it can be reproduced and adapted in various academic and professional contexts.",
    IndexNum: 2,
    bgColor: "#000000",
  },
  Card3: {
    Title: "Objective",
    CoverImg: general.logoImage_white,
    Question:
      "How do professionals evaluate, adapt to, and perceive LLMs in their work?",
    Description:
      'To answer these questions, the Ecologies of LLM Practices (EL2MP) project creates research areas dedicated to workers for them to document and reflect on their use of LLMs. Our investigation aims to highlight the "savoir-faire", expertise, and values of workers rather than those of AI designers or economic decision-makers. The project aims to scrupulously examine how LLMs fit into various professional practices. EL2MP will investigate how users relate to LLMs in terms of:<br><br><b>Evaluation:</b> How do professionals assess the value LLMs add or remove?<br><br><b>Effort:</b> What new kinds of work do LLMs require from their users?<br><br><b>Perception:</b> How do workers evaluate and perceive LLMs over time as they continue working with them?',
    IndexNum: 3,
    bgColor: "#000000",
  },

  Card4: {
    Title: "Context",
    CoverImg: general.logoImage_white,
    Question:
      "How to document practices shaped and influenced by the project itself?",
    Description:
      "The booming rise of <b>large language models (LLMs)</b> such as ChatGPT has sparked a rush to produce discourse about these technologies. The quick crystallisation of a shared outlook around a few key themes has <b>narrowed the scope</b> of potential interrogations. Public and scientific debates focus on technical issues: algorithmic bias, confabulation, and intellectual property violations. <br><br>However, the problems and consequences associated with their <b>actual use</b> – for both their users and their professional contexts – remain largely unexplored. This asymmetry fuels a <b>mechanical view</b> of technological development and its effects, as if the technical analysis of these systems were enough to predict their social impact. <br><br>Moreover, these discourses present AI as a <b>monolithic and disruptive</b> entity, dismissing the possibility that it may be aligned with existing practices and that its effects may vary depending on situations encountered in one's job.<br><br>There is thus an <b>urgent need</b> to move beyond predictions about the future of work, to account for the professional contexts in which LLMs are used, and to identify <b>current issues</b> – not prospective ones. <br><br>How do AI's well-known problems (<b>bias, confabulation, etc.</b>) manifest in established practices? What new, unexpected problems are surfacing? How do LLMs shape individual work practices? And in turn, how do professional environments shape LLMs and their use?",
    IndexNum: 4,
    bgColor: "#000000",
  },
  Card5: {
    Title: "AlterEgo4",
    Description: "This is the description of the alter ego",
    IndexNum: 5,
    bgColor: "#000000",
  },
};

const floatersDb = {
  Floater1: {
    Title: "Floater_prompting_1.webm",
    id: 1,
    category: "video",
    media: floaters.Prompting_floater_1,
    file: "documents/template.pdf",
    parent: "Prompting",
  },
  Floater2: {
    Title: "Floater_prompting_2.webm",
    id: 2,
    category: "video",
    media: floaters.Prompting_floater_2,
    href: "",
    parent: "Prompting",
  },
  Floater3: {
    Title: "Floater_prompting_3.jpg",
    id: 3,
    category: "image",
    media: floaters.Prompting_floater_3,
    href: "",
    parent: "Prompting",
  },
  Floater4: {
    Title: "Floater_prompting_4.jpg",
    id: 4,
    category: "image",
    media: floaters.Prompting_floater_4,
    href: "",
    parent: "Prompting",
  },
  Floater5: {
    Title: "Floater_qualifying_1.webm",
    id: 5,
    category: "video",
    media: floaters.Qualifying_floater_1,
    href: "",
    parent: "Qualifying",
  },
  Floater6: {
    Title: "Floater_qualifying_2.webm",
    id: 6,
    category: "video",
    media: floaters.Qualifying_floater_2,
    file: "documents/template.pdf",
    parent: "Qualifying",
  },
  Floater7: {
    Title: "Floater_qualifying_3.jpg",
    id: 7,
    category: "image",
    media: floaters.Qualifying_floater_3,
    href: "",
    parent: "Qualifying",
  },
  Floater8: {
    Title: "Floater_qualifying_4.jpg",
    id: 8,
    category: "image",
    media: floaters.Qualifying_floater_4,
    href: "",
    parent: "Qualifying",
  },
  Floater9: {
    Title: "Floater_excelling_1.jpg",
    id: 9,
    category: "image",
    media: floaters.Excelling_floater_1,
    file: "documents/template.pdf",
    parent: "Excelling",
  },
  Floater10: {
    Title: "Floater_excelling_2.webm",
    id: 10,
    category: "video",
    media: floaters.Excelling_floater_2,
    href: "",
    parent: "Excelling",
  },
  Floater11: {
    Title: "Floater_excelling_3.webm",
    id: 11,
    category: "video",
    media: floaters.Excelling_floater_3,
    href: "",
    parent: "Excelling",
  },
  Floater12: {
    Title: "Floater_excelling_4.webm",
    id: 12,
    category: "video",
    media: floaters.Excelling_floater_4,
    href: "",
    parent: "Excelling",
  },
  Floater13: {
    Title: "Floater_benchmarking_1.webm",
    id: 13,
    category: "video",
    media: floaters.Benchmarking_floater_1,
    href: "",
    parent: "Benchmarking",
  },
  Floater14: {
    Title: "Floater_benchmarking_2.webm",
    id: 14,
    category: "video",
    media: floaters.Benchmarking_floater_2,
    href: "",
    parent: "Benchmarking",
  },
  Floater15: {
    Title: "Floater_benchmarking_3.jpg",
    id: 15,
    category: "image",
    media: floaters.Benchmarking_floater_3,
    href: "",
    parent: "Benchmarking",
  },
  Floater16: {
    Title: "Floater_benchmarking_4.jpg",
    id: 16,
    category: "image",
    media: floaters.Benchmarking_floater_4,
    href: "",
    parent: "Benchmarking",
  }
};
