/**
 * Arveng — данные, которые легко заменить.
 * Почта команды. Кнопки связи и адрес на сайте берутся отсюда.
 */
const SITE = {
  email: "arveng.afficial@gmail.com",
};

/**
 * Портфолио.
 * Чтобы добавить проект, допишите объект в конец массива.
 * category: "Электроника" | "Роботы" | "Механика" | "Гаджеты" | "3D-печать" | "Экспериментальные проекты"
 * image: необязательный путь к своей картинке, например "images/iskra.jpg"
 * Новая категория тоже появится в фильтрах сама.
 */
const PROJECTS = [
  {
    title: "Плата «Искра»",
    category: "Электроника",
    description:
      "Компактная плата с датчиками температуры, света и движения. Разводим дорожки, собираем компоненты и проверяем всё на рабочем столе.",
  },
  {
    title: "Платформа «След»",
    category: "Роботы",
    description:
      "Небольшой колёсный робот для опытов с движением, датчиками и простыми маршрутами по мастерской.",
  },
  {
    title: "Узел «Шарнир»",
    category: "Механика",
    description:
      "Печатный шарнир с осями и креплениями — подвижная деталь для рук, стоек и экспериментальных механизмов.",
  },
  {
    title: "Брелок «Маяк»",
    category: "Гаджеты",
    description:
      "Миниатюрный светящийся брелок на микроконтроллере. Карманный эксперимент, который приятно носить с собой.",
  },
  {
    title: "Корпус «Север»",
    category: "3D-печать",
    description:
      "Корпус для платы на ESP32: стойки, вентиляция и крышка на защёлках. Печатаем частями, каждая умещается в поле 180 мм.",
  },
  {
    title: "Манипулятор «Плечо»",
    category: "Экспериментальные проекты",
    description:
      "Учебная рука на сервоприводах: от наброска и печатного каркаса до первых движений на столе.",
  },
  {
    title: "Модуль «Пульс»",
    category: "Электроника",
    description:
      "Небольшой узел управления моторами и сервоприводами — чтобы у робота движение начиналось с одной платы.",
  },
  {
    title: "Захват «Клешня»",
    category: "Роботы",
    description:
      "Лёгкий схват для небольших деталей. Пальцы печатаем сами и собираем их вместе с сервоприводом.",
  },
];

const CATEGORY_ORDER = [
  "Электроника",
  "Роботы",
  "Механика",
  "Гаджеты",
  "3D-печать",
  "Экспериментальные проекты",
];

