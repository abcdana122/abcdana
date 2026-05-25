import { useEffect, useState } from "react";
import { navLinks } from "../../data/portfolioData";
import "./Nav.css";

export function Nav() {
  const [activeHref, setActiveHref] = useState(navLinks[0].href);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 40);

      // 맨 위에서는 무조건 Main
      if (scrollY < 180) {
        setActiveHref("#top");
        return;
      }

      // 페이지 맨 아래까지 내려오면 마지막 nav 항목 활성화
      // 지금 navLinks 마지막이 Articles라면 Articles가 활성화됨
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 20;

      if (isBottom) {
        setActiveHref(navLinks[navLinks.length - 1].href);
        return;
      }

      // 현재 지나온 섹션 중 가장 마지막 섹션을 active 처리
      const currentSection = navLinks
        .map((link) => {
          if (!link.href) return null;

          const section = document.querySelector(link.href);
          if (!section) return null;

          const rect = section.getBoundingClientRect();

          return {
            href: link.href,
            top: rect.top,
          };
        })
        .filter(Boolean)
        .filter((section) => section.top <= 180)
        .pop();

      if (currentSection) {
        setActiveHref(currentSection.href);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (href) => {
    setActiveHref(href);
  };

  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-brand">
        <a
          className="logo"
          href="#top"
          onClick={() => handleNavClick("#top")}
        >
          kda.
        </a>

        <p className="sub-logo">Danah Kim</p>
      </div>

      <div className="nav-pill">
        {navLinks.map((link) => (
          <a
            href={link.href}
            key={link.href}
            className={activeHref === link.href ? "active" : ""}
            onClick={() => handleNavClick(link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        className="nav-link"
        href="#contact"
        onClick={() => handleNavClick("#contact")}
      >
        Get in touch ↗
      </a>
    </nav>
  );
}