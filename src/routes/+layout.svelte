<slot />


<svelte:head>
  <!-- Essential Metadata -->
  <title>Ecologies of LLM Practices - Artificial Inquiries</title>
  <link rel="canonical" href="https://ecologiesofllm.medialab.sciencespo.fr/" />
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="google-site-verification" content="aCBTb2lNIupPesJ45f0x0AFWx8Wy9VpvWxFBNJnZ4e8" />
  
  <!-- SEO Description and Keywords -->
  <meta name="description" content="A team of sociologists and designers explores how Large Language Models, like ChatGPT, influence professional practices and ordinary knowledge work. Their experimental and qualitative research protocol, 'Artificial Inquiries', is open to replication and appropriation by professionals and researchers alike." />
  <meta name="keywords" content="Large Language Models, Artificial Intelligence, Work, Professionals, Practices, Sociology, Science and Technology Studies, Research, Design, Qualitative Research, ChatGPT" />
  <meta name="author" content="Gabriel Alcaras, Donato Ricci, Tommaso Prinetti" />
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Ecologies of LLM Practices - Artificial Inquiries" />
  <meta property="og:description" content="A team of sociologists and designers explores how Large Language Models, like ChatGPT, influence professional practices and ordinary knowledge work. Their experimental and qualitative research protocol, 'Artificial Inquiries', is open to replication and appropriation by professionals and researchers alike." />
  <meta property="og:url" content="https://ecologiesofllm.medialab.sciencespo.fr/" />
  <meta property="og:image" content="https://ecologiesofllm.medialab.sciencespo.fr/og_images/opengraph.jpg" />
  <meta property="og:image:alt" content="EL2MP Logo - Ecologies des Pratiques LLMs" />
  <meta property="og:logo" content="https://ecologiesofllm.medialab.sciencespo.fr/og_images/enhanced_logoImage.png" />
  <meta property="og:site_name" content="Ecologies of LLM Practices" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:locale:alternate" content="fr_FR" />
  <meta property="fb:app_id" content="123456789012345" />

  <!-- IA Meta Tags -->
  <meta property="ia:markup_url" content="https://ecologiesofllm.medialab.sciencespo.fr/ia/ia-markup.json" />
  <meta property="ia:markup_url_dev" content="https://ecologiesofllm.medialab.sciencespo.fr/ia/ia-markup-dev.json" />
  <meta property="ia:rules_url" content="https://ecologiesofllm.medialab.sciencespo.fr/ia/ia-rules.json" />
  <meta property="ia:rules_url_dev" content="https://ecologiesofllm.medialab.sciencespo.fr/ia/ia-rules-dev.json" />

  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Ecologies of LLM Practices - Artificial Inquiries" />
  <meta name="twitter:description" content="A team of sociologists and designers explores how Large Language Models, like ChatGPT, influence professional practices and ordinary knowledge work. Their experimental and qualitative research protocol, 'Artificial Inquiries', is open to replication and appropriation by professionals and researchers alike." />
  <meta name="twitter:image" content="https://ecologiesofllm.medialab.sciencespo.fr/og_images/opengraph.jpg" />
  <meta name="twitter:image:alt" content="EL2MP Logo - Ecologies of LLM Practices" />

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8DHX3VYCYS"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-8DHX3VYCYS');
  </script>

  <!-- Structured data for better SEO -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://medialab.sciencespo.fr/",
          "name": "médialab, Sciences Po (Paris, France)",
          "url": "https://medialab.sciencespo.fr/",
          "logo": "https://medialab.sciencespo.fr/img/cover-fb.png",
          "parentOrganization": {
            "@type": "Organization",
            "name": "Ecologies of LLM Practices"
          }
        },
        {
          "@type": "Website",
          "name": "EL2MP Research Project Website",
          "url": "https://ecologiesofllm.medialab.sciencespo.fr/",
          "publisher": {
            "@type": "Organization",
            "@id": "https://medialab.sciencespo.fr/"
          },
          "description": "Official website for the EL2MP research project by Sciences Po's médialab, documenting the integration and impact of Large Language Models in professional practices.",
          "mainEntity": {
            "@type": "ResearchProject",
            "@id": "https://ecologiesofllm.medialab.sciencespo.fr/"
          }
        },
        {
          "@type": "ResearchProject",
          "@id": "https://ecologiesofllm.medialab.sciencespo.fr/",
          "name": "Ecologies of LLM Practices (EL2MP)",
          "alternateName": "Ecologies of LLM Practices",
          "description": "A team of sociologists and designers explores how Large Language Models, like ChatGPT, influence professional practices and ordinary knowledge work. Their experimental and qualitative research protocol, 'Artificial Inquiries', is open to replication and appropriation by professionals and researchers alike.",
          "url": "https://ecologiesofllm.medialab.sciencespo.fr/",
          "logo": "https://ecologiesofllm.medialab.sciencespo.fr/og_images/opengraph.jpg",
          "provider": {
            "@type": "Organization",
            "@id": "https://medialab.sciencespo.fr/"
          },
          "keywords": [
            "Large Language Models",
            "Artificial Intelligence",
            "Work",
            "Professionals",
            "Practices",
            "Sociology",
            "Science and Technology Studies",
            "Research",
            "Design",
            "Qualitative Research",
            "ChatGPT"
          ]
        }
      ]
    }
  </script>
  
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8DHX3VYCYS"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8DHX3VYCYS');
  </script>
