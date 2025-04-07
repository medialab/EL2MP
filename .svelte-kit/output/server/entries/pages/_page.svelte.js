import { I as current_component, J as ensure_array_like, K as attr, M as attr_style, N as stringify, O as attr_class, P as store_get, Q as unsubscribe_stores, R as bind_props, p as pop, b as push, e as escape_html, S as store_set } from "../../chunks/index.js";
import { w as writable } from "../../chunks/index2.js";
import "clsx";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
const selectedCard = writable("Qualifying");
const isAlterEgoMode = writable(true);
const currentCardColor = writable("white");
const highestZIndex = writable(1);
const lastCardColor = writable(null);
const isDesktop = writable(null);
const isMobileDevice = writable(null);
const isFirstReset = writable(true);
const transitionTime = 1.5;
function Capitols($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  let alterEgoCard = $$props["alterEgoCard"];
  let bringToFront = $$props["bringToFront"];
  let simplebarContainer = $$props["simplebarContainer"];
  let card = $$props["card"];
  let transitionDelay = $$props["transitionDelay"];
  let condensed_logo = data.condensed_logo;
  let condensed_logo_white = data.condensed_logo_white;
  data.isProjCover;
  const each_array_1 = ensure_array_like(card.Content ?? []);
  $$payload.out += `<section class="card_container svelte-11nb0ns" draggable="true" aria-label="Draggable Card"${attr("data-section", card.Title)}><div class="card_container_inner svelte-11nb0ns"${attr_style(`transition: transform ${stringify(transitionTime)}s var(--transition-curve) ${stringify(transitionDelay)}ms;`)}><img data-sveltekit-preload-data="" class="card_corner_logo svelte-11nb0ns"${attr("src", condensed_logo)} style="z-index: 5;" alt="EL2MP Logo"> <div class="description_container svelte-11nb0ns"${attr_style(`background-color: ${stringify(card.bgColor)}; border: 5px solid ${stringify(card.bgColor)};`)}><p class="h0 svelte-11nb0ns" style="z-index: 7;">${html(card.Title)}</p></div> <div class="card_scrollable_container svelte-11nb0ns" data-simplebar="" data-simplebar-auto-hide="false"${attr("data-section", card.Title)}><div class="card_scroll_flex svelte-11nb0ns"${attr("data-section", card.Title)}><p class="p1 svelte-11nb0ns" id="description">${html(card.Question)}</p> `;
  if (card.Description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="p3 svelte-11nb0ns" id="description">${html(card.Description)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (card.CoverImg) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="cover_image_container svelte-11nb0ns"><div class="overlay_filter svelte-11nb0ns"${attr_style(`background-color: ${stringify(card.bgColor)};`)}></div> `;
    if (typeof card.CoverImg === "string") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<img data-sveltekit-preload-data=""${attr("src", card.CoverImg.img.src)} alt="CoverImg" class="cover_image svelte-11nb0ns"${attr("width", card.CoverImg.img.w)}${attr("height", card.CoverImg.img.h)}>`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(Object.entries(card.CoverImg.sources));
      $$payload.out += `<picture class="svelte-11nb0ns"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let [format, srcset] = each_array[$$index];
        $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)} class="svelte-11nb0ns">`;
      }
      $$payload.out += `<!--]--> <img data-sveltekit-preload-data=""${attr("src", card.CoverImg.img.src)} alt="CoverImg" class="cover_image svelte-11nb0ns"${attr("width", card.CoverImg.img.w)}${attr("height", card.CoverImg.img.h)}></picture>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (each_array_1.length !== 0) {
    $$payload.out += "<!--[-->";
    for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
      let section = each_array_1[index];
      $$payload.out += `<div class="section_container svelte-11nb0ns" data-sveltekit-preload-data=""${attr("data-section", `Ex ${index + 1}`)}>`;
      if (section.title) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p class="h2 svelte-11nb0ns">${html(section.title)}</p>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (section.subtitle) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p class="p3 svelte-11nb0ns" exercise-description="">${html(section.subtitle)}</p>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (section.picture) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="cover_image_container svelte-11nb0ns"><div class="overlay_filter svelte-11nb0ns"${attr_style(`background-color: ${stringify(card.bgColor)};`)}></div> `;
        if (typeof section.picture === "string") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<img data-sveltekit-preload-data="" class="article_image svelte-11nb0ns"${attr("src", section.picture.img.src)} alt="People"${attr("width", section.picture.img.w)}${attr("height", section.picture.img.h)}>`;
        } else {
          $$payload.out += "<!--[!-->";
          const each_array_2 = ensure_array_like(Object.entries(section.picture.sources));
          $$payload.out += `<picture class="svelte-11nb0ns"><!--[-->`;
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let [format, srcset] = each_array_2[$$index_1];
            $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)} class="svelte-11nb0ns">`;
          }
          $$payload.out += `<!--]--> <img data-sveltekit-preload-data="" class="article_image svelte-11nb0ns"${attr("src", section.picture.img.src)} alt="People"${attr("width", section.picture.img.w)}${attr("height", section.picture.img.h)}></picture>`;
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (section.text) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="double_column_text_article svelte-11nb0ns"><p class="p3 svelte-11nb0ns">${html(section.text)}</p></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="svelte-11nb0ns">If you see this we are encountering issues</p>`;
  }
  $$payload.out += `<!--]--></div></div> <img data-sveltekit-preload-data="" class="card_corner_logo svelte-11nb0ns"${attr("src", condensed_logo)} alt="EL2MP Logo"></div> <div${attr_class(`altergo_container_inner ${stringify(store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "open" : "")}`, "svelte-11nb0ns")}${attr_style(`background-color: ${stringify(alterEgoCard.bgColor)} !important; transition: transform ${stringify(transitionTime)}s var(--transition-curve) ${stringify(transitionDelay)}ms;`)}><img data-sveltekit-preload-data="" class="card_corner_logo svelte-11nb0ns"${attr("src", condensed_logo_white)} alt="EL2MP Logo" style="z-index: 10;"> <div class="description_container svelte-11nb0ns"${attr_style(`background-color: ${stringify(alterEgoCard.bgColor)}; border: 5px solid ${stringify(alterEgoCard.bgColor)};`)}><p class="h0 svelte-11nb0ns" style="z-index: 7; line-height: 1;">${html(alterEgoCard.Title)}</p></div> <div class="card_scrollable_container svelte-11nb0ns" data-simplebar="" data-simplebar-auto-hide="false"${attr("data-section", alterEgoCard.Title)}><div class="card_scroll_flex svelte-11nb0ns"${attr("data-section", alterEgoCard.Title)}><p class="p1 svelte-11nb0ns" id="description">${html(alterEgoCard.Question)}</p> `;
  if (alterEgoCard.Description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="p3 svelte-11nb0ns" id="description">${html(alterEgoCard.Description)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (alterEgoCard.CoverImg) {
    $$payload.out += "<!--[-->";
    if (typeof alterEgoCard.CoverImg === "string") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<img data-sveltekit-preload-data=""${attr("src", alterEgoCard.CoverImg.img.src)} alt="CoverImg" class="cover_image_alterego svelte-11nb0ns"${attr("width", alterEgoCard.CoverImg.img.w)}${attr("height", alterEgoCard.CoverImg.img.h)}>`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array_3 = ensure_array_like(Object.entries(alterEgoCard.CoverImg.sources));
      $$payload.out += `<picture class="svelte-11nb0ns"><!--[-->`;
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let [format, srcset] = each_array_3[$$index_3];
        $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)} class="svelte-11nb0ns">`;
      }
      $$payload.out += `<!--]--> <img data-sveltekit-preload-data=""${attr("src", alterEgoCard.CoverImg.img.src)} alt="CoverImg" class="cover_image_alterego svelte-11nb0ns"${attr("width", alterEgoCard.CoverImg.img.w)}${attr("height", alterEgoCard.CoverImg.img.h)}></picture>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <img data-sveltekit-preload-data="" class="card_corner_logo svelte-11nb0ns"${attr("src", condensed_logo)} alt="EL2MP Logo"></div></section>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    alterEgoCard,
    bringToFront,
    simplebarContainer,
    card,
    transitionDelay
  });
  pop();
}
function Logo_button($$payload, $$props) {
  let logoImage = $$props["logoImage"];
  $$payload.out += `<button class="closing_icon svelte-e2lhyu"><img${attr("src", logoImage)} alt="EL2MP Logo" class="svelte-e2lhyu"></button>`;
  bind_props($$props, { logoImage });
}
function Reset_button($$payload, $$props) {
  let reset_function = $$props["reset_function"];
  $$payload.out += `<button class="reset_button svelte-ph3ac6"><p class="s1">Reset everything!</p></button>`;
  bind_props($$props, { reset_function });
}
function Floaters($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  let randomPosition = $$props["randomPosition"];
  $$payload.out += `<div class="floater_container closed"${attr("data-parent", data.parent)}${attr_style(`top: ${stringify(randomPosition.top)}; left: ${stringify(randomPosition.left)}; z-index: ${stringify(randomPosition.zIndex)}; animation-delay: ${stringify(randomPosition.animationDelay)};`)}>`;
  if (data.media) {
    $$payload.out += "<!--[-->";
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <a href="#" class="floater_bottom"${attr_style(`background-color: ${stringify(store_get($$store_subs ??= {}, "$currentCardColor", currentCardColor))}`)} aria-label="Close" role="button" tabindex="0">`;
  if (data.category === "document") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="category_icon" id="document"${attr("href", data.file || data.href || void 0)}${attr("download", data.file ? data.Title : void 0)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M330-250h300v-60H330v60Zm0-160h300v-60H330v60Zm-77.69 310Q222-100 201-121q-21-21-21-51.31v-615.38Q180-818 201-839q21-21 51.31-21H570l210 210v477.69Q780-142 759-121q-21 21-51.31 21H252.31ZM540-620v-180H252.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v615.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-620H540ZM240-800v180-180V-160v-640Z"></path></svg></div> <div class="darker"></div>`;
  } else if (data.category === "image") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<div class="category_icon" id="image"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM270-290h423.07L561.54-465.38 449.23-319.23l-80-102.31L270-290Zm-70 90v-560 560Z"></path></svg></div>`;
  } else if (data.category === "video") {
    $$payload.out += "<!--[2-->";
    $$payload.out += `<div class="category_icon" id="video"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m172.31-780 70 140h120l-70-140h80l70 140h120l-70-140h80l70 140h120l-70-140h95.38Q818-780 839-759q21 21 21 51.31v455.38Q860-222 839-201q-21 21-51.31 21H172.31Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21ZM160-580v327.69q0 5.39 3.46 8.85t8.85 3.46h615.38q5.39 0 8.85-3.46t3.46-8.85V-580H160Zm0 0v340-340Z"></path></svg></div>`;
  } else if (data.category === "link") {
    $$payload.out += "<!--[3-->";
    $$payload.out += `<div class="category_icon" id="video"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M432.31-298.46H281.54q-75.34 0-128.44-53.1Q100-404.65 100-479.98q0-75.33 53.1-128.44 53.1-53.12 128.44-53.12h150.77v60H281.54q-50.39 0-85.96 35.58Q160-530.38 160-480q0 50.38 35.58 85.96 35.57 35.58 85.96 35.58h150.77v60ZM330-450v-60h300v60H330Zm197.69 151.54v-60h150.77q50.39 0 85.96-35.58Q800-429.62 800-480q0-50.38-35.58-85.96-35.57-35.58-85.96-35.58H527.69v-60h150.77q75.34 0 128.44 53.1Q860-555.35 860-480.02q0 75.33-53.1 128.44-53.1 53.12-128.44 53.12H527.69Z"></path></svg></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (data.Title) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="s2" id="floater_text">${escape_html(data.Title)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></a></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data, randomPosition });
  pop();
}
function Textboxes($$payload, $$props) {
  var $$store_subs;
  let bringToFront = $$props["bringToFront"];
  function enableSlideTransition(boxElement) {
    if (boxElement) {
      boxElement.style.transition = "transform var(--transition-times) var(--transition-curve)";
    }
  }
  function updateBoxVisibility(boxElement, shouldBeVisible) {
    if (!boxElement) return;
    boxElement.style.transform = "";
    if (!shouldBeVisible) {
      boxElement.setAttribute("data-x", "0");
      boxElement.setAttribute("data-y", "0");
    }
    enableSlideTransition(boxElement);
    if (shouldBeVisible) {
      boxElement.classList.remove("closed");
    } else {
      boxElement.classList.add("closed");
    }
  }
  if (typeof store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) === "boolean") {
    const boxes = document.querySelectorAll(".text-box-dx, .text-box-sx");
    boxes.forEach((box) => updateBoxVisibility(box, store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode)));
  }
  $$payload.out += `<button${attr_class("text-box-dx svelte-bdzw21", void 0, {
    "closed": !store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode)
  })} data-x="0" data-y="0"><p class="p3 svelte-bdzw21">"The Ecologies of LLM Practices (EL2MP) project documents the role <br>of Large Language Models (LLMs) in various professional practice(s)<br> and the consequences of their use."</p></button> <button${attr_class("text-box-sx svelte-bdzw21", void 0, {
    "closed": !store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode)
  })} data-x="0" data-y="0"><p class="p2 svelte-bdzw21">"How can we reframe the role <br> of LLMs in ordinary work practices?"</p></button>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { bringToFront });
}
function Slider($$payload, $$props) {
  var $$store_subs;
  let switch_alterego = $$props["switch_alterego"];
  $$payload.out += `<div class="slider_container svelte-11zm6lh"><button${attr_class(`slider-button first ${stringify(store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "active" : "")}`, "svelte-11zm6lh")}${attr("disabled", store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode), true)}${attr_style(`pointer-events: ${stringify(store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "none" : "auto")};`)}><p class="p3">Project</p></button> <button${attr_class(`slider-button second ${stringify(!store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "active" : "")}`, "svelte-11zm6lh")}${attr("disabled", !store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode), true)}${attr_style(`pointer-events: ${stringify(!store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "none" : "auto")};`)}><p class="p3" style="padding-left: 12%;">Exercises</p></button> <div${attr_class(`background_slider ${stringify(store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "project" : "exercises")} `, "svelte-11zm6lh")}${attr_style(`background-color: ${stringify(!store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? store_get($$store_subs ??= {}, "$currentCardColor", currentCardColor) : "black")};`)}></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { switch_alterego });
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  let interactRef;
  let width = 0;
  let containers;
  let textBoxes;
  let scrollContainers;
  let floaters;
  let initialPositions = [];
  let scrollableElements;
  let sections = [];
  let hostElement;
  let simplebarContainer;
  const updateWindowSize = () => {
    width = window.innerWidth;
    if (width > 768) {
      store_set(isDesktop, true);
      store_set(isMobileDevice, false);
      if (store_get($$store_subs ??= {}, "$isDesktop", isDesktop) === false) {
        reloadWebsite();
      }
    } else {
      store_set(isDesktop, false);
      store_set(isMobileDevice, true);
      if (store_get($$store_subs ??= {}, "$isDesktop", isDesktop) === true) {
        hideDesktopStuff();
      }
    }
  };
  const hideDesktopStuff = () => {
    if (containers) {
      containers.forEach((container) => {
        container.style.display = "none";
      });
    }
    if (floaters) {
      floaters.forEach((floater) => {
        floater.style.display = "none";
      });
    }
  };
  const reloadWebsite = () => {
    location.reload();
  };
  const reset_function = () => {
    if (!containers) {
      console.error("No containers found!");
      return;
    }
    const hostRect = hostElement.getBoundingClientRect();
    const windowWidth = hostRect.width;
    const windowHeight = hostRect.height;
    const offset = -30;
    const cardWidth = windowWidth * 0.6;
    const cardHeight = cardWidth / 1.5;
    const totalBlockWidth = cardWidth + (containers.length - 1) * Math.abs(offset);
    const totalBlockHeight = cardHeight + (containers.length - 1) * Math.abs(offset);
    const startX = (windowWidth - totalBlockWidth) / 2 - offset * (containers.length - 1);
    const startY = (windowHeight - totalBlockHeight) / 2 - offset * (containers.length - 1);
    containers.forEach((container, index) => {
      const x = startX + index * offset;
      const y = startY + index * offset;
      initialPositions[index] = { x, y };
      container.style.transition = "transform 0.3s ease-in-out";
      container.style.transformOrigin = "top left";
      container.style.transform = `translate(${x}px, ${y}px)`;
      container.setAttribute("data-x", x);
      container.setAttribute("data-y", y);
      container.style.zIndex = -index;
      setTimeout(
        () => {
          container.style.transition = "";
        },
        300
      );
      const cardData = Object.values(data.cardsDb)[index];
      if (cardData && cardData.bgColor) {
        container.style.backgroundColor = cardData.bgColor;
      }
    });
    store_set(selectedCard, "Qualifying");
    if (floaters) {
      floaters.forEach((floater) => {
        const newPosition = calculateRandomPosition();
        floater.style.position = "absolute";
        floater.style.transition = "all 0.3s ease-in-out";
        floater.style.top = newPosition.top;
        floater.style.left = newPosition.left;
        floater.style.zIndex = newPosition.zIndex;
        setTimeout(
          () => {
            floater.style.transition = "";
          },
          300
        );
      });
    }
    scrollableElements.forEach((element) => {
      element.scrollTop = 0;
    });
    store_set(highestZIndex, 1);
    store_set(isFirstReset, false);
    if (store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode)) {
      setTimeout(
        () => {
          switch_alterego();
        },
        450
      );
    }
  };
  const bringToFront = (event) => {
    const frontingTarget = event.currentTarget;
    store_set(highestZIndex, store_get($$store_subs ??= {}, "$highestZIndex", highestZIndex) + 1);
    frontingTarget.style.zIndex = store_get($$store_subs ??= {}, "$highestZIndex", highestZIndex);
  };
  const switch_alterego = () => {
    store_set(isAlterEgoMode, !store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode));
    if (floaters) {
      floaters.forEach((floater) => {
        if (store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode)) {
          floater.classList.remove("open");
          floater.classList.add("closed");
        }
      });
    }
    containers.forEach((card) => {
      if (store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode)) {
        card.style.borderColor = "white";
      } else {
        card.style.borderColor = "black";
        hideFloaters();
      }
    });
  };
  const calculateRandomPosition = (floaterWidth = 100, floaterHeight = 50) => {
    if (typeof window === "undefined") {
      return { top: "0px", left: "0px", zIndex: 0 };
    }
    const safetyInset = 20;
    const columns = Math.floor((window.innerWidth - safetyInset * 2) / floaterWidth);
    const rows = Math.floor((window.innerHeight - safetyInset * 2) / floaterHeight);
    const validRows = rows - 1;
    const gridWidth = window.innerWidth - safetyInset * 2;
    const gridHeight = window.innerHeight - safetyInset * 2;
    const cellWidth = gridWidth / columns;
    const cellHeight = gridHeight / validRows;
    const row = Math.floor(Math.random() * validRows);
    const col = Math.floor(Math.random() * columns);
    const topPosition = safetyInset + row * cellHeight + (cellHeight - floaterHeight) / 2;
    const leftPosition = safetyInset + col * cellWidth + (cellWidth - floaterWidth) / 2;
    const validTopPosition = Math.min(topPosition, window.innerHeight - floaterHeight - safetyInset);
    const validLeftPosition = Math.min(leftPosition, window.innerWidth - floaterWidth - safetyInset);
    return {
      top: `${Math.round(validTopPosition)}px`,
      left: `${Math.round(validLeftPosition)}px`,
      zIndex: Math.floor(Math.random() * 1e3)
      // Randomize zIndex
    };
  };
  const alignColor = ($selectedCard) => {
    const selected = Object.values(data.cardsDb).find((card) => card.Title === $selectedCard);
    if (store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode)) {
      store_set(currentCardColor, "white");
      return;
    } else {
      if (selected) {
        store_set(currentCardColor, selected.bgColor);
        store_set(lastCardColor, selected.bgColor);
      } else {
        store_set(currentCardColor, store_get($$store_subs ??= {}, "$lastCardColor", lastCardColor));
      }
    }
  };
  const hideFloaters = (card) => {
    if (!floaters) return;
    floaters.forEach((floater) => {
      if (card !== "all" && floater.dataset.parent !== card) {
        floater.style.display = "none";
      } else {
        floater.style.display = "";
      }
      floater.classList.remove("clicked");
      floater.classList.add("open");
    });
  };
  onDestroy(() => {
    window.removeEventListener("resize", updateWindowSize);
    if (holdTimeout) clearTimeout(holdTimeout);
    const cleanupInteract = () => {
      if (interactRef) {
        if (containers) {
          containers.forEach((container) => {
            try {
              interactRef(container).unset();
            } catch (e) {
              console.log("Could not cleanup container interact handlers");
            }
          });
        }
        if (floaters) {
          floaters.forEach((floater) => {
            try {
              interactRef(floater).unset();
            } catch (e) {
              console.log("Could not cleanup floater interact handlers");
            }
            if (floater.style) {
              floater.style.animation = "none";
              floater.style.transition = "none";
            }
          });
        }
        if (textBoxes) {
          textBoxes.forEach((textBox) => {
            try {
              interactRef(textBox).unset();
            } catch (e) {
              console.log("Could not cleanup textBox interact handlers");
            }
          });
        }
      }
    };
    const cleanupEventListeners = () => {
      if (sections) {
        sections.forEach((section) => {
          try {
            section.removeEventListener("mouseenter", null);
          } catch (e) {
            console.log("Could not remove mouseenter listener");
          }
        });
      }
      if (containers) {
        containers.forEach((container) => {
          try {
            container.removeEventListener("click", null);
          } catch (e) {
            console.log("Could not remove click listener from container");
          }
        });
      }
      if (scrollContainers) {
        scrollContainers.forEach((scrollContainer) => {
          try {
            scrollContainer.removeEventListener("click", null);
          } catch (e) {
            console.log("Could not remove click listener from scroll container");
          }
        });
      }
    };
    const clearReferences = () => {
      containers = null;
      floaters = null;
      textBoxes = null;
      scrollContainers = null;
      hostElement = null;
      simplebarContainer = null;
      scrollableElements = null;
      sections = null;
      initialPositions = [];
      interactRef = null;
    };
    cleanupInteract();
    cleanupEventListeners();
    clearReferences();
    console.log("Component cleanup complete");
  });
  if (store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) !== void 0) alignColor(store_get($$store_subs ??= {}, "$selectedCard", selectedCard));
  if (!store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode)) hideFloaters(store_get($$store_subs ??= {}, "$selectedCard", selectedCard));
  $$payload.out += `<div class="content_container"><section class="host">`;
  Textboxes($$payload, { bringToFront });
  $$payload.out += `<!----> `;
  Slider($$payload, { switch_alterego });
  $$payload.out += `<!----> `;
  Logo_button($$payload, { logoImage: data.logoImage });
  $$payload.out += `<!----> `;
  Reset_button($$payload, { reset_function });
  $$payload.out += `<!----> `;
  if (!store_get($$store_subs ??= {}, "$isMobileDevice", isMobileDevice)) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(Object.values(data.cardsDb));
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let card = each_array[$$index];
      Capitols($$payload, {
        data,
        card,
        transitionDelay: card.IndexNum * 100,
        alterEgoCard: data.alterEgosDb[`Card${card.IndexNum}`],
        bringToFront,
        simplebarContainer
      });
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (!store_get($$store_subs ??= {}, "$isMobileDevice", isMobileDevice)) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(Object.values(data.floatersDb));
    $$payload.out += `<!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let singleFloater = each_array_1[$$index_1];
      Floaters($$payload, {
        data: singleFloater,
        randomPosition: calculateRandomPosition()
      });
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="mobile_desc_container svelte-y52wst"><div class="mobile_description svelte-y52wst"><p class="p2 svelte-y52wst">${html(data.alterEgosDb.Card1.Description)}</p></div> <div class="mobile_description tip svelte-y52wst"><p class="h4" style="text-align: center;">Try this website on a  💻  device.</p></div></div></section></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
