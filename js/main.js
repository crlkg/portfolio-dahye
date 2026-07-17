"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileNav();
  initScrollSpy();
});

/* ==========================================================
   헤더 스크롤 효과
========================================================== */
function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  const toggle = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  toggle();
  window.addEventListener("scroll", toggle);
}

/* ==========================================================
   모바일 전체메뉴
========================================================== */
function initMobileNav() {
  const openBtn = document.getElementById("mobileNavBtn");
  const closeBtn = document.getElementById("mobileNavClose");
  const nav = document.getElementById("mobileNav");
  const dim = document.getElementById("mobileNavDim");
  if (!openBtn || !nav || !dim) return;

  const open = () => {
    nav.classList.add("is-open");
    dim.classList.add("is-open");
    document.body.classList.add("is-nav-open");
  };

  const close = () => {
    nav.classList.remove("is-open");
    dim.classList.remove("is-open");
    document.body.classList.remove("is-nav-open");
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  dim.addEventListener("click", close);

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });
}

/* ==========================================================
   스크롤 스파이 (현재 섹션 GNB 활성화)
========================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".gnb a");
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => {
    if (section.id !== "home") observer.observe(section);
  });
}