const INTENTS = {
  hello: {
    title: "Связаться с командой",
    subject: "Сообщение команде Arveng",
  },
  project: {
    title: "Обсудить проект",
    subject: "Обсуждение проекта",
  },
  print: {
    title: "Заказать 3D-печать",
    subject: "Заказ 3D-печати",
  },
  collab: {
    title: "Предложить сотрудничество",
    subject: "Предложение сотрудничества",
  },
};

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  document.querySelectorAll("[data-email]").forEach(function (node) {
    node.textContent = SITE.email;
    if (node.tagName === "A") node.href = "mailto:" + SITE.email;
  });

  /* ---------- Шапка, прогресс, меню ---------- */
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".progress");
  const burger = document.querySelector(".burger");
  const menu = document.getElementById("menu");

  function updateChrome() {
    const scrolled = window.scrollY > 8;
    if (header) header.classList.toggle("is-scrolled", scrolled);
    if (progress) {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const value = height > 0 ? window.scrollY / height : 0;
      progress.style.transform = "scaleX(" + value + ")";
    }
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        updateChrome();
        ticking = false;
      });
    },
    { passive: true }
  );
  updateChrome();

  function closeMenu() {
    if (!menu || !burger) return;
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Открыть меню");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!menu || !burger) return;
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Закрыть меню");
    document.body.classList.add("menu-open");
    const first = menu.querySelector("a");
    if (first) first.focus();
  }

  if (burger && menu) {
    burger.addEventListener("click", function () {
      if (burger.getAttribute("aria-expanded") === "true") closeMenu();
      else openMenu();
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu();
        burger.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1080) closeMenu();
    });
  }

  /* ---------- Появление секций ---------- */
  const revealNodes = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealNodes.forEach(function (node) {
      node.classList.add("is-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    revealNodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  /* ---------- Активный раздел в меню ---------- */
  const spyLinks = document.querySelectorAll("[data-spy]");
  const spySections = [];
  spyLinks.forEach(function (link) {
    const id = (link.getAttribute("href") || "").slice(1);
    const section = document.getElementById(id);
    if (section) spySections.push(section);
  });

  if (spySections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          spyLinks.forEach(function (link) {
            const current = link.getAttribute("href") === "#" + id;
            if (current) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
    );
    spySections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* ---------- Притяжение кнопок и наклон карточек ---------- */
  if (!prefersReducedMotion && finePointer) {
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      el.addEventListener("mousemove", function (event) {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        const tx = Math.max(-12, Math.min(12, x * 0.28));
        const ty = Math.max(-10, Math.min(10, y * 0.32));
        el.style.transform = "translate(" + tx + "px, " + ty + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

  function bindTilt(nodes) {
    if (prefersReducedMotion || !finePointer) return;
    nodes.forEach(function (el) {
      if (el.dataset.tiltBound === "true") return;
      el.dataset.tiltBound = "true";
      el.addEventListener("mousemove", function (event) {
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * 7;
        const ry = (px - 0.5) * 9;
        el.style.transform =
          "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
        el.style.setProperty("--lx", (px * 100).toFixed(1) + "%");
        el.style.setProperty("--ly", (py * 100).toFixed(1) + "%");
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

  bindTilt(document.querySelectorAll("[data-tilt]"));

  /* ---------- Портфолио ---------- */
  const filtersEl = document.getElementById("filters");
  const gridEl = document.getElementById("project-grid");
  const emptyEl = document.getElementById("projects-empty");

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function kindOf(category) {
    const map = {
      Электроника: "electronics",
      Роботы: "robots",
      Механика: "mechanics",
      Гаджеты: "gadgets",
      "3D-печать": "print",
      "Экспериментальные проекты": "lab",
    };
    return map[category] || "lab";
  }

  function coverSvg(kind, accent, id) {
    const icons = {
      electronics:
        '<rect x="168" y="78" width="304" height="196" rx="16" fill="#18243a" stroke="' + accent + '" stroke-opacity="0.8"/>' +
        '<path d="M196 126 H280 V168 H360 V214 H444" fill="none" stroke="' + accent + '" stroke-width="2"/>' +
        '<rect x="250" y="138" width="92" height="64" rx="6" fill="#0e1522" stroke="#d5def0"/>' +
        '<g fill="#c5d0e4"><rect x="262" y="132" width="6" height="10"/><rect x="278" y="132" width="6" height="10"/><rect x="294" y="132" width="6" height="10"/><rect x="310" y="132" width="6" height="10"/><rect x="262" y="198" width="6" height="10"/><rect x="278" y="198" width="6" height="10"/><rect x="294" y="198" width="6" height="10"/><rect x="310" y="198" width="6" height="10"/></g>' +
        '<circle cx="430" cy="214" r="8" fill="' + accent + '"/>' +
        '<circle cx="206" cy="104" r="7" fill="none" stroke="#c9b8ff"/>',
      robots:
        '<rect x="150" y="150" width="340" height="92" rx="28" fill="#18243a" stroke="' + accent + '"/>' +
        '<circle cx="214" cy="246" r="38" fill="#101722" stroke="#d5def0" stroke-width="8"/>' +
        '<circle cx="426" cy="246" r="38" fill="#101722" stroke="#d5def0" stroke-width="8"/>' +
        '<rect x="230" y="112" width="180" height="48" rx="14" fill="#22304a" stroke="#c9b8ff"/>' +
        '<circle cx="286" cy="136" r="8" fill="' + accent + '"/>' +
        '<circle cx="354" cy="136" r="8" fill="' + accent + '"/>' +
        '<path d="M320 112 V78" stroke="' + accent + '" stroke-width="3"/>' +
        '<circle cx="320" cy="70" r="8" fill="none" stroke="' + accent + '"/>',
      mechanics:
        '<circle cx="250" cy="180" r="58" fill="none" stroke="' + accent + '" stroke-width="10"/>' +
        '<circle cx="250" cy="180" r="16" fill="#101722" stroke="#d5def0"/>' +
        '<circle cx="392" cy="180" r="44" fill="none" stroke="#c9b8ff" stroke-width="10"/>' +
        '<circle cx="392" cy="180" r="12" fill="#101722" stroke="#d5def0"/>' +
        '<path d="M308 180 H348" stroke="#d5def0" stroke-width="6"/>' +
        '<path d="M168 180 H192 M250 98 V122 M250 238 V262 M392 112 V136" stroke="' + accent + '" stroke-width="4" stroke-linecap="round"/>',
      gadgets:
        '<rect x="248" y="78" width="144" height="210" rx="36" fill="#18243a" stroke="' + accent + '" stroke-width="3"/>' +
        '<circle cx="320" cy="108" r="12" fill="none" stroke="#d5def0" stroke-width="3"/>' +
        '<circle cx="320" cy="176" r="28" fill="' + accent + '" fill-opacity="0.85"/>' +
        '<circle cx="320" cy="230" r="6" fill="#c9b8ff"/>' +
        '<path d="M292 78 C300 52 340 52 348 78" fill="none" stroke="#d5def0" stroke-width="3"/>',
      print:
        '<path d="M210 250 H430 L400 286 H240 Z" fill="#18243a" stroke="#d5def0"/>' +
        '<path d="M230 214 H410 L392 250 H248 Z" fill="#22304a" stroke="' + accent + '"/>' +
        '<path d="M250 182 H390 L376 214 H264 Z" fill="#101722" stroke="' + accent + '"/>' +
        '<path d="M320 86 V150" stroke="#c9b8ff" stroke-width="4"/>' +
        '<rect x="292" y="150" width="56" height="22" rx="6" fill="' + accent + '"/>',
      lab:
        '<path d="M180 250 H250 L300 150 L360 210 L470 90" fill="none" stroke="' + accent + '" stroke-width="4" stroke-linejoin="round"/>' +
        '<circle cx="180" cy="250" r="10" fill="#101722" stroke="#d5def0" stroke-width="3"/>' +
        '<circle cx="300" cy="150" r="10" fill="#101722" stroke="#d5def0" stroke-width="3"/>' +
        '<circle cx="360" cy="210" r="10" fill="#101722" stroke="#c9b8ff" stroke-width="3"/>' +
        '<circle cx="470" cy="90" r="12" fill="' + accent + '"/>' +
        '<path d="M150 120 H230 M520 240 H580" stroke="#c9b8ff" stroke-opacity="0.8"/>',
    };

    return (
      '<svg viewBox="0 0 640 360" aria-hidden="true">' +
      "<defs>" +
      '<radialGradient id="' + id + '-glow" cx="50%" cy="42%" r="62%">' +
      '<stop offset="0%" stop-color="' + accent + '" stop-opacity="0.32"/>' +
      '<stop offset="100%" stop-color="' + accent + '" stop-opacity="0"/>' +
      "</radialGradient>" +
      '<pattern id="' + id + '-dots" width="16" height="16" patternUnits="userSpaceOnUse">' +
      '<circle cx="1" cy="1" r="0.8" fill="#c5d2ea" fill-opacity="0.25"/>' +
      "</pattern></defs>" +
      '<rect width="640" height="360" fill="#101722"/>' +
      '<rect width="640" height="360" fill="url(#' + id + '-dots)"/>' +
      '<rect width="640" height="360" fill="url(#' + id + '-glow)"/>' +
      '<path d="M28 28 H150 M28 28 V112" fill="none" stroke="' + accent + '" stroke-width="1.5"/>' +
      '<path d="M612 332 H490 M612 332 V248" fill="none" stroke="' + accent + '" stroke-opacity="0.6" stroke-width="1.5"/>' +
      (icons[kind] || icons.lab) +
      "</svg>"
    );
  }

  function mediaFor(project, index) {
    if (project.image) {
      return '<img src="' + escapeHtml(project.image) + '" alt="" loading="lazy">';
    }
    const accents = ["#7ee7ff", "#c9b8ff", "#8eb6ff", "#d7ccff"];
    return coverSvg(kindOf(project.category), accents[index % accents.length], "p" + index);
  }

  function categories() {
    const present = new Set(
      PROJECTS.map(function (project) {
        return project.category;
      })
    );
    const known = CATEGORY_ORDER.filter(function (category) {
      return present.has(category);
    });
    const extra = Array.from(present).filter(function (category) {
      return CATEGORY_ORDER.indexOf(category) === -1;
    });
    return known.concat(extra);
  }

  let activeCategory = "all";

  function renderFilters() {
    if (!filtersEl) return;
    const items = ["all"].concat(categories());
    filtersEl.innerHTML = items
      .map(function (category) {
        const label = category === "all" ? "Все" : category;
        const pressed = category === activeCategory ? "true" : "false";
        return (
          '<button type="button" class="chip' +
          (category === activeCategory ? " is-active" : "") +
          '" data-category="' +
          escapeHtml(category) +
          '" aria-pressed="' +
          pressed +
          '">' +
          escapeHtml(label) +
          "</button>"
        );
      })
      .join("");

    filtersEl.querySelectorAll(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        activeCategory = chip.getAttribute("data-category") || "all";
        filtersEl.querySelectorAll(".chip").forEach(function (item) {
          const on = item === chip;
          item.classList.toggle("is-active", on);
          item.setAttribute("aria-pressed", on ? "true" : "false");
        });
        applyFilter();
      });
    });
  }

  function renderProjects() {
    if (!gridEl) return;
    gridEl.innerHTML = PROJECTS.map(function (project, index) {
      return (
        '<div class="reveal" style="--d:' + (index % 3) * 0.08 + 's">' +
        '<button type="button" class="project" data-tilt data-index="' +
        index +
        '">' +
        '<span class="project__media">' +
        mediaFor(project, index) +
        "</span>" +
        '<span class="project__body">' +
        '<span class="project__cat">' +
        escapeHtml(project.category) +
        "</span>" +
        '<span class="project__title">' +
        escapeHtml(project.title) +
        "</span>" +
        '<span class="project__text">' +
        escapeHtml(project.description) +
        "</span>" +
        "</span></button></div>"
      );
    }).join("");

    bindTilt(gridEl.querySelectorAll("[data-tilt]"));
    gridEl.querySelectorAll(".project").forEach(function (button) {
      button.addEventListener("click", function () {
        openProject(Number(button.getAttribute("data-index")));
      });
    });

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
      const observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.12 }
      );
      gridEl.querySelectorAll(".reveal").forEach(function (node) {
        observer.observe(node);
      });
    } else {
      gridEl.querySelectorAll(".reveal").forEach(function (node) {
        node.classList.add("is-visible");
      });
    }

    applyFilter();
  }

  function applyFilter() {
    if (!gridEl) return;
    let visible = 0;
    gridEl.querySelectorAll(".project").forEach(function (button) {
      const project = PROJECTS[Number(button.getAttribute("data-index"))];
      const show = activeCategory === "all" || (project && project.category === activeCategory);
      const wrap = button.parentElement;
      if (wrap) wrap.hidden = !show;
      if (show) visible += 1;
    });
    if (emptyEl) emptyEl.hidden = visible !== 0;
  }

  renderFilters();
  renderProjects();

  /* ---------- Диалоги ---------- */
  const contactDialog = document.getElementById("contact-dialog");
  const contactForm = document.getElementById("contact-form");
  const contactTitle = document.getElementById("contact-title");
  const contactError = document.getElementById("form-error");
  const contactSuccess = document.getElementById("form-success");
  const contactPreview = document.getElementById("form-preview");
  const messageField = contactForm ? contactForm.elements.message : null;
  const projectDialog = document.getElementById("project-dialog");
  const lightbox = document.getElementById("lightbox");
  let currentIntent = "hello";

  document.querySelectorAll("dialog").forEach(function (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.querySelectorAll("[data-close]").forEach(function (button) {
      button.addEventListener("click", function () {
        dialog.close();
      });
    });
  });

  function openContact(intent, prefill) {
    currentIntent = INTENTS[intent] ? intent : "hello";
    if (projectDialog && projectDialog.open) projectDialog.close();
    if (lightbox && lightbox.open) lightbox.close();
    if (!contactDialog || !contactForm) {
      window.location.href = "mailto:" + SITE.email;
      return;
    }
    contactForm.classList.remove("is-sent");
    if (contactError) contactError.hidden = true;
    if (contactTitle) contactTitle.textContent = INTENTS[currentIntent].title;
    if (messageField && prefill) messageField.value = prefill;
    if (typeof contactDialog.showModal === "function") contactDialog.showModal();
  }

  document.querySelectorAll("[data-intent]").forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      const prefill = trigger.getAttribute("data-prefill") || "";
      openContact(trigger.getAttribute("data-intent"), prefill);
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = contactForm.elements.name.value.trim();
      const reply = contactForm.elements.reply.value.trim();
      const message = contactForm.elements.message.value.trim();

      if (name.length < 2 || reply.length < 3 || message.length < 10) {
        if (contactError) {
          contactError.hidden = false;
          contactError.textContent = "Напишите имя, как с вами связаться и сообщение хотя бы в пару строк.";
        }
        return;
      }

      const intent = INTENTS[currentIntent];
      const body =
        "Здравствуйте!\n\n" +
        message +
        "\n\n— " +
        name +
        "\nКак связаться: " +
        reply;

      if (contactPreview) contactPreview.textContent = body;
      contactForm.classList.add("is-sent");

      const mailto =
        "mailto:" +
        encodeURIComponent(SITE.email) +
        "?subject=" +
        encodeURIComponent(intent.subject) +
        "&body=" +
        encodeURIComponent(body);

      window.location.href = mailto;
    });

    contactDialog.addEventListener("close", function () {
      contactForm.reset();
      contactForm.classList.remove("is-sent");
      if (contactError) contactError.hidden = true;
      if (copyBtn) copyBtn.textContent = "Скопировать текст";
    });
  }

  const copyBtn = document.getElementById("copy-message");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      const text = contactPreview ? contactPreview.textContent : "";
      if (navigator.clipboard && text) {
        navigator.clipboard.writeText(text).then(function () {
          copyBtn.textContent = "Скопировано";
        });
      }
    });
  }

  function openProject(index) {
    const project = PROJECTS[index];
    if (!project || !projectDialog) return;
    const media = document.getElementById("project-dialog-media");
    const cat = document.getElementById("project-dialog-cat");
    const title = document.getElementById("project-dialog-title");
    const text = document.getElementById("project-dialog-text");
    const discuss = document.getElementById("project-discuss");
    if (media) media.innerHTML = mediaFor(project, index);
    if (cat) cat.textContent = project.category;
    if (title) title.textContent = project.title;
    if (text) text.textContent = project.description;
    if (discuss) {
      discuss.setAttribute(
        "data-prefill",
        "Хочу обсудить проект, похожий на «" + project.title + "»."
      );
    }
    projectDialog.showModal();
  }

  document.querySelectorAll("[data-lightbox]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!lightbox) return;
      const media = button.querySelector(".shot__media");
      const name = button.querySelector(".shot__name");
      const target = document.getElementById("lightbox-media");
      const caption = document.getElementById("lightbox-caption");
      if (target && media) target.innerHTML = media.innerHTML;
      if (caption && name) caption.textContent = name.textContent;
      lightbox.showModal();
    });
  });
})();
