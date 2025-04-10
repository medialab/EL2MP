import { H as HYDRATION_ERROR, g as get_next_sibling, d as define_property, s as set_active_reaction, a as set_active_effect, i as is_array, b as active_effect, c as active_reaction, e as init_operations, f as get_first_child, h as HYDRATION_START, j as HYDRATION_END, k as hydration_failed, l as clear_text_content, m as array_from, n as component_root, o as create_text, p as branch, q as push, r as component_context, t as pop, u as set, L as LEGACY_PROPS, v as get, w as flushSync, x as mutable_source, y as render, z as push$1, A as setContext, B as pop$1 } from "./index.js";
import "clsx";
let base = "/EL2MP";
let assets = base;
const app_dir = "_app";
const initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
function set_assets(path) {
  assets = initial.assets = path;
}
let public_env = {};
let safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
function hydration_mismatch(location) {
  {
    console.warn(`https://svelte.dev/e/hydration_mismatch`);
  }
}
let hydrating = false;
function set_hydrating(value) {
  hydrating = value;
}
let hydrate_node;
function set_hydrate_node(node) {
  if (node === null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  return hydrate_node = node;
}
function hydrate_next() {
  return set_hydrate_node(
    /** @type {TemplateNode} */
    get_next_sibling(hydrate_node)
  );
}
const PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(name) {
  return PASSIVE_EVENTS.includes(name);
}
const all_registered_events = /* @__PURE__ */ new Set();
const root_event_handles = /* @__PURE__ */ new Set();
function handle_event_propagation(event) {
  var handler_element = this;
  var owner_document = (
    /** @type {Node} */
    handler_element.ownerDocument
  );
  var event_name = event.type;
  var path = event.composedPath?.() || [];
  var current_target = (
    /** @type {null | Element} */
    path[0] || event.target
  );
  var path_idx = 0;
  var handled_at = event.__root;
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event.__root = handler_element;
      return;
    }
    var handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event.target;
  if (current_target === handler_element) return;
  define_property(event, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    var throw_error;
    var other_errors = [];
    while (current_target !== null) {
      var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
      current_target.host || null;
      try {
        var delegated = current_target["__" + event_name];
        if (delegated != null && (!/** @type {any} */
        current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
        // -> the target could not have been disabled because it emits the event in the first place
        event.target === current_target)) {
          if (is_array(delegated)) {
            var [fn, ...data] = delegated;
            fn.apply(current_target, [event, ...data]);
          } else {
            delegated.call(current_target, event);
          }
        }
      } catch (error) {
        if (throw_error) {
          other_errors.push(error);
        } else {
          throw_error = error;
        }
      }
      if (event.cancelBubble || parent_element === handler_element || parent_element === null) {
        break;
      }
      current_target = parent_element;
    }
    if (throw_error) {
      for (let error of other_errors) {
        queueMicrotask(() => {
          throw error;
        });
      }
      throw throw_error;
    }
  } finally {
    event.__root = handler_element;
    delete event.currentTarget;
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
function assign_nodes(start, end) {
  var effect = (
    /** @type {Effect} */
    active_effect
  );
  if (effect.nodes_start === null) {
    effect.nodes_start = start;
    effect.nodes_end = end;
  }
}
function mount(component, options2) {
  return _mount(component, options2);
}
function hydrate(component, options2) {
  init_operations();
  options2.intro = options2.intro ?? false;
  const target = options2.target;
  const was_hydrating = hydrating;
  const previous_hydrate_node = hydrate_node;
  try {
    var anchor = (
      /** @type {TemplateNode} */
      get_first_child(target)
    );
    while (anchor && (anchor.nodeType !== 8 || /** @type {Comment} */
    anchor.data !== HYDRATION_START)) {
      anchor = /** @type {TemplateNode} */
      get_next_sibling(anchor);
    }
    if (!anchor) {
      throw HYDRATION_ERROR;
    }
    set_hydrating(true);
    set_hydrate_node(
      /** @type {Comment} */
      anchor
    );
    hydrate_next();
    const instance = _mount(component, { ...options2, anchor });
    if (hydrate_node === null || hydrate_node.nodeType !== 8 || /** @type {Comment} */
    hydrate_node.data !== HYDRATION_END) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    set_hydrating(false);
    return (
      /**  @type {Exports} */
      instance
    );
  } catch (error) {
    if (error === HYDRATION_ERROR) {
      if (options2.recover === false) {
        hydration_failed();
      }
      init_operations();
      clear_text_content(target);
      set_hydrating(false);
      return mount(component, options2);
    }
    throw error;
  } finally {
    set_hydrating(was_hydrating);
    set_hydrate_node(previous_hydrate_node);
  }
}
const document_listeners = /* @__PURE__ */ new Map();
function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
  init_operations();
  var registered_events = /* @__PURE__ */ new Set();
  var event_handle = (events2) => {
    for (var i = 0; i < events2.length; i++) {
      var event_name = events2[i];
      if (registered_events.has(event_name)) continue;
      registered_events.add(event_name);
      var passive = is_passive_event(event_name);
      target.addEventListener(event_name, handle_event_propagation, { passive });
      var n = document_listeners.get(event_name);
      if (n === void 0) {
        document.addEventListener(event_name, handle_event_propagation, { passive });
        document_listeners.set(event_name, 1);
      } else {
        document_listeners.set(event_name, n + 1);
      }
    }
  };
  event_handle(array_from(all_registered_events));
  root_event_handles.add(event_handle);
  var component = void 0;
  var unmount2 = component_root(() => {
    var anchor_node = anchor ?? target.appendChild(create_text());
    branch(() => {
      if (context) {
        push({});
        var ctx = (
          /** @type {ComponentContext} */
          component_context
        );
        ctx.c = context;
      }
      if (events) {
        props.$$events = events;
      }
      if (hydrating) {
        assign_nodes(
          /** @type {TemplateNode} */
          anchor_node,
          null
        );
      }
      component = Component(anchor_node, props) || {};
      if (hydrating) {
        active_effect.nodes_end = hydrate_node;
      }
      if (context) {
        pop();
      }
    });
    return () => {
      for (var event_name of registered_events) {
        target.removeEventListener(event_name, handle_event_propagation);
        var n = (
          /** @type {number} */
          document_listeners.get(event_name)
        );
        if (--n === 0) {
          document.removeEventListener(event_name, handle_event_propagation);
          document_listeners.delete(event_name);
        } else {
          document_listeners.set(event_name, n);
        }
      }
      root_event_handles.delete(event_handle);
      if (anchor_node !== anchor) {
        anchor_node.parentNode?.removeChild(anchor_node);
      }
    };
  });
  mounted_components.set(component, unmount2);
  return component;
}
let mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(component, options2) {
  const fn = mounted_components.get(component);
  if (fn) {
    mounted_components.delete(component);
    return fn(options2);
  }
  return Promise.resolve();
}
function asClassComponent$1(component) {
  return class extends Svelte4Component {
    /** @param {any} options */
    constructor(options2) {
      super({
        component,
        ...options2
      });
    }
  };
}
class Svelte4Component {
  /** @type {any} */
  #events;
  /** @type {Record<string, any>} */
  #instance;
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(options2) {
    var sources = /* @__PURE__ */ new Map();
    var add_source = (key, value) => {
      var s = mutable_source(value);
      sources.set(key, s);
      return s;
    };
    const props = new Proxy(
      { ...options2.props || {}, $$events: {} },
      {
        get(target, prop) {
          return get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
        },
        has(target, prop) {
          if (prop === LEGACY_PROPS) return true;
          get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
          return Reflect.has(target, prop);
        },
        set(target, prop, value) {
          set(sources.get(prop) ?? add_source(prop, value), value);
          return Reflect.set(target, prop, value);
        }
      }
    );
    this.#instance = (options2.hydrate ? hydrate : mount)(options2.component, {
      target: options2.target,
      anchor: options2.anchor,
      props,
      context: options2.context,
      intro: options2.intro ?? false,
      recover: options2.recover
    });
    if (!options2?.props?.$$host || options2.sync === false) {
      flushSync();
    }
    this.#events = props.$$events;
    for (const key of Object.keys(this.#instance)) {
      if (key === "$set" || key === "$destroy" || key === "$on") continue;
      define_property(this, key, {
        get() {
          return this.#instance[key];
        },
        /** @param {any} value */
        set(value) {
          this.#instance[key] = value;
        },
        enumerable: true
      });
    }
    this.#instance.$set = /** @param {Record<string, any>} next */
    (next) => {
      Object.assign(props, next);
    };
    this.#instance.$destroy = () => {
      unmount(this.#instance);
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    this.#instance.$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event, callback) {
    this.#events[event] = this.#events[event] || [];
    const cb = (...args) => callback.call(this, ...args);
    this.#events[event].push(cb);
    return () => {
      this.#events[event] = this.#events[event].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    this.#instance.$destroy();
  }
}
let read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
function set_manifest(_) {
}
function asClassComponent(component) {
  const component_constructor = asClassComponent$1(component);
  const _render = (props, { context } = {}) => {
    const result = render(component, { props, context });
    return {
      css: { code: "", map: null },
      head: result.head,
      html: result.body
    };
  };
  component_constructor.render = _render;
  return component_constructor;
}
let prerendering = false;
function set_building() {
}
function set_prerendering() {
  prerendering = true;
}
function Root($$payload, $$props) {
  push$1();
  let {
    stores,
    page,
    constructors,
    components = [],
    form,
    data_0 = null,
    data_1 = null
  } = $$props;
  {
    setContext("__svelte__", stores);
  }
  {
    stores.page.set(page);
  }
  const Pyramid_1 = constructors[1];
  if (constructors[1]) {
    $$payload.out += "<!--[-->";
    const Pyramid_0 = constructors[0];
    $$payload.out += `<!---->`;
    Pyramid_0($$payload, {
      data: data_0,
      form,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        Pyramid_1($$payload2, { data: data_1, form });
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    const Pyramid_0 = constructors[0];
    $$payload.out += `<!---->`;
    Pyramid_0($$payload, { data: data_0, form });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop$1();
}
const root = asClassComponent(Root);
const options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en" style="background-color: #ffffff">\n  <head>\n    <meta charset="utf-8" />\n    <meta\n      name="google-site-verification"\n      content="pgTk4-SglUqFCGjw5F_ag2flpUYxmOhleOQujEElFQw"\n    />\n    <meta\n      name="description"\n      content="Exploring the transformative impact of Large Language Models (LLMs) on research, creativity, and communication across various domains. The Ecologies of LLM Practices (EL2MP) project by Sciences Po medialab documents how LLMs influence professional practices."\n    />\n\n    <!-- SEO Keywords -->\n    <meta\n      name="keywords"\n      content="Ecologies of LLM, EL2MP, Ecologies medialab, Ecologies sciencespo, Ecologies de practiques, Large Language Models, Sciences Po, medialab, AI research"\n    />\n    <link rel="icon" href="og_images/favicon.ico" />\n    <meta\n      name="viewport"\n      content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"\n    />\n    ' + head + `


    <!-- Structured data for better SEO -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://medialab.sciencespo.fr/",
            "name": "Medialab Sciencespo",
            "url": "https://medialab.sciencespo.fr/",
            "logo": "https://medialab.sciencespo.fr/img/cover-fb.png",
            "parentOrganization": {
              "@type": "Organization",
              "name": "Sciences Po"
            }
          },
          {
            "@type": "WebSite",
            "name": "EL2MP Research Project Website",
            "url": "https://medialab.github.io/EL2MP/",
            "publisher": {
              "@type": "Organization",
              "@id": "https://medialab.sciencespo.fr/"
            },
            "description": "Official website for the EL2MP Research Project by Medialab Sciencespo, documenting the integration and impact of Large Language Models in professional practices.",
            "mainEntity": {
              "@type": "ResearchProject",
              "@id": "https://medialab.github.io/EL2MP/#project"
            }
          },
          {
            "@type": "ResearchProject",
            "@id": "https://medialab.github.io/EL2MP/#project",
            "name": "Écologies des Pratiques LLMs (EL2MP)",
            "alternateName": "Ecologies of LLM Practices",
            "description": "The Ecologies of LLM Practices (EL2MP) project documents the role of Large Language Models (LLMs) in various professional practice(s) and the consequences of their use",
            "url": "https://medialab.github.io/EL2MP/",
            "logo": "https://raw.githubusercontent.com/medialab/EL2MP/f2be408a5d92875040f0f0ba385a1fa67ad30b10/static/og_images/opengraph.jpg",
            "provider": {
              "@type": "Organization",
              "@id": "https://medialab.sciencespo.fr/"
            },
            "keywords": [
              "Ecologies of LLM",
              "EL2MP",
              "Ecologies medialab",
              "Ecologies sciencespo",
              "Ecologies de practiques"
            ]
          }
        ]
      }
    <\/script>
    <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8DHX3VYCYS"><\/script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-8DHX3VYCYS');
  <\/script>

    <noscript>
      <style>
        /**
          * Reinstate scrolling for non-JS clients
          */
        .simplebar-content-wrapper {
          scrollbar-width: auto;
          -ms-overflow-style: auto;
        }

        .simplebar-content-wrapper::-webkit-scrollbar,
        .simplebar-hide-scrollbar::-webkit-scrollbar {
          display: initial;
          width: initial;
          height: initial;
        }
      </style>
    </noscript>
  </head>
  <body data-sveltekit-preload-data="hover">
    <div class="major_div" style="display: contents">` + body + '</div>\n  </body>\n</html>\n\n<svelte:head>\n  <!-- Page Title -->\n  <title>Écologies des Pratiques LLMs | EL2MP | Sciences Po medialab</title>\n\n  <!-- Canonical URL -->\n  <link rel="canonical" href="https://medialab.github.io/EL2MP/" />\n\n  <!-- Open Graph Meta Tags -->\n  <meta\n    property="og:logo"\n    content="https://raw.githubusercontent.com/medialab/EL2MP/f2be408a5d92875040f0f0ba385a1fa67ad30b10/static/og_images/opengraph.jpg"\n  />\n  <meta property="og:type" content="website" />\n  <meta\n    property="og:title"\n    content="How can we reframe the role of LLMs in ordinary work practices? | Ecologies of LLM (EL2MP)"\n  />\n  <meta\n    property="og:description"\n    content="The Ecologies of LLM Practices (EL2MP) project documents the role of Large Language Models (LLMs) in various professional practice(s) and the consequences of their use. A Sciences Po medialab research initiative exploring AI integration in workplaces."\n  />\n  <meta property="og:url" content="https://medialab.github.io/EL2MP/" />\n  <meta\n    property="og:image"\n    content="https://raw.githubusercontent.com/medialab/EL2MP/f2be408a5d92875040f0f0ba385a1fa67ad30b10/static/og_images/opengraph.jpg\n    "\n  />\n  <meta\n    property="og:image:alt"\n    content="EL2MP Logo - Ecologies des Pratiques LLMs"\n  />\n  <meta property="og:site_name" content="Écologies des Pratiques LLMs" />\n  <meta property="og:locale" content="en_US" />\n  <meta property="og:locale:alternate" content="fr_FR" />\n\n  <!-- Instant Articles Meta Tags -->\n  <meta property="ia:markup_url" content="https://medialab.github.io/EL2MP/" />\n  <meta\n    property="ia:markup_url_dev"\n    content="https://medialab.github.io/EL2MP/dev/"\n  />\n  <meta\n    property="ia:rules_url"\n    content="https://medialab.github.io/EL2MP/rules/"\n  />\n  <meta\n    property="ia:rules_url_dev"\n    content="https://medialab.github.io/EL2MP/rules-dev/"\n  />\n\n  <!-- Twitter Card Meta Tags -->\n  <meta name="twitter:card" content="summary_large_image" />\n  <meta\n    name="twitter:title"\n    content="Écologies des Pratiques LLMs | EL2MP | Sciences Po medialab"\n  />\n  <meta\n    name="twitter:description"\n    content="The Ecologies of LLM Practices (EL2MP) project documents the role of Large Language Models (LLMs) in various professional practice(s) and the consequences of their use. Discover research from Sciences Po medialab."\n  />\n  <meta\n    name="twitter:image"\n    content="https://raw.githubusercontent.com/medialab/EL2MP/f2be408a5d92875040f0f0ba385a1fa67ad30b10/static/og_images/opengraph.jpg\n    "\n  />\n  <meta\n    name="twitter:image:alt"\n    content="EL2MP Logo - Ecologies of LLM Practices"\n  />\n  <meta name="twitter:site" content="@your_twitter_handle" />\n  <meta name="twitter:creator" content="@your_twitter_handle" />\n\n  <!-- Author and Publish Date (for LinkedIn, Facebook) -->\n  <meta name="author" content="Médialab, Sciences Po" />\n  <meta name="article:published_time" content="2025-01-01T12:00:00+00:00" />\n  <!-- Replace with actual publish date -->\n\n  <!-- Favicon -->\n  <link rel="icon" href="og_images/favicon.ico" />\n</svelte:head>\n\n<h1 style="position:absolute; color: transparent; user-select: none; pointer-events: none; z-index: -1;">Ecologies of LLM Practices | EL2MP | Sciences Po medialab</h1>\n',
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "wxqtfh"
};
async function get_hooks() {
  let handle;
  let handleFetch;
  let handleError;
  let init;
  ({ handle, handleFetch, handleError, init } = await import("./hooks.server.js"));
  let reroute;
  let transport;
  return {
    handle,
    handleFetch,
    handleError,
    init,
    reroute,
    transport
  };
}
export {
  assets as a,
  base as b,
  app_dir as c,
  read_implementation as d,
  options as e,
  set_private_env as f,
  get_hooks as g,
  prerendering as h,
  set_public_env as i,
  set_safe_public_env as j,
  set_read_implementation as k,
  set_assets as l,
  set_building as m,
  set_manifest as n,
  override as o,
  public_env as p,
  set_prerendering as q,
  reset as r,
  safe_public_env as s
};