</svelte:head>

<script>
  import { currentFocus, isAlterEgoMode } from "$lib/stores/globalStores";
  import { onMount } from "svelte";
  import { replaceState, beforeNavigate } from "$app/navigation";

  $: if ($currentFocus !== null) {
    if (typeof window !== 'undefined') {
      window.location.hash = $currentFocus;
    }
  }

  onMount(() => {
    /* ----------------------------------
       Strip hash fragment if the page load
       was triggered by a hard reload (Cmd+R, F5 …).
    ---------------------------------- */
    try {
      const navEntry = performance.getEntriesByType('navigation')[0];
      const isReload  = navEntry && navEntry.type === 'reload';
      if (isReload && window.location.hash) {
        // Remove the fragment without adding a new history entry
        history.replaceState(null, '', window.location.pathname);
      }
    } catch (e) {
      // Fallback for older browsers – do nothing
    }

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && hash !== $currentFocus) {
        currentFocus.set(hash);
      }
    };

    if (window.location.hash) {
      const initialHash = window.location.hash.slice(1);
      currentFocus.set(initialHash);
    }

    window.addEventListener('hashchange', handleHashChange);


    window.addEventListener('beforeunload', () => {
      /*
        Goal: if the user refreshes the page (Cmd + R, F5, etc.) while a
        fragment identifier is present we strip the hash so the next load
        starts from the clean root URL. Otherwise we fall back to the
        previous behaviour that resets non-root paths to "/".
      */
      if (window.location.hash) {
        // Remove only the fragment – keep the current pathname
        window.history.replaceState(null, '', window.location.pathname);
      } else if (window.location.pathname !== '/') {
        window.history.replaceState(null, '', '/');
      }
    });

    beforeNavigate(() => {
      if (window.location.hash) {
          currentFocus.set(null); 
      }
  });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  });

</script>


