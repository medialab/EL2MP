import { W as ensure_array_like, X as stringify, Y as store_get, Z as unsubscribe_stores, _ as bind_props, S as pop, P as push, $ as store_set } from "../../chunks/index.js";
import { w as writable } from "../../chunks/index2.js";
import "clsx";
import { e as escape_html } from "../../chunks/escaping.js";
const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean || value === "" && name === "class") return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
const isAlterEgoMode = writable(true);
const transitionTime = 1.5;
function Capitols($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  let alterEgoCard = $$props["alterEgoCard"];
  let bringToFront = $$props["bringToFront"];
  let simplebarContainer = $$props["simplebarContainer"];
  let condensed_logo = $$props["condensed_logo"];
  let condensed_logo_white = $$props["condensed_logo_white"];
  let card = $$props["card"];
  let transitionDelay = $$props["transitionDelay"];
  data.isProjCover;
  const each_array_1 = ensure_array_like(card.Content ?? []);
  $$payload.out += `<section class="card_container svelte-1864dax" draggable="true" aria-label="Draggable Card"${attr("data-section", card.Title)}><div class="card_container_inner svelte-1864dax"${attr("style", `transition: transform ${stringify(transitionTime)}s var(--transition-curve) ${stringify(transitionDelay)}ms;`)}><img data-sveltekit-preload-data="" class="card_corner_logo svelte-1864dax"${attr("src", condensed_logo)} style="z-index: 5;" alt="EL2MP Logo"> <div class="description_container svelte-1864dax"${attr("style", `background-color: ${stringify(card.bgColor)}; border: 5px solid ${stringify(card.bgColor)};`)}><p class="h0 svelte-1864dax" style="z-index: 7;">${html(card.Title)}</p></div> <div class="card_scrollable_container svelte-1864dax" data-simplebar="" data-simplebar-auto-hide="false"${attr("data-section", card.Title)}><div class="card_scroll_flex svelte-1864dax"${attr("data-section", card.Title)}><p class="p1 svelte-1864dax" id="description">${html(card.Question)}</p> `;
  if (card.Description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="p3 svelte-1864dax" id="description">${html(card.Description)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (card.CoverImg) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="cover_image_container svelte-1864dax"><div class="overlay_filter svelte-1864dax"${attr("style", `background-color: ${stringify(card.bgColor)};`)}></div> `;
    if (typeof card.CoverImg === "string") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<img data-sveltekit-preload-data=""${attr("src", card.CoverImg.img.src)} alt="CoverImg" class="cover_image svelte-1864dax"${attr("width", card.CoverImg.img.w)}${attr("height", card.CoverImg.img.h)}>`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(Object.entries(card.CoverImg.sources));
      $$payload.out += `<picture class="svelte-1864dax"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let [format, srcset] = each_array[$$index];
        $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)} class="svelte-1864dax">`;
      }
      $$payload.out += `<!--]--> <img data-sveltekit-preload-data=""${attr("src", card.CoverImg.img.src)} alt="CoverImg" class="cover_image svelte-1864dax"${attr("width", card.CoverImg.img.w)}${attr("height", card.CoverImg.img.h)}></picture>`;
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
      $$payload.out += `<div class="section_container svelte-1864dax" data-sveltekit-preload-data=""${attr("data-section", `Ex ${index + 1}`)}>`;
      if (section.title) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p class="h3 svelte-1864dax">${html(section.title)}</p>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (section.subtitle) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p class="p3 svelte-1864dax" exercise-description="">${html(section.subtitle)}</p>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (section.picture) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="cover_image_container svelte-1864dax"><div class="overlay_filter svelte-1864dax"${attr("style", `background-color: ${stringify(card.bgColor)};`)}></div> `;
        if (typeof section.picture === "string") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<img data-sveltekit-preload-data="" class="article_image svelte-1864dax"${attr("src", section.picture.img.src)} alt="People"${attr("width", section.picture.img.w)}${attr("height", section.picture.img.h)}>`;
        } else {
          $$payload.out += "<!--[!-->";
          const each_array_2 = ensure_array_like(Object.entries(section.picture.sources));
          $$payload.out += `<picture class="svelte-1864dax"><!--[-->`;
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let [format, srcset] = each_array_2[$$index_1];
            $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)} class="svelte-1864dax">`;
          }
          $$payload.out += `<!--]--> <img data-sveltekit-preload-data="" class="article_image svelte-1864dax"${attr("src", section.picture.img.src)} alt="People"${attr("width", section.picture.img.w)}${attr("height", section.picture.img.h)}></picture>`;
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (section.text) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="double_column_text_article svelte-1864dax"><p class="p3 svelte-1864dax">${html(section.text)}</p></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="svelte-1864dax">If you see this we are encountering issues</p>`;
  }
  $$payload.out += `<!--]--></div></div> <img data-sveltekit-preload-data="" class="card_corner_logo svelte-1864dax"${attr("src", condensed_logo)} alt="EL2MP Logo"></div> <div${attr("class", `altergo_container_inner ${stringify(store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "open" : "")} svelte-1864dax`)}${attr("style", `background-color: ${stringify(alterEgoCard.bgColor)} !important; transition: transform ${stringify(transitionTime)}s var(--transition-curve) ${stringify(transitionDelay)}ms;`)}><img data-sveltekit-preload-data="" class="card_corner_logo svelte-1864dax"${attr("src", condensed_logo_white)} alt="EL2MP Logo" style="z-index: 10;"> <div class="description_container svelte-1864dax"${attr("style", `background-color: ${stringify(alterEgoCard.bgColor)}; border: 5px solid ${stringify(alterEgoCard.bgColor)};`)}><p class="h0 svelte-1864dax" style="z-index: 7; line-height: 1;">${html(alterEgoCard.Title)}</p></div> <div class="card_scrollable_container svelte-1864dax" data-simplebar="" data-simplebar-auto-hide="false"${attr("data-section", alterEgoCard.Title)}><div class="card_scroll_flex svelte-1864dax"${attr("data-section", alterEgoCard.Title)}>`;
  if (alterEgoCard.Description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="p3 svelte-1864dax" id="description">${html(alterEgoCard.Description)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (alterEgoCard.CoverImg) {
    $$payload.out += "<!--[-->";
    if (typeof alterEgoCard.CoverImg === "string") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<img data-sveltekit-preload-data=""${attr("src", alterEgoCard.CoverImg.img.src)} alt="CoverImg" class="cover_image_alterego svelte-1864dax"${attr("width", alterEgoCard.CoverImg.img.w)}${attr("height", alterEgoCard.CoverImg.img.h)}>`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array_3 = ensure_array_like(Object.entries(alterEgoCard.CoverImg.sources));
      $$payload.out += `<picture class="svelte-1864dax"><!--[-->`;
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let [format, srcset] = each_array_3[$$index_3];
        $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)} class="svelte-1864dax">`;
      }
      $$payload.out += `<!--]--> <img data-sveltekit-preload-data=""${attr("src", alterEgoCard.CoverImg.img.src)} alt="CoverImg" class="cover_image_alterego svelte-1864dax"${attr("width", alterEgoCard.CoverImg.img.w)}${attr("height", alterEgoCard.CoverImg.img.h)}></picture>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <img data-sveltekit-preload-data="" class="card_corner_logo svelte-1864dax"${attr("src", condensed_logo)} alt="EL2MP Logo"></div></section>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    alterEgoCard,
    bringToFront,
    simplebarContainer,
    condensed_logo,
    condensed_logo_white,
    card,
    transitionDelay
  });
  pop();
}
function Logo_button($$payload, $$props) {
  let logoImage = $$props["logoImage"];
  $$payload.out += `<button class="closing_icon"><img${attr("src", logoImage)} alt="EL2MP Logo"></button>`;
  bind_props($$props, { logoImage });
}
function Reset_button($$payload, $$props) {
  let reset_function = $$props["reset_function"];
  $$payload.out += `<button class="reset_button svelte-ph3ac6"><p class="s1">Reset everything!</p></button>`;
  bind_props($$props, { reset_function });
}
function Floating_card($$payload, $$props) {
  push();
  let data = $$props["data"];
  let randomPosition = $$props["randomPosition"];
  let color = $$props["color"];
  $$payload.out += `<div class="floater_container closed"${attr("data-parent", data.parent)}${attr("style", `top: ${stringify(randomPosition.top)}; left: ${stringify(randomPosition.left)}; z-index: ${stringify(randomPosition.zIndex)}; animation-delay: ${stringify(randomPosition.animationDelay)};`)}>`;
  if (data.media) {
    $$payload.out += "<!--[-->";
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <a class="floater_bottom"${attr("style", `background-color: ${stringify(color)}`)} aria-label="Close" role="button">`;
  if (data.category === "document") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="category_icon" id="document"${attr("href", data.file || data.href || void 0)}${attr("download", data.file ? data.Title : void 0)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M330-250h300v-60H330v60Zm0-160h300v-60H330v60Zm-77.69 310Q222-100 201-121q-21-21-21-51.31v-615.38Q180-818 201-839q21-21 51.31-21H570l210 210v477.69Q780-142 759-121q-21 21-51.31 21H252.31ZM540-620v-180H252.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v615.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-620H540ZM240-800v180-180V-160v-640Z"></path></svg></div> <div class="darker"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    if (data.category === "image") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="category_icon" id="image"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM270-290h423.07L561.54-465.38 449.23-319.23l-80-102.31L270-290Zm-70 90v-560 560Z"></path></svg></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      if (data.category === "video") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="category_icon" id="video"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m172.31-780 70 140h120l-70-140h80l70 140h120l-70-140h80l70 140h120l-70-140h95.38Q818-780 839-759q21 21 21 51.31v455.38Q860-222 839-201q-21 21-51.31 21H172.31Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21ZM160-580v327.69q0 5.39 3.46 8.85t8.85 3.46h615.38q5.39 0 8.85-3.46t3.46-8.85V-580H160Zm0 0v340-340Z"></path></svg></div>`;
      } else {
        $$payload.out += "<!--[!-->";
        if (data.category === "link") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="category_icon" id="video"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M432.31-298.46H281.54q-75.34 0-128.44-53.1Q100-404.65 100-479.98q0-75.33 53.1-128.44 53.1-53.12 128.44-53.12h150.77v60H281.54q-50.39 0-85.96 35.58Q160-530.38 160-480q0 50.38 35.58 85.96 35.57 35.58 85.96 35.58h150.77v60ZM330-450v-60h300v60H330Zm197.69 151.54v-60h150.77q50.39 0 85.96-35.58Q800-429.62 800-480q0-50.38-35.58-85.96-35.57-35.58-85.96-35.58H527.69v-60h150.77q75.34 0 128.44 53.1Q860-555.35 860-480.02q0 75.33-53.1 128.44-53.1 53.12-128.44 53.12H527.69Z"></path></svg></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> `;
  if (data.Title) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="s2">${escape_html(data.Title)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></a></div>`;
  bind_props($$props, { data, randomPosition, color });
  pop();
}
function Textboxes($$payload) {
  var $$store_subs;
  $$payload.out += `<div${attr("class", `text-box-dx svelte-1ns4ooh ${stringify([
    !store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "closed" : ""
  ].filter(Boolean).join(" "))}`)}><p class="p3 svelte-1ns4ooh">"The Ecologies of LLM Practices (EL2MP) project documents the role <br>of Large Language Models (LLMs) in various professional practice(s)<br> and the consequences of their use."</p></div> <div${attr("class", `text-box-sx svelte-1ns4ooh ${stringify([
    !store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "closed" : ""
  ].filter(Boolean).join(" "))}`)}><p class="p2 svelte-1ns4ooh">"How can we reframe the role <br> of LLMs in ordinary work practices?"</p></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
function Slider($$payload, $$props) {
  var $$store_subs;
  let switch_alterego = $$props["switch_alterego"];
  let pillBgColor = $$props["pillBgColor"];
  $$payload.out += `<div class="slider_container svelte-kp3mje"><button${attr("class", `slider-button first ${stringify(store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "active" : "")} svelte-kp3mje`)}${attr("disabled", store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode), true)}${attr("style", `pointer-events: ${stringify(store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "none" : "auto")};`)}><p class="p3">Project</p></button> <button${attr("class", `slider-button second ${stringify(!store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "active" : "")} svelte-kp3mje`)}${attr("disabled", !store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode), true)}${attr("style", `pointer-events: ${stringify(!store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "none" : "auto")};`)}><p class="p3" style="padding-left: 12%;">Exercises</p></button> <div${attr("class", `background_slider ${stringify(store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? "project" : "exercises")}  svelte-kp3mje`)}${attr("style", `background-color: ${stringify(!store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) ? pillBgColor : "black")};`)}></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { switch_alterego, pillBgColor });
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  let highestZIndex = 1;
  let cover;
  let selectedCard = "Qualifying";
  let currentCardColor;
  let lastCardColor = null;
  let simplebarContainer;
  const reset_function = () => {
    {
      console.error("No containers found!");
      return;
    }
  };
  const bringToFront = (event) => {
    const container = event.currentTarget;
    highestZIndex += 1;
    container.style.zIndex = highestZIndex;
  };
  const suppressCover = () => {
    cover.style.display = "none";
  };
  const switch_alterego = () => {
    store_set(isAlterEgoMode, !store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode));
    const cardContainers = document.querySelectorAll(".card_container");
    cardContainers.forEach((card) => {
      if (store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode)) {
        card.style.borderColor = "white";
      } else {
        card.style.borderColor = "black";
      }
    });
  };
  const calculateRandomPosition = (floaterWidth = 100, floaterHeight = 100) => {
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
  const alignColor = (selectedCard2) => {
    if (store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode)) {
      currentCardColor = "white";
      return;
    }
    const selected = Object.values(data.cardsDb).find((card) => card.Title === selectedCard2);
    if (selected) {
      currentCardColor = selected.bgColor;
      lastCardColor = selected.bgColor;
    } else {
      currentCardColor = lastCardColor;
    }
  };
  const updateSelectedCard = (selectedCard2) => {
    if (!store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode)) ;
  };
  updateSelectedCard();
  if (store_get($$store_subs ??= {}, "$isAlterEgoMode", isAlterEgoMode) !== void 0) alignColor(selectedCard);
  alignColor(selectedCard);
  $$payload.out += `<div class="content_container"><section class="host">`;
  Textboxes($$payload);
  $$payload.out += `<!----> `;
  Slider($$payload, {
    switch_alterego,
    pillBgColor: currentCardColor
  });
  $$payload.out += `<!----> `;
  Logo_button($$payload, { logoImage: data.logoImage, switch_alterego });
  $$payload.out += `<!----> `;
  Reset_button($$payload, { data, reset_function });
  $$payload.out += `<!----> `;
  {
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
        suppressCover,
        simplebarContainer,
        condensed_logo: data.condensed_logo,
        condensed_logo_white: data.condensed_logo_white,
        circular_logo: data.circular_logo
      });
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(Object.values(data.floatersDb));
    $$payload.out += `<!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let floater = each_array_1[$$index_1];
      Floating_card($$payload, {
        data: floater,
        randomPosition: calculateRandomPosition(),
        color: currentCardColor
      });
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> <div class="mobile_desc_container svelte-jj7kzh"><div class="mobile_description svelte-jj7kzh"><p class="p2 svelte-jj7kzh">${html(data.projectDescription)}</p></div> <div class="mobile_description tip svelte-jj7kzh"><p class="h4" style="text-align: center;">Try this website on a  💻  device.</p></div></div></section></div> `;
  if (typeof data.backgroundImage === "string") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<img class="background_image"${attr("src", data.backgroundImage.img.src)} alt="DotsDotsDots?"${attr("width", data.backgroundImage.img.w)}${attr("height", data.backgroundImage.img.h)}>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_2 = ensure_array_like(Object.entries(data.backgroundImage.sources));
    $$payload.out += `<picture><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let [format, srcset] = each_array_2[$$index_2];
      $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)}>`;
    }
    $$payload.out += `<!--]--> <img class="background_image"${attr("src", data.backgroundImage.img.src)} alt="DotsDotsDots?"${attr("width", data.backgroundImage.img.w)}${attr("height", data.backgroundImage.img.h)}></picture>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
