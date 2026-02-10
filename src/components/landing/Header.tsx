"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Header scroll effect: add 'scrolled' class on scroll, hide on mobile scroll-down
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastY = 0;
    let ticking = false;
    const isMobile = window.matchMedia("(max-width: 480px)");

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          header.classList.toggle("scrolled", y > 50);
          if (isMobile.matches) {
            if (y > lastY && y > 80) {
              header.classList.add("header-hidden");
            } else {
              header.classList.remove("header-hidden");
            }
          }
          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hamburger menu toggle
  const closeMenu = useCallback(() => {
    burgerRef.current?.classList.remove("open");
    menuRef.current?.classList.remove("open");
  }, []);

  useEffect(() => {
    const burger = burgerRef.current;
    const menu = menuRef.current;
    if (!burger || !menu) return;

    const toggleMenu = () => {
      burger.classList.toggle("open");
      menu.classList.toggle("open");
    };

    burger.addEventListener("click", toggleMenu);

    const links = menu.querySelectorAll("a");
    links.forEach((link) => link.addEventListener("click", closeMenu));

    return () => {
      burger.removeEventListener("click", toggleMenu);
      links.forEach((link) => link.removeEventListener("click", closeMenu));
    };
  }, [closeMenu]);

  // iOS zoom prevention
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();
    const preventMultiTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    document.addEventListener("gesturestart", prevent);
    document.addEventListener("gesturechange", prevent);
    document.addEventListener("gestureend", prevent);
    document.addEventListener("touchmove", preventMultiTouch, {
      passive: false,
    });

    return () => {
      document.removeEventListener("gesturestart", prevent);
      document.removeEventListener("gesturechange", prevent);
      document.removeEventListener("gestureend", prevent);
      document.removeEventListener("touchmove", preventMultiTouch);
    };
  }, []);

  return (
    <header className="site-header" id="siteHeader" ref={headerRef}>
      <div className="header-inner">
        <Link href="/" className="header-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/logo.png" alt="FitMyCV" />
        </Link>
        <nav className="header-nav">
          <a href="#howItWorks">Comment ça marche</a>
          <a href="#features">Fonctionnalités</a>
          <a href="#pricing">Tarifs</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="header-actions">
          <a href="https://app.fitmycv.io" className="header-btn login">
            Log in
          </a>
          <a href="https://app.fitmycv.io" className="header-btn signup">
            Sign Up
          </a>
        </div>
        <button
          className="header-burger"
          id="headerBurger"
          ref={burgerRef}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div
          className="header-mobile-menu"
          id="headerMobileMenu"
          ref={menuRef}
        >
          <a href="#howItWorks">Comment ça marche</a>
          <a href="#features">Fonctionnalités</a>
          <a href="#pricing">Tarifs</a>
          <a href="#faq">FAQ</a>
          <div className="mobile-divider"></div>
          <a href="https://app.fitmycv.io" className="header-btn login">
            Log in
          </a>
          <a href="https://app.fitmycv.io" className="header-btn signup">
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
}