<style>
  :global(button) {
        appearance: none; /* Removes default styles */
        font-family: inherit; /* Matches the button font with the surrounding text */
        font-size: 1rem; /* Ensures consistent sizing */
        font-weight: 400; /* Neutral font weight */
        line-height: 1.5; /* Comfortable line height */
        color: #333; /* Neutral text color */
        background-color: #f8f9fa; /* Neutral light gray background */

        border: 1px solid black; /* Light gray border */

        border-radius: 4px; /* Slight rounding for modern feel */
        padding: 0.5em 1em; /* Comfortable padding */
        text-align: center; /* Center-aligns text */
        display: inline-block; /* Suitable for buttons */
        transition: background-color 0.2s ease, border-color 0.2s ease,
            color 0.2s ease; /* Smooth hover effect */

        /*these are the stable classes */

        position: fixed;

        display: inline-flex;
        height: auto;
        width: auto;
        padding: var(--spacing-S, 10px);
        flex-shrink: 0;

        justify-content: flex-start;
        align-items: flex-start;

        background-color: #EAEAEA;
        cursor: pointer;
        z-index: 100;
    }

    :global(button:hover) {
        background-color: #D9D9D9;
        color: var(--full-black);
        cursor: pointer;
    }

    :root {
      --slider-radius: 4vw;
      @media (max-width: 768px) {
        --slider-radius: 3vw;
      }
    }

    :global(body) {
        margin: 0; /* Removes default body margin */
        padding: 0; /* Removes default body padding */
        color: #333; /* Default text color */
        background-color: transparent; /* Default background color */
        min-height: 100%;
        min-width: 100%;
        display: flex; /* Allows flexible layout setups */
        flex-direction: column; /* Stacks content vertically */
        align-items: center; /* Centers content horizontally */
        justify-content: flex-start; /* Aligns content at the top */
        overflow: hidden;
        scroll-behavior: none;
        touch-action: manipulation; /* Disable double-tap to zoom */


        @media (max-width: 768px) {
            height: 100%;
            max-height: 100vh;
        }
    }


    :global(button) {
        appearance: none; /* Removes default styles */
        font-family: inherit; /* Matches the button font with the surrounding text */
        font-size: 1rem; /* Ensures consistent sizing */
        font-weight: 400; /* Neutral font weight */
        line-height: 1.5; /* Comfortable line height */
        color: #333; /* Neutral text color */
        background-color: #f8f9fa; /* Neutral light gray background */

        border: 1px solid black; /* Light gray border */

        border-radius: 4px; /* Slight rounding for modern feel */
        padding: 0.5em 1em; /* Comfortable padding */
        text-align: center; /* Center-aligns text */
        display: inline-block; /* Suitable for buttons */
        transition: background-color 0.2s ease, border-color 0.2s ease,
            color 0.2s ease; /* Smooth hover effect */

        /*these are the stable classes */

        position: fixed;

        display: inline-flex;
        height: auto;
        width: auto;
        padding: var(--spacing-S, 10px);
        flex-shrink: 0;

        justify-content: flex-start;
        align-items: flex-start;

        background-color: #EAEAEA;
        cursor: pointer;
        z-index: 100;
    }

    :global(button:hover) {
        background-color: #D9D9D9;
        color: var(--full-black);
        cursor: pointer;
    }

    /* Ensure consistent box-sizing across all elements */
        :global(*),
        :global(*::before),
        :global(*::after) {
        box-sizing: inherit;
        /* scrollbar-color: black var(--full-black);
        scrollbar-width: thin;
        scrollbar-gutter: stable both-edges; */
    }

    /* Responsive Typography */
    :global(h1),
    :global(h2),
    :global(h3),
    :global(.h4),
    :global(.h5),
    :global(.h6) {
        margin: 0;
        font-weight: 600;
        line-height: 1.2;
        white-space: pre-line;
    }

    /* Utility styles */
    :global(a) {
        text-decoration: none;
        color: inherit;
    }

    :global(img) {
        max-width: 100%;
        height: auto;
        display: block;
    }

    :global(ul),
    :global(ol) {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    :global(*) {
        margin: 0px;
        padding: 0px;
        text-rendering: optimizeLegibility;
    }

    :global(:root) {
        --demi-white: #F7F7F7;
        --full-white: #FFFFFF;
        --full-black: #000000;
        --serif-font-family: 'Instrument Serif';
        --sans-font-family: 'Instrument Sans';
        --fallback-serif-font: 'serif';
        --fallback-sans-font: 'sans-serif';
        --transition-times: 1s;
        --transition-curve: cubic-bezier(.84,0,.75,1);

        interpolate-size: allow-keywords;

        /* SPACING SYSTEM */
        --spacing-XS: 0.3125em; /* 5px */
        --spacing-S: 0.625em;   /* 10px */
        --spacing-M: 0.9375em; /* 15px */
        --spacing-L: 1.875em;  /* 30px */
        --spacing-XL: 3.75em;  /* 60px */
        --spacing-2XL: 7.5em;  /* 120px */
        --spacing-3XL: 15em;   /* 240px */
    }

    :global(h1) {
        font-size: 9vw;
        line-height: 1;

        @media (min-width: 1920px) {
            font-size: 12em;
        }

        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;
        user-select: none;
        touch-action: none;
    }

    :global(h2) {
        font-size: 3.15em; /* 60px */
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;
    }

    :global(h3) {
        font-size: 2.5em; /* 48px */
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;   
    }

    :global(.h4) {
        font-size: 1.7em;

        @media (min-width: 1920px) {
            font-size: 2.4em;
        }
        
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;
    }

    :global(.s1) {
        font-size: 1.125em;

        @media (min-width: 1920px) {
            font-size: 1.5em;
        }

        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
    }

    :global(.s2) {
        font-size: 0.875em; /* 14px */

        @media (min-width: 1920px) {
            font-size: 1.2em;
        }

        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
    }

    :global(.p1) {
        font-size: 2.3vw;
        line-height: 1.2;
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;

        @media (min-width: 1920px) {
                font-size: 1.5vw;
                margin-top: -0.14em;
        }
    }

    :global(.p2) {
        font-size: 1.7vw;
        line-height: 1.5;
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;

        @media (min-width: 1920px) {
                font-size: 1.6vw;
                margin-top: -0.14em;
        }

    }

    :global(.p3) {
        font-size: 1.4vw;
        line-height: 1.5;
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;

        @media (min-width: 1920px) {
                font-size: 1vw;
                line-height: 1.4;
                margin-top: -0.14em;
        }
    }

    :global(.caption) {
      font-size: 1.2vw;
        line-height: 1.5;
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
        color: #717171;

        @media (min-width: 1920px) {
                font-size: 1vw;
                line-height: 1.4;
                margin-top: -0.14em;
        }
    }

    :global(hr) {
        width: 80%;
        height: 1px;
        background-color: #333;
        border: none;
        margin-top: var(--spacing-M);
        margin-bottom: var(--spacing-M);
        margin-left: 10%;
    }

    :global(::selection) {
        background-color:var(--full-black);
        color: var(--full-white);
    }


    @font-face {
        font-family: 'Instrument Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/InstrumentSans-Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Instrument Serif';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/InstrumentSerif-Regular.ttf') format('truetype');
    }
</style>
