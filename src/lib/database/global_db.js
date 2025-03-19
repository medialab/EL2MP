/* THIS IS GLOBAL_DB.JS 🚀*/

import { photos, capitolsCover, general, videos } from "$database/config.js";
export { cardsDb, floatersDb, alterEgosDb, projectDescription };

const cardsDb = {
  Card1: {
    Title: "Qualifying",
    Description:
      "The first block is about adopting a reflexive posture towards the use of LLMs. Participants engage in exercises that help them become more aware of their practices, attitudes, and assumptions about AI technologies. This block serves as a foundational phase, akin to a practice ground, where participants start to think critically about their relationship with LLMs.",
    Question:
      "Where do LLMs live in our professional practices, norms, and relationships?",
    IndexNum: 1,
    CoverImg: capitolsCover.cover_1,
    Content: [
      {
        title: "Exercise 1 - Draw It Like You See It",
        subtitle:
          "To carry out the project, we developed an experimental research protocol based on the active involvement of participants. The fruit of a collaboration between sociologists, science and technology researchers (STS), and designers, this protocol aims to create:\n\nRoom for hesitation: Through a series of exercises, the protocol provides participants with various means of documenting and reflecting on their use of LLMs. We aim to establish a framework where doubt and hesitation are not only accepted but encouraged. Some exercises introduce deliberate pauses in professional routines, causing participants to take a step back from their own practices: during these pauses, judgment is suspended, giving users enough room to question their instinctive habits and feel unsure about what they once thought was certain. Other exercises aim to intensify the use of LLMs to shed light on what would otherwise remain too subtle to be perceived.\n\nAn ecological archive of practices: The digital traces from LLM use serve as the starting point for the exercises we designed. They are analysed, contextualised, and discussed individually and collectively. Through this process, participants progressively build a multimodal archive (audio, photos, videos, drawings, and logbooks) that tangibly reflects their LLMs experience and how they are incorporated into various professional norms and material configurations.\n\nA workbook (vademecum): The workbook collects all the exercises and their instructions, organized into thematic blocks. Designed as a modular object, where pages can be added or removed as needed, it accompanies each participant throughout the protocol. The vademecum serves as both the material support for the protocol and the project's means of dissemination, as it can be reproduced and adapted in various academic and professional contexts.",
      },
      {
        title: "Exercise 2 - Harvesting Tasks",
        subtitle:
          "Participants account for the tasks they perform in their work and how LLMs could assist them",
        text: "This exercise helps participants reflect on their existing work, revealing overlooked or underappreciated tasks. They also explore what other work they could do with the assistance of an LLM, generating material for future exercises",
        picture: photos.image_6,
      },
      {
        title: "Exercise 3 - Taking Stock",
        subtitle:
          "Participants review their ChatGPT history to identify usage patterns and what stands out",
        text: "This exercise prompts participants to critically assess their LLM interactions through self-evaluation and a structured review of their conversation history. It highlights gaps between perception and actual use to further their understanding of their LLM usage rather than relying on habitual talking points or anecdotes.",
        picture: photos.image_15,
      },
      {
        title: "Exercise 4 - Memorable Conversations",
        subtitle:
          "Participants identify what made some conversations with ChatGPT remarkable",
        text: "Participants analyze past LLM interactions that stood out due to emotional impact, moral hesitation, or significant outcomes. They rate the model's performance and explore why it performed as it did, fostering awareness about LLM capabilities and professional expectations.",
        picture: photos.image_18,
      },
      {
        title: "Exercise 5 - Subtracting the Machine",
        subtitle:
          "Participants describe memorable interactions with ChatGPT without using terms like 'LLM' or 'ChatGPT'.",
        text: "This thought experiment creates artificial constraints on how participants talk about their use of LLMs. Because they cannot rely on ready-made categories (e.g., 'ChatGPT', 'machine', or 'assistant'), participants need to reconsider their interactions with the models, playing with different metaphors and analogies drawn from their social and professional environments.",
        picture: photos.image_11,
      },
    ],
    bgColor: "#97D2FB",
    isProjCover: false,
  },
  Card2: {
    Title: "Benchmarking",
    Description: "How do we assess the value of an LLM?",
    IndexNum: 2,
    CoverImg: photos.image_6,
    Content: [
      {
        title: "Exercise 6 - Design your AI Trial",
        subtitle:
          "Participants design a trial to test the usefulness of an LLM, choosing four tasks that are essential or enjoyable parts of their work",
        text: "This exercise guides participants through a selection process, drawing from their current work practices and the potential implementation of new tasks. In contrast to standardized benchmarks, which are tailor-made by engineers for LLMs, participants design a trial that revolves around their professional experience. This personalized benchmark aims to assess whether the models can provide practical value that actually matters in a specific professional situation.",
        picture: photos.image_7,
      },
      {
        title: "Exercise 7 - Preparing for the Trial",
        subtitle:
          "Participants write detailed instructions for their tasks and choose four LLMs they wish to test",
        text: "By formulating detailed instructions, participants reflect on how they can effectively guide an LLM toward accomplishing a simple or complex task. They are led to consider the weight of their own prompt on the final result. By selecting a human or a specialized model, participants explore different avenues of comparison - machine versus machine or human versus machine.",
        picture: photos.image_12,
      },
      {
        title: "Exercise 8 - Gathering Evidence",
        subtitle:
          "Participants ask an acquaintance to collect answers from LLMs and anonymize the results to avoid bias.",
        text: "In this exercise, participants enlist the help of a fellow co-inquirer, a good friend, or a colleague. In addition to anonymizing results and ensuring fairness in the upcoming trial, this exercise allows participants to concretely experience the collaborative nature of LLM performance evaluation.",
        picture: photos.image_3, // Randomly chosen
      },
      {
        title: "Exercise 9 - Judgment Day",
        subtitle:
          "Participants assess the blind results of their AI trial: they rank them, explain on what ground they assessed each performance, and reflect on the trial process.",
        text: "Participants rank anonymized LLM responses for each task, determine the best-performing model, and critically review the trial's fairness and relevance. This evaluation encourages participants to reflect on what matters in assessing the situated value of LLMs.",
        picture: photos.image_15, // Randomly chosen
      },
    ],

    bgColor: "#FB9799",
    isProjCover: false,
  },
  Card3: {
    Title: "Prompting",
    Description:
      "Exploring modern approaches to foster innovation in organizations",
    IndexNum: 3,
    CoverImg: photos.image_8,
    Content: [
      {
        title: "Exercise 1 - Ideation",
        text: "Generate a wide array of ideas to solve a problem or enhance a product. This exercise encourages free thinking and helps develop creative solutions.",
        picture: photos.image_10, // Randomly chosen
      },
      {
        title: "Exercise 2 - SWOT Analysis",
        text: "Evaluate the strengths, weaknesses, opportunities, and threats related to a new business idea or strategy.",
        picture: photos.image_14, // Randomly chosen
      },
      {
        title: "Exercise 3 - Brainstorming",
        text: "Collaboratively generate ideas to tackle a specific challenge. This exercise encourages participants to think creatively and build on each other's ideas.",
        picture: photos.image_16, // Randomly chosen
      },
      {
        title: "Exercise 4 - Mind Mapping",
        text: "Create a visual representation of thoughts and ideas to explore connections and generate new perspectives on a topic.",
        picture: photos.image_20, // Randomly chosen
      },
      {
        title: "Exercise 5 - Rapid Prototyping",
        text: "Design quick prototypes of ideas to test and iterate rapidly. This exercise promotes agility in the innovation process.",
        picture: photos.image_19, // Randomly chosen
      },
      {
        title: "Exercise 6 - User Feedback",
        text: "Engage users early to collect feedback on prototypes and ideas. This exercise helps refine and improve solutions.",
        picture: photos.image_9, // Randomly chosen
      },
      {
        title: "Exercise 7 - Innovation Pitch",
        text: "Present your innovative ideas to stakeholders and gather feedback on their viability and potential for success.",
        picture: photos.image_18, // Randomly chosen
      },
    ],

    bgColor: "#A8E2B4",
    isProjCover: false,
  },
  Card4: {
    Title: "Ekhprasis",
    Description: "Understanding and interpreting data for actionable insights",
    IndexNum: 4,
    CoverImg: photos.image_2,
    Content: [
      {
        title: "Exercise 1 - Data Collection",
        text: "Learn how to collect data effectively, ensuring that it is accurate, reliable, and relevant to your analysis goals.",
        picture: photos.image_11, // Randomly chosen
      },
      {
        title: "Exercise 2 - Data Cleaning",
        text: "Explore techniques for cleaning data, handling missing values, and correcting inaccuracies to prepare it for analysis.",
        picture: photos.image_17, // Randomly chosen
      },
      {
        title: "Exercise 3 - Exploratory Data Analysis",
        text: "Analyze data to uncover patterns, trends, and insights using visualizations and statistical techniques.",
        picture: photos.image_4, // Randomly chosen
      },
      {
        title: "Exercise 4 - Predictive Modeling",
        text: "Learn how to build and evaluate predictive models to forecast future trends or behaviors based on historical data.",
        picture: photos.image_13, // Randomly chosen
      },
      {
        title: "Exercise 5 - Data Visualization",
        text: "Master the art of creating compelling visualizations that communicate data insights clearly and effectively.",
        picture: photos.image_14, // Randomly chosen
      },
      {
        title: "Exercise 6 - Data Interpretation",
        text: "Understand how to interpret the results of data analyses and make data-driven decisions.",
        picture: photos.image_8, // Randomly chosen
      },
      {
        title: "Exercise 7 - Reporting Results",
        text: "Learn how to present data findings in a clear and engaging way to stakeholders, ensuring that the insights are actionable.",
        picture: photos.image_12, // Randomly chosen
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
      "The booming rise of large language models (LLMs) such as ChatGPT has sparked a rush to produce discourse about these technologies. The quick crystallisation of a shared outlook around a few key themes has narrowed the scope of potential interrogations. Public and scientific debates focus on technical issues: algorithmic bias, confabulation, and intellectual property violations. However, the problems and consequences associated with their actual use – for both their users and their professional contexts – remain largely unexplored. This asymmetry fuels a mechanical view of technological development and its effects, as if the technical analysis of these systems were enough to predict their social impact. Moreover, these discourses present AI as a monolithic and disruptive entity, dismissing the possibility that it may be aligned with existing practices and that its effects may vary depending on situations encountered in one’s job. There is thus an urgent need to move beyond predictions about the future of work, to account for the professional contexts in which LLMs are used, and to identify current issues – not prospective ones. How do AI's well-known problems (bias, confabulation, etc.) manifest in established practices? What new, unexpected problems are surfacing? How do LLMs shape individual work practices? And in turn, how do professional environments shape LLMs and their use?",
    IndexNum: 1,
    bgColor: "#000000",
  },
  Card2: {
    Title: "Methodology",
    Description:
      "To carry out the project, we developed an experimental research protocol based on the active involvement of participants. The fruit of a collaboration between sociologists, science and technology researchers (STS), and designers, this protocol aims to create:\\n\\nRoom for hesitation: Through a series of exercises, the protocol provides participants with various means of documenting and reflecting on their use of LLMs. We aim to establish a framework where doubt and hesitation are not only accepted but encouraged. Some exercises introduce deliberate pauses in professional routines, causing participants to take a step back from their own practices: during these pauses, judgment is suspended, giving users enough room to question their instinctive habits and feel unsure about what they once thought was certain. Other exercises aim to intensify the use of LLMs to shed light on what would otherwise remain too subtle to be perceived.\\n\\nAn ecological archive of practices: The digital traces from LLM use serve as the starting point for the exercises we designed. They are analysed, contextualised, and discussed individually and collectively. Through this process, participants progressively build a multimodal archive (audio, photos, videos, drawings, and logbooks) that tangibly reflects their LLMs experience and how they are incorporated into various professional norms and material configurations.\\n\\nA workbook (vademecum): The workbook collects all the exercises and their instructions, organized into thematic blocks. Designed as a modular object, where pages can be added or removed as needed, it accompanies each participant throughout the protocol. The vademecum serves as both the material support for the protocol and the project's means of dissemination, as it can be reproduced and adapted in various academic and professional contexts.",
    IndexNum: 2,
    bgColor: "#000000",
  },
  Card3: {
    Title: "Objective",
    Description:
      'To answer these questions, the Ecologies of LLM Practices (EL2MP) project creates research areas dedicated to workers for them to document and reflect on their use of LLMs. Our investigation aims to highlight the "savoir-faire", expertise, and values of workers rather than those of AI designers or economic decision-makers. The project aims to scrupulously examine how LLMs fit into various professional practices. EL2MP will investigate how users relate to LLMs in terms of:\\n\\nEvaluation: How do professionals assess the value LLMs add or remove?\\n\\nEffort: What new kinds of work do LLMs require from their users?\\n\\nPerception: How do workers evaluate and perceive LLMs over time as they continue working with them?',
    IndexNum: 3,
    bgColor: "#000000",
  },
  Card4: {
    Title: "Context",
    Description:
      "The booming rise of large language models (LLMs) such as ChatGPT has sparked a rush to produce discourse about these technologies. The quick crystallisation of a shared outlook around a few key themes has narrowed the scope of potential interrogations. Public and scientific debates focus on technical issues: algorithmic bias, confabulation, and intellectual property violations. However, the problems and consequences associated with their actual use – for both their users and their professional contexts – remain largely unexplored. This asymmetry fuels a mechanical view of technological development and its effects, as if the technical analysis of these systems were enough to predict their social impact. Moreover, these discourses present AI as a monolithic and disruptive entity, dismissing the possibility that it may be aligned with existing practices and that its effects may vary depending on situations encountered in one's job.\\n\\nThere is thus an urgent need to move beyond predictions about the future of work, to account for the professional contexts in which LLMs are used, and to identify current issues – not prospective ones. How do AI's well-known problems (bias, confabulation, etc.) manifest in established practices? What new, unexpected problems are surfacing? How do LLMs shape individual work practices? And in turn, how do professional environments shape LLMs and their use?",
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
    Title: "project-plan.pdf",
    id: 1,
    category: "document",
    media: "",
    file: "documents/template.pdf",
    parent: "Qualifying",
  },
  Floater2: {
    Title: "tutorial-video.mp4",
    id: 2,
    category: "video",
    media: videos.topcamera_1,
    href: "",
    parent: "Qualifying",
  },
  Floater3: {
    Title: "landscape-photo.jpg",
    id: 3,
    category: "image",
    media: photos.image_13,
    href: "",
    parent: "Qualifying",
  },
  Floater4: {
    Title: "team-introduction.mp4",
    id: 4,
    category: "video",
    media: videos.cardsgame_1,
    href: "",
    parent: "Qualifying",
  },
  Floater5: {
    Title: "design-mockup.png",
    id: 5,
    category: "image",
    media: photos.image_12,
    href: "",
    parent: "Qualifying",
  },
  Floater6: {
    Title: "page-template.pdf",
    id: 6,
    category: "document",
    media: "",
    file: "documents/template.pdf",
    parent: "Qualifying",
  },
  Floater7: {
    Title: "coding-tutorial.mp4",
    id: 7,
    category: "video",
    media: "",
    href: "",
    parent: "Qualifying",
  },
  Floater8: {
    Title: "company-logo.svg",
    id: 8,
    category: "image",
    media: photos.image_3,
    href: "",
    parent: "Qualifying",
  },
  Floater9: {
    Title: "meeting-notes.docx",
    id: 9,
    category: "document",
    media: "",
    file: "documents/template.pdf",
    parent: "Qualifying",
  },
  Floater10: {
    Title: "holiday-slideshow.mp4",
    id: 10,
    category: "video",
    media: "",
    href: "",
    parent: "Qualifying",
  },
  Floater11: {
    Title: "https://medialabsciencespo.com",
    id: 11,
    category: "link",
    media: "",
    href: "",
    parent: "Qualifying",
  },
  Floater12: {
    Title: "extended_logo.svg",
    id: 12,
    category: "image",
    media: general.enhanced_logoImage,
    href: "",
    parent: "Qualifying",
  },
  Floater13: {
    Title: "extended_logo.svg",
    id: 13,
    category: "image",
    media: general.enhanced_logoImage,
    href: "",
    parent: "Benchmarking",
  },
  Floater14: {
    Title: "extended_logo.svg",
    id: 14,
    category: "image",
    media: general.enhanced_logoImage,
    href: "",
    parent: "Benchmarking",
  },
};

const projectDescription =
  "The Écologies des Pratiques project explores the transformative impact of Large Language Models (LLMs) on research, creativity, and communication across various domains. Supported by Google through its commitment to advancing ethical and impactful AI practices, this initiative combines cutting-edge technological tools with critical reflection on their implications. <br><br>At the heart of this project lies a collaborative and interdisciplinary approach, engaging researchers, practitioners, and students from diverse fields. By experimenting with LLMs, we seek to understand their potential as catalysts for new forms of knowledge production and dissemination while addressing the ecological and ethical questions they raise. The project delves into three key areas: <br><br> Technological Experimentation: By integrating LLMs into practical workflows, we assess how these tools reshape academic and professional practices. From creative writing to data analysis, the project tests the boundaries of LLMs' generative capabilities.<br><br> Critical Reflection: Alongside experimentation, we foster discussions on the broader societal and ecological implications of LLM adoption. What are the costs and benefits of scaling these technologies? How do they challenge or reinforce existing structures of knowledge and power?<br><br> Community Building: Through workshops, public events, and collaborative platforms, we aim to build a community of thinkers and makers who can collectively imagine and shape the future of AI-driven practices.<br><br> With Google's support, Écologies des Pratiques not only investigates the possibilities of LLMs but also critically examines their role within contemporary ecological, cultural, and institutional systems. By bridging technological innovation and critical inquiry, this project seeks to illuminate how these powerful tools can contribute responsibly to a sustainable and inclusive future.";
