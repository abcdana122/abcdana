import { useRef } from "react";

import { Nav } from "./components/Nav/Nav";
import { Hero } from "./components/Hero/Hero";
import { Intro } from "./components/Intro/Intro";
import { Awards } from "./components/Awards/Awards";
import { Work } from "./components/Work/Work";
import { Press } from "./components/Press/press";
import { Contact } from "./components/Contact/Contact";
import { usePortfolioScrollProgress } from "./hooks/usePortfolioScrollProgress";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import "./styles/reveal.css";

import "./styles/global.css";

function App() {
  const heroRef = useRef(null);
  const introRef = useRef(null);

  usePortfolioScrollProgress(heroRef, introRef);
  useRevealOnScroll();

  return (
    <link rel="icon" href="/favicon.ico" />
    <main className="site">
      <Nav />
      <Hero heroRef={heroRef} />
      <Intro introRef={introRef} />
      <Awards />
      <Work />
      <Press />
      <Contact />
    </main>
  );
}

export default App;
