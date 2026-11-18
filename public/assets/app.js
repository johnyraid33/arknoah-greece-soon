(() => {
  "use strict";

  const LANGS = {
    el: {
      title: "Ark Noah's Greece — Σύντομα κοντά σας",
      desc: "Η Ark Noah's Greece ανοίγει νέο γραφείο στην Αθήνα. Σύντομα κοντά σας.",
      locale: "el_GR"
    },
    en: {
      title: "Ark Noah's Greece — Coming soon",
      desc: "Ark Noah's Greece is opening its new office in Athens. We look forward to welcoming you very soon.",
      locale: "en_US"
    },
    ru: {
      title: "Ark Noah's Greece — Скоро открытие",
      desc: "Ark Noah's Greece открывает новый офис в Афинах. Будем рады встретиться с вами совсем скоро.",
      locale: "ru_RU"
    }
  };

  const KEY = "arknoah-gr:lang";
  const root = document.documentElement;
  const buttons = Array.from(document.querySelectorAll("[data-lang]"));
  const copies = Array.from(document.querySelectorAll("[data-copy]"));

  const store = {
    read() {
      try { return localStorage.getItem(KEY); } catch (_) { return null; }
    },
    write(value) {
      try { localStorage.setItem(KEY, value); } catch (_) { /* private mode */ }
    }
  };

  function fromQuery() {
    const value = new URLSearchParams(location.search).get("lang");
    return value && LANGS[value] ? value : null;
  }

  function detect() {
    const stored = store.read();
    if (stored && LANGS[stored]) return stored;
    const query = fromQuery();
    if (query) return query;
    const nav = (navigator.languages || [navigator.language || "el"]).map((l) => String(l).slice(0, 2).toLowerCase());
    if (nav.includes("el")) return "el";
    if (nav.includes("ru")) return "ru";
    if (nav.includes("en")) return "en";
    return "el";
  }

  function setName(selector, value) {
    const node = document.querySelector(selector);
    if (node) node.setAttribute("content", value);
  }

  function apply(lang, remember) {
    const meta = LANGS[lang];
    if (!meta) return;

    root.lang = lang;

    copies.forEach((section) => {
      section.hidden = section.dataset.copy !== lang;
    });

    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
    });

    document.title = meta.title;
    setName('meta[name="description"]', meta.desc);
    setName('meta[property="og:title"]', meta.title);
    setName('meta[property="og:description"]', meta.desc);
    setName('meta[property="og:locale"]', meta.locale);
    setName('meta[name="twitter:title"]', meta.title);
    setName('meta[name="twitter:description"]', meta.desc);

    if (remember) store.write(lang);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => apply(button.dataset.lang, true));
  });

  const start = fromQuery() || detect();
  apply(start, false);

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
