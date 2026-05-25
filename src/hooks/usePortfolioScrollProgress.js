import { useEffect } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function usePortfolioScrollProgress(heroRef, introRef) {
  useEffect(() => {
    let frameId = null;
    let heroCurrent = 0;
    let introCurrent = 0;

    const getHeroProgress = () => {
      const hero = heroRef.current;
      if (!hero) return 0;

      const shell = hero.querySelector(".browser-shell");
      if (!shell) return 0;

      const heroTop = hero.getBoundingClientRect().top + window.scrollY;
      const heroStyle = window.getComputedStyle(hero);
      const shellStyle = window.getComputedStyle(shell);

      const heroPaddingTop = parseFloat(heroStyle.paddingTop) || 0;
      const stickyTop = parseFloat(shellStyle.top) || 0;

      const start = heroTop + heroPaddingTop - stickyTop;
      const end = heroTop + hero.offsetHeight - shell.offsetHeight - stickyTop;
      const range = Math.max(1, end - start);

      return clamp((window.scrollY - start) / range, 0, 1);
    };

    const getIntroProgress = () => {
      const intro = introRef.current;
      if (!intro) return 0;

      const sticky = intro.querySelector(".intro-sticky");
      if (!sticky) return 0;

      const introTop = intro.getBoundingClientRect().top + window.scrollY;
      const stickyTop = parseFloat(window.getComputedStyle(sticky).top) || 0;

      const start = introTop - stickyTop;
      const end = introTop + intro.offsetHeight - window.innerHeight;
      const range = Math.max(1, end - start);

      return clamp((window.scrollY - start) / range, 0, 1);
    };

    const animate = () => {
      const heroTarget = getHeroProgress();
      const introTarget = getIntroProgress();

      heroCurrent += (heroTarget - heroCurrent) * 0.075;
      introCurrent += (introTarget - introCurrent) * 0.075;

      if (Math.abs(heroTarget - heroCurrent) < 0.001) {
        heroCurrent = heroTarget;
      }

      if (Math.abs(introTarget - introCurrent) < 0.001) {
        introCurrent = introTarget;
      }

      const heroEase = 1 - Math.pow(1 - heroCurrent, 3);
      const introEase = 1 - Math.pow(1 - introCurrent, 3);

      heroRef.current?.style.setProperty("--pin-progress", heroEase.toFixed(4));
      introRef.current?.style.setProperty(
        "--intro-progress",
        introEase.toFixed(4)
      );

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [heroRef, introRef]);
}
